import React from "react";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import Sidebar from "../../layouts/Sidebar";
import SmallNavBar from "../../layouts/SmallNavBar";

function ApplicationDeployment() {
  const sidebarData = [
    "Công bố khoa học",
    "Đề tài NCKH",
    "Các nhóm nghiên cứu",
    "Triển khai ứng dụng",
    "Sinh viên NCKH"
  ];

  const sampleData = {
    navigationLinks: [
      { label: "Trang chủ", href: "/" },
      { label: "Nghiên cứu", href: "" },
      { label: "Triển khai ứng dụng", href: "" },
    ],
  };

  return (
    <div>
      <NavBar />

      <div>
        <div className="px-55 mx-auto mb-10 mt-30">
          <SmallNavBar navigationLinks={sampleData.navigationLinks} />

          <div className="flex gap-x-30">
            <div>
              <Sidebar title="Nghiên cứu" items={sidebarData} />
            </div>

            <div>
                <p className='text-[#192E58] font-bold text-3xl pb-10'>Triển khai ứng dụng</p>
                <div className="space-y-3">
                    <p>Bên cạnh những nghiên cứu mang tính lý thuyết, Khoa CNTT cũng tích cực triển khai các nghiên cứu triển khai ứng dụng vào thực tế. Một số đề tài tiêu biểu gồm: </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Hệ thống phần mềm điều hành và quản lý đào tạo Đại học Thủy lơi - DTS:</li>
                        <img className="mx-auto" src="/assets/tlusoftware.png"></img>
                        <li>WARM (2018-2021): Xây dựng nền tảng số hỗ trợ quản lý dựa trên công nghệ mô hình hóa trong toán học và khoa học máy tính nhằm tối ưu hóa hoạt động của các hệ thống thủy lợi, dựa trên các mục tiêu kinh tế và chính trị cũng như giảm thiểu tác động tiêu cực của việc sử dụng nước đối với môi trường.</li>
                    </ul>
                </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ApplicationDeployment;