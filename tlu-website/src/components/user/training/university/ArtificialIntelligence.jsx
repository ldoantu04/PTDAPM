import React from "react";
import NavBar from "../../../layouts/NavBar";
import Footer from "../../../layouts/Footer";
import SmallNavBar from "../../../layouts/SmallNavBar";
import Sidebar from "../../../layouts/Sidebar";

function ArtificialIntelligence() {
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
    },
    {
      label: "Ngành Trí tuệ nhân tạo",
      link: "/dao-tao/dao-tao-dai-hoc/nganh-tri-tue-nhan-tao",
      marker: true,
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
      { label: "Ngành Trí tuệ nhân tạo", href: "" },
    ],
  };
  
  return (
    <>
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
              Ngành Trí tuệ nhân tạo
            </h2>
            <p className="my-4">
              Trí tuệ nhân tạo (AI) là ngành học về việc phát triển các hệ thống và 
              phần mềm có khả năng thực hiện các nhiệm vụ thường đòi hỏi trí tuệ của con người, 
              như nhận dạng hình ảnh, xử lý ngôn ngữ tự nhiên, học máy và ra quyết định.
            </p>
            <p>
              Chương trình đào tạo ngành Trí tuệ nhân tạo cung cấp cho sinh viên kiến thức 
              nền tảng về khoa học máy tính cùng với các kiến thức chuyên sâu về AI, 
              giúp họ phát triển các giải pháp thông minh cho nhiều lĩnh vực khác nhau.
            </p>
            
            <p className="my-4 font-bold">MỤC TIÊU ĐÀO TẠO</p>
            <ul className="my-4">
              <p className="pb-2">
                Sau khi tốt nghiệp ngành Trí tuệ nhân tạo, sinh viên sẽ đạt được:
              </p>
              <li>
                &bull; <span className="font-semibold">Kiến thức: </span>
                Có kiến thức vững về toán học cho AI, học máy, học sâu, xử lý ngôn ngữ tự nhiên,
                thị giác máy tính và các kỹ thuật AI hiện đại.
              </li>
              <li>
                &bull; <span className="font-semibold">Kỹ năng: </span>
                Có khả năng thiết kế, phát triển và triển khai các hệ thống AI; phân tích và 
                xử lý dữ liệu lớn; nghiên cứu và áp dụng các thuật toán AI mới.
              </li>
              <li>
                &bull; <span className="font-semibold">Phẩm chất đạo đức: </span>
                Có đạo đức nghề nghiệp cao, hiểu biết về các vấn đề đạo đức và xã hội 
                liên quan đến AI, có khả năng làm việc độc lập và theo nhóm.
              </li>
            </ul>
            
            <p className="my-4 font-bold">SỰ NGHIỆP TƯƠNG LAI</p>
            <ul className="my-4">
              <p className="pb-2">
                Cử nhân tốt nghiệp ngành Trí tuệ nhân tạo có thể làm các công việc:
              </p>
              <li>
                &bull; Kỹ sư AI, kỹ sư học máy tại các công ty công nghệ.
              </li>
              <li>
                &bull; Chuyên viên phát triển các giải pháp AI cho y tế, tài chính, sản xuất...
              </li>
              <li>
                &bull; Chuyên viên phân tích dữ liệu, khai phá dữ liệu.
              </li>
              <li>
                &bull; Nghiên cứu viên AI tại các viện nghiên cứu, trường đại học.
              </li>
            </ul>
            <a
              href="https://cse.tlu.edu.vn/Uploads/Images/DaoTao/02_B%E1%BA%A3n%20m%C3%B4%20t%E1%BA%A3%20CT%C4%90T%20TTNT-KHDL%20v1(1).pdf"
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
              <span className="font-bold text-[#C10629] text-2xl">7480207</span>
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
    </>
  );
}

export default ArtificialIntelligence;