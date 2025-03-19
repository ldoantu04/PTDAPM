import React from "react";
import NavBar from "../../../layouts/NavBar";
import Footer from "../../../layouts/Footer";
import SmallNavBar from "../../../layouts/SmallNavBar";
import Sidebar from "../../../layouts/Sidebar";

function InformationSystem() {
  const sidebarData1 = [
    {
      label: "Ngành Công nghệ thông tin",
      link: "/dao-tao/dao-tao-dai-hoc/nganh-cong-nghe-thong-tin",
    },
    {
      label: "Ngành Kỹ thuật phần mềm",
      link: "/dao-tao/dao-tao-dai-hoc/nganh-ky-thuat-phan-mem",
    },
    {
      label: "Ngành Hệ thống thông tin",
      link: "/dao-tao/dao-tao-dai-hoc/nganh-he-thong-thong-tin",
      marker: true,
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
      { label: "Ngành Hệ thống thông tin", href: "" },
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
              Ngành Hệ thống thông tin
            </h2>
            <p className="my-4">
              Hệ thống thông tin là ngành học về việc phát triển, ứng dụng, tích hợp 
              và quản lý các hệ thống thông tin trong tổ chức. Ngành này tập trung vào 
              cách thức sử dụng công nghệ thông tin để hỗ trợ các quy trình kinh doanh 
              và ra quyết định.
            </p>
            <p>
              Chương trình đào tạo ngành Hệ thống thông tin kết hợp giữa kiến thức 
              công nghệ thông tin và kiến thức quản lý, kinh doanh, giúp sinh viên 
              có khả năng thiết kế và triển khai các giải pháp công nghệ thông tin 
              đáp ứng nhu cầu của tổ chức.
            </p>
            
            <p className="my-4 font-bold">MỤC TIÊU ĐÀO TẠO</p>
            <ul className="my-4">
              <p className="pb-2">
                Sau khi tốt nghiệp ngành Hệ thống thông tin, sinh viên sẽ đạt được:
              </p>
              <li>
                &bull; <span className="font-semibold">Kiến thức: </span>
                Có kiến thức về thiết kế, triển khai và quản lý hệ thống thông tin; 
                hiểu biết về cơ sở dữ liệu, phân tích dữ liệu, và quy trình nghiệp vụ 
                trong tổ chức.
              </li>
              <li>
                &bull; <span className="font-semibold">Kỹ năng: </span>
                Có khả năng phát triển và quản lý hệ thống thông tin, phân tích và thiết kế
                hệ thống, quản lý dự án công nghệ thông tin, và áp dụng công nghệ vào
                giải quyết các vấn đề kinh doanh.
              </li>
              <li>
                &bull; <span className="font-semibold">Phẩm chất đạo đức: </span>
                Có đạo đức nghề nghiệp, trách nhiệm xã hội, khả năng làm việc nhóm và 
                giao tiếp hiệu quả trong môi trường làm việc đa văn hóa.
              </li>
            </ul>
            
            <p className="my-4 font-bold">SỰ NGHIỆP TƯƠNG LAI</p>
            <ul className="my-4">
              <p className="pb-2">
                Cử nhân tốt nghiệp ngành Hệ thống thông tin có thể làm các công việc:
              </p>
              <li>
                &bull; Chuyên viên phân tích hệ thống thông tin, thiết kế và triển khai hệ thống.
              </li>
              <li>
                &bull; Quản trị cơ sở dữ liệu, quản lý dự án công nghệ thông tin.
              </li>
              <li>
                &bull; Chuyên viên tư vấn giải pháp công nghệ thông tin cho doanh nghiệp.
              </li>
              <li>
                &bull; Chuyên viên phân tích dữ liệu, hỗ trợ ra quyết định trong tổ chức.
              </li>
            </ul>
            <a
              href="https://cse.tlu.edu.vn/Uploads/Images/DaoTao/B%E1%BA%A3n%20m%C3%B4%20t%E1%BA%A3%20CTDT%20ng%C3%A0nh%20HTTT-2023.pdf"
              className="text-[#C10629] font-bold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chi tiết xem tại đây 👈
            </a>
          </div>

          <div className="w-1/5 text-right text-[#192E58]">
            <p className="font-bold border-b pb-2 mb-2 text-[14px]">
              Mã ngành:{" "}
              <span className="font-bold text-[#C10629] text-2xl">7480104</span>
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

export default InformationSystem;