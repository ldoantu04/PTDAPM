import React from "react";
import NavBar from "../../../layouts/NavBar";
import Footer from "../../../layouts/Footer";
import SmallNavBar from "../../../layouts/SmallNavBar";
import Sidebar from "../../../layouts/Sidebar";

function InformationTechnology() {
  const sidebarData1 = [
    {
      label: "Ngành Công nghệ thông tin",
      link: "/dao-tao/dao-tao-dai-hoc/nganh-cong-nghe-thong-tin",
      marker: true,
    },
    {
      label: "Ngành Kỹ thuật phần mềm",
      link: "/dao-tao/dao-tao-dai-hoc/nganh-ky-thuat-phan-mem",
    },
    {
      label: "Ngành Hệ thống thông tin",
      link: "/dao-tao/dao-tao-dai-hoc/nganh-he-thong-thong-tin",
    },
    {
      label: "Ngành Trí tuệ nhân tạo",
      link: "/dao-tao/dao-tao-dai-hoc/nganh-tri-tue-nhan-tao",
    },
    {
      label: "Ngành An ninh mạng",
      link: "/dao-tao/dao-tao-dai-hoc/nganh-an-ninh-mang",
    },
  ];
  
  const sidebarData2 = [
    { label: "Chương trình Thạc sĩ", link: "" },
    { label: "Chương trình Tiến sĩ", link: "" },
  ];

  const sampleData = {
    navigationLinks: [
      { label: "Trang chủ", href: "/" },
      { label: "Đào tạo", href: "" },
      { label: "Đào tạo Đại học", href: "" },
      { label: "Ngành Công nghệ thông tin", href: "" },
    ],
  };
  
  return (
    <div>
      <NavBar />
      <main>
        <SmallNavBar navigationLinks={sampleData.navigationLinks} />
        <div className="flex gap-20">
          <div className="w-1/4 space-y-10">
            <Sidebar title="Đào tạo Đại học" items={sidebarData1} />
            <Sidebar title="Đào tạo Sau đại học" items={sidebarData2} />
          </div>
          <div className="w-2/4">
            <h2 className="text-4xl font-bold text-[#060A52] mb-9">
              Ngành Công nghệ thông tin
            </h2>
            <p className="my-4">
              Công nghệ thông tin là ngành học về việc phát triển, triển khai, 
              hỗ trợ hoặc quản lý các hệ thống thông tin dựa trên máy tính, 
              đặc biệt là các ứng dụng phần mềm và phần cứng máy tính.
            </p>
            <p>
              Chương trình đào tạo ngành Công nghệ thông tin trang bị cho sinh viên các kiến thức và kỹ năng
              cơ bản và chuyên sâu về công nghệ thông tin, giúp họ có thể thích nghi với 
              môi trường công nghệ không ngừng thay đổi và phát triển.
            </p>
            
            <p className="my-4 font-bold">MỤC TIÊU ĐÀO TẠO</p>
            <ul className="my-4">
              <p className="pb-2">
                Sau khi tốt nghiệp ngành Công nghệ thông tin, sinh viên sẽ đạt được:
              </p>
              <li>
                &bull; <span className="font-semibold">Kiến thức: </span>
                Nắm vững kiến thức cơ bản và nâng cao về khoa học máy tính, 
                hệ thống phần mềm, phần cứng và mạng máy tính, cơ sở dữ liệu,
                các ứng dụng công nghệ thông tin.
              </li>
              <li>
                &bull; <span className="font-semibold">Kỹ năng: </span>
                Có khả năng thiết kế, phát triển, vận hành và quản trị các hệ thống 
                công nghệ thông tin; có kỹ năng phân tích và giải quyết vấn đề trong 
                lĩnh vực công nghệ thông tin hiện đại.
              </li>
              <li>
                &bull; <span className="font-semibold">Phẩm chất đạo đức: </span>
                Có phẩm chất chính trị tốt, đạo đức nghề nghiệp, ý thức trách nhiệm 
                với cộng đồng và xã hội; có khả năng làm việc độc lập và làm việc nhóm
                hiệu quả.
              </li>
            </ul>
            
            <p className="my-4 font-bold">SỰ NGHIỆP TƯƠNG LAI</p>
            <ul className="my-4">
              <p className="pb-2">
                Cử nhân tốt nghiệp ngành Công nghệ thông tin có thể làm các công việc:
              </p>
              <li>
                &bull; Lập trình viên, kỹ sư phần mềm tại các công ty phần mềm trong và ngoài nước.
              </li>
              <li>
                &bull; Quản trị viên hệ thống, quản trị mạng, quản trị cơ sở dữ liệu.
              </li>
              <li>
                &bull; Chuyên viên phân tích, thiết kế và triển khai các giải pháp 
                công nghệ thông tin cho các tổ chức, doanh nghiệp.
              </li>
              <li>
                &bull; Nghiên cứu viên, giảng viên tại các cơ sở nghiên cứu, 
                giáo dục đào tạo về công nghệ thông tin.
              </li>
            </ul>
            <a
              href="https://cse.tlu.edu.vn/Uploads/Images/DaoTao/B%E1%BA%A3n%20m%C3%B4%20t%E1%BA%A3%20CTDT%20ng%C3%A0nh%20CNTT-2022.pdf"
              className="text-[#C10629] font-bold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chi tiết xem tại đây 👈
            </a>
          </div>

          <div className="w-1/5 text-right text-[#192E58]">
            <p className="font-bold border-b-2 border-blue1 pb-2 mb-2 text-[14px]">
              Mã ngành:{" "}
              <span className="font-bold text-[#C10629] text-2xl">7480201</span>
            </p>
            <p className="font-bold my-5 text-[14px]">
              Thời gian học: <span className="font-extrabold">4 năm</span>
            </p>
            <p className="font-bold text-[14px]">
              Tổ hợp môn thi: A00, A01, <p>D01, D07</p>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default InformationTechnology;