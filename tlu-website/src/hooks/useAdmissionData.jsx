import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { createExcerpt } from '../utils/formatUtils';

const API_URL = 'https://67d464bed2c7857431ed88c2.mockapi.io'; // Thay bằng URL API thực tế của bạn

// Map các loại tuyển sinh sang ID danh mục tương ứng
const TYPE_TO_CATEGORY_MAP = {
  undergraduate: "2", // Đại học
  master: "3",        // Thạc sĩ
  doctoral: "4",      // Tiến sĩ
};

// Map ngược từ ID danh mục sang loại tuyển sinh
const CATEGORY_TO_TYPE_MAP = {
  "2": "undergraduate",
  "3": "master",
  "4": "doctoral",
};

export function useAdmissionData() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState(null);
  
  // Trạng thái phân trang
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Xác định loại tuyển sinh từ URL khi component mount
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    
    if (path.includes('dai-hoc')) {
      setType('undergraduate');
    } else if (path.includes('thac-si')) {
      setType('master');
    } else if (path.includes('tien-si')) {
      setType('doctoral');
    } else {
      setType(null);
    }
    
    // Reset trang về 1 khi đổi loại
    setPagination(prev => ({ ...prev, current: 1 }));
  }, [location.pathname]);
  
  // Fetch dữ liệu khi type hoặc trang thay đổi
  useEffect(() => {
    fetchPosts();
  }, [type, pagination.current]);
  
  // Fetch posts theo loại tuyển sinh
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      let categoryId = null;
      
      // Xác định categoryId từ type
      if (type) {
        categoryId = TYPE_TO_CATEGORY_MAP[type];
      } else {
        // Nếu không có type, lấy tất cả bài viết thuộc danh mục con của Tuyển sinh (id=1)
        // Đây là các ID 2,3,4
        categoryId = "1,2,3,4"; // Lấy cả danh mục cha và các danh mục con
      }
      
      const params = {
        page: pagination.current,
        limit: pagination.pageSize,
        sortBy: 'createdAt',
        order: 'desc'
      };

      // API request
      console.log(`Đang fetch dữ liệu với categoryId=${categoryId}`);
      
      const response = await axios.get(`${API_URL}/posts`, { params });
      console.log("Dữ liệu nhận được:", response.data);
      
      // Lọc các bài viết thuộc danh mục Tuyển sinh (nếu API không hỗ trợ lọc theo categoryId)
      let filteredPosts = response.data;
      
      if (type) {
        // Nếu có type, lọc theo ID danh mục tương ứng
        filteredPosts = response.data.filter(post => post.categoryId === TYPE_TO_CATEGORY_MAP[type]);
      } else {
        // Nếu không có type, lấy tất cả bài viết thuộc danh mục Tuyển sinh và các danh mục con
        const validCategoryIds = ["1", "2", "3", "4"];
        filteredPosts = response.data.filter(post => validCategoryIds.includes(post.categoryId));
      }
      
      // Xử lý dữ liệu trả về
      const processedData = filteredPosts.map(post => ({
        ...post,
        excerpt: post.description || createExcerpt(post.content, 200)
      }));
      
      setPosts(processedData);
      setPagination(prev => ({
        ...prev,
        total: filteredPosts.length || 0, // Tổng số bài viết sau khi lọc
        totalPages: Math.ceil(filteredPosts.length / prev.pageSize) || 1
      }));
      
    } catch (error) {
      console.error('Error fetching admission posts:', error);
      setError('Không thể tải dữ liệu tuyển sinh. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  }, [type, pagination.current, pagination.pageSize]);
  
  // Đổi loại tuyển sinh và cập nhật URL
  const changeType = useCallback((newType) => {
    let url = '/tuyen-sinh';
    
    if (newType === 'undergraduate') {
      url = '/tuyen-sinh/dai-hoc';
    } else if (newType === 'master') {
      url = '/tuyen-sinh/thac-si';
    } else if (newType === 'doctoral') {
      url = '/tuyen-sinh/tien-si';
    }
    
    navigate(url);
  }, [navigate]);
  
  // Đổi trang
  const handlePageChange = useCallback((page) => {
    setPagination(prev => ({ ...prev, current: page }));
    window.scrollTo(0, 0);
  }, []);
  
  return {
    posts,
    loading,
    error,
    pagination,
    type,
    changeType,
    handlePageChange
  };
}

export default useAdmissionData;