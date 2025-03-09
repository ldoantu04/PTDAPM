import React from "react";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import Sidebar from "../../layouts/Sidebar";
import SmallNavBar from "../../layouts/SmallNavBar";

function ScientificResearchTopic() {
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
      { label: "Đề tài NCKH", href: "" },
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
                <p className='text-[#192E58] font-bold text-3xl pb-10'>Đề tài NCKH</p>
                <div className="space-y-3">
                    <p>Thầy cô Khoa CNTT đã và đang chủ trì cũng như tham gia phối hợp với các đơn vị khác trong trường, các đơn vị ngoài trường và các tổ chức quốc tế các đề tài NCKH ở các cấp và phạm vi khác nhau bao gồm các đề tài quốc tế (EU, Erasmus +,...), cấp nhà nước (NAFOSTED,...), cấp bộ (Bộ NN và PTNN, Bộ Y Tế,...), cấp tỉnh và đề tài cơ sở cấp Trường Đại học Thuỷ lợi. Các đề tài rất đa dạng từ những nghiên cứu lý thuyết đến nghiên cứu ứng dụng và các triển khai áp dụng thực tế. Trong năm 2022 Khoa đang triển khai 01 đề tài quốc tế (thuộc quỹ Belmon Forum), 02 đề tài cấp nhà nước (trong đó có 01 đề tài Nafosted), 02 đề tài cấp bộ (01 thuộc Bộ NN và PTNN; 01 thuộc bộ Y Tế) và một số đề tài triển khai ứng dụng thực tế và đề tài cơ sở khác.</p>
                </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ScientificResearchTopic;