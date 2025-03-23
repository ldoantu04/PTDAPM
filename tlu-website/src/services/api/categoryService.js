import axios from 'axios';
import { backendUrl } from '../../App';
// Cache để lưu trữ thông tin danh mục
let categoryCache = null;

/**
 * Service đơn giản để quản lý việc đổ dữ liệu theo danh mục
 */
const categoryService = {
  /**
   * Lấy tất cả danh mục và tạo map cho tuyển sinh
   */
  async getCategories() {
    // Nếu đã cache thì trả về luôn
    if (categoryCache) {
      return categoryCache;
    }

    try {
      const response = await axios.get(backendUrl + `/api/categories`);
      
      // Tạo đối tượng chứa thông tin danh mục
      const result = {
        all: response.data,                 // Tất cả danh mục
        byId: {},                           // Map theo ID
        admission: {                        // Danh mục tuyển sinh
          all: [],                          // Tất cả ID danh mục tuyển sinh
          undergraduate: null,              // ID danh mục đại học
          master: null,                     // ID danh mục thạc sĩ
          doctoral: null                    // ID danh mục tiến sĩ
        }
      };
      
      // Tạo map theo ID và xác định danh mục tuyển sinh
      response.data.forEach(category => {
        // Thêm vào map theo ID
        result.byId[category._id] = category;
        
        // Xác định danh mục tuyển sinh dựa trên tên
        const name = category.name.toLowerCase();
        
        if (name.includes('đại học') || name.includes('dai hoc') || name.includes('undergraduate')) {
          result.admission.undergraduate = category._id;
          result.admission.all.push(category._id);
        } else if (name.includes('thạc sĩ') || name.includes('thac si') || name.includes('master')) {
          result.admission.master = category._id;
          result.admission.all.push(category._id);
        } else if (name.includes('tiến sĩ') || name.includes('tien si') || name.includes('doctoral')) {
          result.admission.doctoral = category._id;
          result.admission.all.push(category._id);
        }
      });
      
      // Lưu vào cache
      categoryCache = result;
      return result;
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
      throw error;
    }
  },
  
  /**
   * Lấy ID danh mục tuyển sinh dựa trên loại
   * @param {string} type - Loại tuyển sinh (undergraduate, master, doctoral)
   */
  async getAdmissionCategoryId(type) {
    const categories = await this.getCategories();
    return categories.admission[type] || null;
  },
  
  /**
   * Lấy tất cả ID danh mục tuyển sinh
   */
  async getAllAdmissionCategoryIds() {
    const categories = await this.getCategories();
    return categories.admission.all;
  },
  
  /**
   * Lấy bài viết theo loại tuyển sinh hoặc tất cả bài viết tuyển sinh
   * @param {Object} options - Tùy chọn
   * @param {string} options.type - Loại tuyển sinh (undergraduate, master, doctoral hoặc null để lấy tất cả)
   * @param {number} options.page - Trang hiện tại
   * @param {number} options.limit - Số bài viết mỗi trang
   */
  async getPostsByAdmissionType(options = {}) {
    const { type = null, page = 1, limit = 10 } = options;
    
    try {
      // Lấy thông tin danh mục
      const categories = await this.getCategories();
      
      // Xác định ID danh mục cần lấy
      let categoryIds;
      if (type) {
        // Lấy theo loại cụ thể
        const categoryId = categories.admission[type];
        if (!categoryId) {
          return { data: [], total: 0, page, limit, totalPages: 0 };
        }
        categoryIds = categoryId;
      } else {
        // Lấy tất cả bài viết tuyển sinh
        categoryIds = categories.admission.all.join(',');
      }
      
      // Chuẩn bị tham số
      const params = {
        page,
        limit,
        sortBy: 'createdAt',
        order: 'desc'
      };
      
      // Gọi API
      const response = await axios.get(backendUrl + `/api/posts`, { params });
      
      // Lọc bài viết theo danh mục
      let filteredPosts;
      if (type) {
        // Lọc theo loại cụ thể
        const categoryId = categories.admission[type];
        filteredPosts = response.data.filter(post => post.category_id === categoryId);
      } else {
        // Lọc tất cả bài viết tuyển sinh
        filteredPosts = response.data.filter(post => 
          categories.admission.all.includes(post.category_id)
        );
      }
      
      // Xử lý kết quả
      return {
        data: filteredPosts,
        total: filteredPosts.length,
        page,
        limit,
        totalPages: Math.ceil(filteredPosts.length / limit)
      };
    } catch (error) {
      console.error("Lỗi khi tải bài viết tuyển sinh:", error);
      throw error;
    }
  },
  
  /**
   * Lấy loại tuyển sinh từ đường dẫn URL
   * @param {string} path - Đường dẫn URL
   */
  getAdmissionTypeFromPath(path) {
    path = path.toLowerCase();
    
    if (path.includes('/dai-hoc')) {
      return 'undergraduate';
    } else if (path.includes('/thac-si')) {
      return 'master';
    } else if (path.includes('/tien-si')) {
      return 'doctoral';
    }
    
    return null; // Trang tuyển sinh tổng
  }
};

export default categoryService;