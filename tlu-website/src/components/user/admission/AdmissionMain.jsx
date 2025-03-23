import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CategoryLayout from "../../layouts/CategoryLayout";
import categoryService from "../../../services/api/categoryService";

function AdmissionMain() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState(null);
  const location = useLocation();
  
  // Trạng thái phân trang
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0
  });

  // Xác định loại tuyển sinh từ URL khi component mount
  useEffect(() => {
    const admissionType = categoryService.getAdmissionTypeFromPath(location.pathname);
    setType(admissionType);
  }, [location.pathname]);

  // Fetch dữ liệu khi type hoặc trang thay đổi
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const result = await categoryService.getPostsByAdmissionType({
          type: type,
          page: pagination.current,
          limit: pagination.pageSize
        });
        
        setPosts(result.data);
        setPagination(prev => ({
          ...prev,
          total: result.total,
          totalPages: result.totalPages
        }));
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [type, pagination.current, pagination.pageSize]);

  // Định nghĩa các loại tuyển sinh
  const admissionTypes = {
    undergraduate: "Đại học",
    master: "Thạc sĩ",
    doctoral: "Tiến sĩ",
  };

  // Các mục trong sidebar
  const menuItems = [
    {
      label: "Tuyển sinh Đại học",
      link: "/tuyen-sinh/dai-hoc",
      marker: type === "undergraduate",
      onClick: () => changeType("undergraduate"),
    },
    {
      label: "Tuyển sinh Thạc sĩ",
      link: "/tuyen-sinh/thac-si",
      marker: type === "master",
      onClick: () => changeType("master"),
    },
    {
      label: "Tuyển sinh Tiến sĩ",
      link: "/tuyen-sinh/tien-si",
      marker: type === "doctoral",
      onClick: () => changeType("doctoral"),
    },
  ];

  // Đường dẫn điều hướng
  const navigationLinks = [
    { label: "Trang chủ", href: "/" },
    { label: "Tuyển sinh", href: "/tuyen-sinh" },
    ...(type
      ? [
          {
            label: `Tuyển sinh ${admissionTypes[type]}`,
            href: `/tuyen-sinh/${type === "undergraduate" ? "dai-hoc" : type === "master" ? "thac-si" : "tien-si"}`,
          },
        ]
      : []),
  ];
  
  // Đổi loại tuyển sinh
  const changeType = (newType) => {
    let url = '/tuyen-sinh';
    
    if (newType === 'undergraduate') {
      url = '/tuyen-sinh/dai-hoc';
    } else if (newType === 'master') {
      url = '/tuyen-sinh/thac-si';
    } else if (newType === 'doctoral') {
      url = '/tuyen-sinh/tien-si';
    }
    
    window.location.href = url;
  };
  
  // Đổi trang
  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, current: page }));
    window.scrollTo(0, 0);
  };

  return (
    <CategoryLayout
      title={type ? `Tuyển sinh ${admissionTypes[type]}` : "Tuyển sinh"}
      navigationLinks={navigationLinks}
      menuItems={menuItems}
      posts={posts}
      loading={loading}
      error={error}
      pagination={pagination}
      onPageChange={handlePageChange}
    />
  );
}

export default AdmissionMain;