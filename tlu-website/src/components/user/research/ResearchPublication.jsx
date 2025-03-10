import React from "react";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import Sidebar from "../../layouts/Sidebar";
import SmallNavBar from "../../layouts/SmallNavBar";

function ResearchPublication() {
  const sidebarData = [
    { label: "Công bố khoa học", link: "/nghien-cuu/cong-bo-khoa-hoc", marker: true },
    { label: "Đề tài NCKH", link: "/nghien-cuu/de-tai-nckh" },
    { label: "Các nhóm nghiên cứu", link: "/nghien-cuu/cac-nhom-nghien-cuu" },
    { label: "Triển khai ứng dụng", link: "/nghien-cuu/trien-khai-ung-dung" },
    { label: "Sinh viên NCKH", link: "/nghien-cuu/sinh-vien-nckh" },
  ];

  const sampleData = {
    navigationLinks: [
      { label: "Trang chủ", href: "/" },
      { label: "Nghiên cứu", href: "" },
      { label: "Công bố khoa học", href: "" },
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
                <p className='text-[#192E58] font-bold text-3xl pb-10'>Công bố khoa học</p>
                <div className="leading-loose">
                    <p>Thầy cô Khoa CNTT tích cực công bố bài báo khoa học trên các tạp chí và hội nghị uy tín bao gồm các tạp chí quốc tế thuộc danh mục SCIE, tạp chí trong nước, hội nghị quốc tế và hội nghị trong nước có chất lượng cao nhằm chia sẻ các kết quả nghiên cứu và tăng xếp hạng của Khoa và đóng góp và xếp hạng của Trường Đại học Thuỷ lợi. Năm 2022, Khoa CNTT có 30 bài báo đăng trong các tạp chí rất uy tín thuộc danh mục SCIE (Q1,Q2, Q3); 41 bài báo đăng trong kỷ yếu của các hội nghị quốc tế và trong nước.</p>
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