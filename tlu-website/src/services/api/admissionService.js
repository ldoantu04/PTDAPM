import axios from 'axios';

const API_URL = 'https://67d464bed2c7857431ed88c2.mockapi.io'; // Thay bằng API thực tế của bạn

/**
 * Lấy danh sách bài viết tuyển sinh
 * @param {Object} options - Các tùy chọn
 * @param {String} options.type - Loại tuyển sinh (undergraduate, master, doctoral)
 * @param {Number} options.page - Trang hiện tại
 * @param {Number} options.limit - Số bài viết mỗi trang
 * @returns {Promise} - Promise chứa dữ liệu trả về
 */
export const getAdmissionPosts = async ({ type = null, page = 1, limit = 10 }) => {
  try {
    const params = {
      page,
      limit,
      sortBy: 'createdAt',
      order: 'desc'
    };
    
    // Thêm điều kiện lọc theo loại tuyển sinh
    if (type) {
      params.categoryId = getCategoryIdByType(type);
    }
    
    const response = await axios.get(`${API_URL}/posts`, { params });
    console.log(response.data);
    return {
      data: response.data,
      total: response.headers['x-total-count'] || 50, // Tổng số bài viết
      page,
      limit,
      totalPages: Math.ceil((response.headers['x-total-count'] || 50) / limit)
    };
  } catch (error) {
    console.error('Error fetching admission posts:', error);
    throw error;
  }
};

/**
 * Lấy danh sách bài viết tuyển sinh nổi bật
 * @param {Number} limit - Số bài viết muốn lấy
 * @returns {Promise} - Promise chứa dữ liệu trả về
 */
export const getFeaturedAdmissionPosts = async (limit = 5) => {
  try {
    const params = {
      featured: true,
      _limit: limit,
      sortBy: 'createdAt',
      order: 'desc'
    };
    
    const response = await axios.get(`${API_URL}/posts`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching featured admission posts:', error);
    throw error;
  }
};

/**
 * Lấy chi tiết bài viết tuyển sinh
 * @param {String} id - ID của bài viết
 * @returns {Promise} - Promise chứa dữ liệu trả về
 */
export const getAdmissionPostDetail = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching admission post detail id=${id}:`, error);
    throw error;
  }
};

/**
 * Helper: Chuyển đổi từ loại tuyển sinh sang ID danh mục
 * @param {String} type - Loại tuyển sinh
 * @returns {String} - ID danh mục tương ứng
 */
function getCategoryIdByType(type) {
  // Map loại tuyển sinh sang ID danh mục tương ứng
  // Thay thế bằng ID thực tế trong database của bạn
  const categoryMap = {
    undergraduate: '1',  // Đại học
    master: '2',         // Thạc sĩ
    doctoral: '3',       // Tiến sĩ
  };
  
  return categoryMap[type] || null;
}