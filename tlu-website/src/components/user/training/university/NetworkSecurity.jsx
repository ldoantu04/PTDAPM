import React from "react";
import NavBar from "../../../layouts/NavBar";
import Footer from "../../../layouts/Footer";
import SmallNavBar from "../../../layouts/SmallNavBar";
import Sidebar from "../../../layouts/Sidebar";

function CyberSecurity() {
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
    },
    {
      label: "Ngành An ninh mạng",
      link: "/dao-tao/dao-tao-dai-hoc/nganh-an-ninh-mang",
      marker: true,
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
      { label: "Ngành An ninh mạng", href: "" },
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
              Ngành An ninh mạng
            </h2>
            <p className="my-4">
              An ninh mạng là ngành đào tạo các chuyên gia có khả năng bảo vệ hệ thống 
              thông tin, phát hiện và phòng chống các mối đe dọa trên không gian mạng 
              trong bối cảnh chuyển đổi số và phát triển công nghệ thông tin.
            </p>
            <p>
              Cử nhân An ninh mạng được trang bị kiến thức và kỹ năng chuyên sâu về 
              bảo mật, có khả năng phát triển, triển khai và vận hành các giải pháp 
              an ninh mạng, bảo vệ dữ liệu và hạ tầng công nghệ thông tin cho các 
              tổ chức, doanh nghiệp và cơ quan nhà nước.
            </p>
            
            <p className="my-4 font-bold">MỤC TIÊU ĐÀO TẠO</p>
            <ul className="my-4">
              <p className="pb-2">
                Sau khi tốt nghiệp ngành An ninh mạng, sinh viên sẽ đạt được:
              </p>
              <li>
                &bull; <span className="font-semibold">Kiến thức: </span>
                Nắm vững kiến thức nền tảng về công nghệ thông tin, mạng máy tính, 
                và các kiến thức chuyên sâu về an ninh mạng, mã hóa, bảo mật hệ thống, 
                phân tích và đối phó với các cuộc tấn công mạng.
              </li>
              <li>
                &bull; <span className="font-semibold">Kỹ năng: </span>
                Có khả năng thiết kế và triển khai các hệ thống bảo mật; phát hiện, 
                phân tích và ứng phó với các sự cố an ninh mạng; đánh giá lỗ hổng và 
                rủi ro của hệ thống; xây dựng chính sách và quy trình bảo mật.
              </li>
              <li>
                &bull; <span className="font-semibold">Phẩm chất đạo đức: </span>
                Có đạo đức nghề nghiệp cao, có trách nhiệm trong việc bảo vệ thông tin 
                và dữ liệu, tuân thủ các quy định pháp luật về an toàn thông tin, có khả 
                năng làm việc độc lập và theo nhóm hiệu quả.
              </li>
            </ul>
            
            <p className="my-4 font-bold">SỰ NGHIỆP TƯƠNG LAI</p>
            <ul className="my-4">
              <p className="pb-2">
                Cử nhân tốt nghiệp ngành An ninh mạng có thể làm các công việc:
              </p>
              <li>
                &bull; Chuyên gia bảo mật, chuyên gia phân tích an ninh mạng tại các doanh nghiệp 
                và tổ chức.
              </li>
              <li>
                &bull; Chuyên gia ứng phó sự cố an ninh mạng, điều tra số.
              </li>
              <li>
                &bull; Chuyên gia kiểm thử xâm nhập (Penetration Tester), đánh giá và quản lý 
                rủi ro an ninh mạng.
              </li>
              <li>
                &bull; Chuyên viên tại các cơ quan chuyên trách về an toàn thông tin, các 
                đơn vị an ninh mạng của các bộ, ngành.
              </li>
              <li>
                &bull; Nghiên cứu viên, giảng viên trong lĩnh vực an toàn thông tin và an ninh mạng.
              </li>
            </ul>
            <a
              href="https://cse.tlu.edu.vn/Uploads/Images/DaoTao/B%E1%BA%A3n%20m%C3%B4%20t%E1%BA%A3%20CTDT%20ng%C3%A0nh%20ANM-2022.pdf"
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
              <span className="font-bold text-[#C10629] text-2xl">7480202</span>
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

export default CyberSecurity;