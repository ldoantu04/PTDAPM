import React from "react";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import Sidebar from "../../layouts/Sidebar";
import SmallNavBar from "../../layouts/SmallNavBar";

function ResearchPublication() {
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
      { label: "Các nhóm nghiên cứu", href: "" },
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
                <p className='text-[#192E58] font-bold text-3xl pb-10'>Các nhóm nghiên cứu</p>
                <div className="space-y-3">
                    <ul className="list-disc list-inside space-y-2">
                        <li><b>AICOST: </b>AICOST là nhóm nghiên cứu mạnh của Trường Đại học Thuỷ lợi. Đây là nhóm nghiên cứu liên ngành giữa công nghệ thông tin, thuỷ văn và kỹ thuật tài nguyên nước nhằm mục tiêu ứng dụng trí tuệ nhân tạo cho các vấn đề thuỷ lợi, phòng chống thiên tai trong ngữ cảnh của biến đổi khí hậu.</li>
                        <li><b>MLIC: </b>MLIC là nhóm nghiên cứu mạnh của Trường Đại học Thuỷ lợi. Đây là nhóm nghiên cứu liên ngành giữa công nghệ thông tin, Điện- Điện Tử với mục tiêu xây dựng các hệ thống giám sát, điều khiển thông minh.</li>
                        <li><b>WARM: </b>Ứng dụng trí tuệ nhân tạo quản lý tài nguyên nước và thiên tai. WARM là nhóm nghiên cứu quốc tế thành lập trong khuôn khổ hợp tác giữa Trường Đại học Thuỷ lợi, Việt Nam và Viện Nghiên cứu vì sự Phát triển, cộng hoà Pháp. Đây là một nhóm liên ngành nhằm tạo ra một nền tảng số hỗ trợ quản lý dựa trên công nghệ mô hình hóa trong toán học và khoa học máy tính nhằm tối ưu hóa hoạt động của các hệ thống thủy lợi, dựa trên các mục tiêu kinh tế và chính trị cũng như giảm thiểu tác động tiêu cực của việc sử dụng nước đối với môi trường.</li>
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

export default ResearchPublication;