import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Pagination, message } from "antd";
import { backendUrl } from "../../../App";
import CategoryLayout from "../../layouts/CategoryLayout";

function AdmissionMain() {
  const { type } = useParams(); // Lấy thông tin từ path, ví dụ: dai-hoc, thac-si, tien-si
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allAdmissionPosts, setAllAdmissionPosts] = useState([]); // Lưu trữ tất cả bài viết tuyển sinh
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  // Định nghĩa các loại tuyển sinh
  const admissionTypes = {
    'dai-hoc': 'Đại học',
    'thac-si': 'Thạc sĩ',
    'tien-si': 'Tiến sĩ'
  };

  const navigationLinks = [
    { label: "Trang chủ", href: "/" },
    { label: "Tuyển sinh", href: "/tuyen-sinh" },
    ...(type ? [{ label: `Tuyển sinh ${admissionTypes[type]}`, href: `/tuyen-sinh/${type}` }] : [])
  ];

  // Danh sách menu tuyển sinh
  const menuItems = [
    {
      label: "Tuyển sinh Đại học",
      link: "/tuyen-sinh/dai-hoc",
      active: type === 'dai-hoc'
    },
    {
      label: "Tuyển sinh Thạc sĩ",
      link: "/tuyen-sinh/thac-si",
      active: type === 'thac-si'
    },
    {
      label: "Tuyển sinh Tiến sĩ",
      link: "/tuyen-sinh/tien-si",
      active: type === 'tien-si'
    },
  ];

  // Lấy danh mục tuyển sinh
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/categories`);
        const allCategories = response.data;
        
        // Tìm danh mục lớn "Tuyển sinh"
        const admissionCategory = allCategories.find(cat => cat.name === "Tuyển sinh" && !cat.parent_id);
        
        if (admissionCategory) {
          // Lấy các danh mục con
          let childCategories = allCategories.filter(cat => cat.parent_id === admissionCategory._id);
          setCategories(childCategories);
          
          // Lọc theo loại tuyển sinh nếu có
          if (type && admissionTypes[type]) {
            const typeCategory = childCategories.find(cat => 
              cat.name.toLowerCase().includes(admissionTypes[type].toLowerCase())
            );
            if (typeCategory) {
              setSelectedCategory(typeCategory._id);
            } else {
              setError(`Không tìm thấy danh mục tuyển sinh ${admissionTypes[type]}`);
            }
          } else {
            // Khi ở trang tuyển sinh chính, không chọn riêng danh mục nào
            // Mà sẽ lấy tất cả bài viết từ tất cả danh mục con
            await fetchAllAdmissionPosts(childCategories);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
        setError("Không thể tải danh mục tuyển sinh");
      }
    };

    fetchCategories();
  }, [type]);

  // Lấy tất cả bài viết từ tất cả danh mục tuyển sinh
  const fetchAllAdmissionPosts = async (childCategories) => {
    setLoading(true);
    try {
      // Lấy các ID của tất cả danh mục con
      const categoryIds = childCategories.map(cat => cat._id);
      
      // Tạo một mảng promises để fetch bài viết từ tất cả danh mục
      const promises = categoryIds.map(catId => 
        axios.get(`${backendUrl}/api/posts/category/${catId}`)
      );
      
      // Đợi tất cả request hoàn thành
      const responses = await Promise.all(promises);
      
      // Gộp tất cả bài viết và sắp xếp theo thời gian (mới nhất trước)
      let allPosts = [];
      responses.forEach(response => {
        allPosts = [...allPosts, ...response.data];
      });
      
      // Sắp xếp bài viết theo thời gian
      allPosts.sort((a, b) => new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at));
      
      // Lưu tất cả bài viết
      setAllAdmissionPosts(allPosts);
      
      // Xử lý phân trang
      const total = allPosts.length;
      const startIndex = (pagination.current - 1) * pagination.pageSize;
      const endIndex = Math.min(startIndex + pagination.pageSize, total);
      const paginatedPosts = allPosts.slice(startIndex, endIndex);
      
      setPosts(paginatedPosts);
      setPagination(prev => ({
        ...prev,
        total: total
      }));
      
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy tất cả bài viết tuyển sinh:", error);
      setError("Không thể tải bài viết tuyển sinh");
      setLoading(false);
    }
  };

  // Lấy bài viết theo danh mục được chọn
  useEffect(() => {
    if (!selectedCategory) return;
    
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${backendUrl}/api/posts/category/${selectedCategory}?page=${pagination.current}&limit=${pagination.pageSize}`
        );
        
        // Đối với API trả về dạng { data, pagination }
        if (response.data.data && response.data.pagination) {
          setPosts(response.data.data);
          setPagination(prev => ({
            ...prev,
            total: response.data.pagination.total
          }));
        } else {
          // Đối với API trả về trực tiếp mảng bài viết
          setPosts(response.data);
          setPagination(prev => ({
            ...prev,
            total: response.data.length
          }));
        }
        
        setError(null);
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
        setError("Không thể tải bài viết tuyển sinh");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory, pagination.current, pagination.pageSize]);

  // Hàm xử lý khi thay đổi trang
  const handlePageChange = (page) => {
    setPagination(prev => ({
      ...prev,
      current: page
    }));

    // Nếu đang ở trang tuyển sinh chính (không có type), thì phải thực hiện phân trang thủ công
    if (!type) {
      const startIndex = (page - 1) * pagination.pageSize;
      const endIndex = Math.min(startIndex + pagination.pageSize, allAdmissionPosts.length);
      const paginatedPosts = allAdmissionPosts.slice(startIndex, endIndex);
      setPosts(paginatedPosts);
    }
  };

  // Format date cho bài viết
  const formattedPosts = posts.map(post => ({
    ...post,
    id: post._id,
    createdAt: formatDate(post.created_at || post.updated_at),
    link: `/bai-viet/${post._id}` // Thêm trường link đầy đủ
  }));

  // Hàm format ngày tháng
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <CategoryLayout
      title={type ? `Tuyển sinh ${admissionTypes[type]}` : "Tuyển sinh"}
      sidebarTitle="Tuyển sinh"
      navigationLinks={navigationLinks}
      menuItems={menuItems}
      posts={formattedPosts}
      loading={loading}
      error={error}
      baseUrl="/bai-viet/"
      pagination={
        <Pagination
          current={pagination.current}
          total={pagination.total}
          pageSize={pagination.pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      }
    />
  );
}

export default AdmissionMain;