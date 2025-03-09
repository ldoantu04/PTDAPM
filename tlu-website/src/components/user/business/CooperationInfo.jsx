import React from "react";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import Sidebar from "../../layouts/Sidebar";
import SmallNavBar from "../../layouts/SmallNavBar";

function CooperationInfo() {

  const sidebarData = [
    "Danh sách đối tác",
    "Chương trình hợp tác",
    "Học bổng doanh nghiệp",
  ];

  const sampleData = {
    navigationLinks: [
      { label: "Trang chủ", href: "/" },
      { label: "Doanh nghiệp", href: "" },
      { label: "Danh sách đối tác", href: "/doanh-nghiep/danh-sach-doi-tac" },
      { label: "Chi tiết về công ty", href: "" },
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
              <Sidebar title="Doanh nghiệp" items={sidebarData} />
            </div>

            <div className="pr-10">
            <h2 className="text-3xl font-bold text-[#192E58]">Chi tiết về công ty</h2>
              <div
                className="mb-[30px]"
                style={{
                  backgroundImage: "url('/assets/lecturer_list/background.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  backgroundBlendMode: "lighten",
                }}
              >
                <div className="flex flex-row gap-3 mt-10">
                  <div className="w-1/3 overflow-hidden">
                      <img 
                        src="/assets/article_image_sample.png"
                        alt=""
                        className="object-cover w-full h-full"  
                      />
                  </div>
                  <div className="w-2/3 my-7">
                    <p className="font-bold text-[24px] text-black">Công Ty Cổ Phần Gem Hà Nội</p>
                    <p className="font-normal text-[16px] text-[#E82323] mt-4">Tầng 3, Tòa nhà The Nine, số 9 Phạm Văn Đồng, Mai Dịch, Cầu Giấy, Hà Nội</p>
                    <div className="flex items-center gap-2 font-normal text-[14px] text-black mt-4">
                      <img src="/assets/partner_image_slider/icon_web.png" alt="" />
                      <a href="">https://gem-corp.tech/</a>
                    </div>
                    <div className="flex items-center gap-2 font-normal text-[14px] text-black mt-4">
                      <img src="/assets/partner_image_slider/icon_fb.png" alt="" />
                      <a href="">https://www.facebook.com/tuyendungGEM</a>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-10 font-normal text-[16px] text-black">
                Được thành lập năm 2014, Global Enterprise Mobility (GEM) là công ty công nghệ chuyên cung cấp giải pháp và phát triển phần mềm cho các khách hàng doanh nghiệp trong lĩnh vực vận tải, sản xuất, y tế... Sau 10 năm phát triển, với gần 300 nhân sự có kiến thức sâu rộng và kinh nghiệm, năng lực triển khai giải pháp theo tiêu chuẩn quốc tế, GEM đã và đang từng bước khẳng định vị thế tại các thị trường Nhật Bản, Hàn Quốc, Singapore, Úc, Hoa Kỳ và Châu Âu.Với mục tiêu phát triển doanh nghiệp bền vững, GEM định vị một trong các giá trị cốt lõi của công ty là con người song hành cùng doanh nghiệp. Chính vì vậy, GEM luôn mang đến cho nhân viên những cơ hội học tập và thăng tiến trong công việc, những chính sách đãi ngộ hấp dẫn cùng môi trường văn hóa trẻ trung, cởi mở và chuyên nghiệp.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CooperationInfo