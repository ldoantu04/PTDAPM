import React from "react";
import CategoryLayout from "../../layouts/CategoryLayout";
import { useAdmissionData } from "../../../hooks/useAdmissionData";

function AdmissionMain() {
  const {
    posts,
    loading,
    error,
    pagination,
    type,
    changeType,
    handlePageChange,
  } = useAdmissionData();

  // Định nghĩa các loại tuyển sinh
  const admissionTypes = {
    undergraduate: "Đại học",
    master: "Thạc sĩ",
    doctoral: "Tiến sĩ",
  };

  // Các mục trong sidebar
  const menuItems = [
    // {
    //   label: "Tất cả",
    //   link: "/tuyen-sinh",
    //   marker: !type,
    //   onClick: () => changeType(null),
    // },
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
            href: `/tuyen-sinh/${type}`,
          },
        ]
      : []),
  ];

  // Content phụ cho sidebar - không sử dụng featuredPosts nữa
  const extraSidebar = (
    <div className="mt-8 bg-blue-50 p-5 rounded-lg border border-blue-100">
      <h3 className="font-bold text-lg text-[#060A52] mb-3">Liên hệ tư vấn</h3>
      <div className="space-y-2">
        <p>Phòng Tuyển sinh và Truyền thông</p>
        <p>Email: tuyensinh@tlu.edu.vn</p>
        <p>Hotline: 0913.298.179</p>
        <p>Địa chỉ: 175 Tây Sơn, Đống Đa, Hà Nội</p>
      </div>
    </div>
  );

  return (
    <CategoryLayout
      posts={posts}
      loading={loading}
      error={error}
      pagination={pagination}
      handlePageChange={handlePageChange}
      menuItems={menuItems}
      navigationLinks={navigationLinks}
      title={type ? `TUYỂN SINH ${admissionTypes[type].toUpperCase()}` : "TUYỂN SINH"}
      sidebarTitle="Tuyển sinh"
      baseUrl="/tuyen-sinh/bai-viet/"
      // extraSidebar={extraSidebar}
    />
  );
}

export default AdmissionMain;