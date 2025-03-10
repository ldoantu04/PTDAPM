import React from "react";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import HighlightHeader from "../../layouts/HighlightHeader";
import ArticleMainPage from "../../layouts/ArticleMainPage";
import Sidebar from "../../layouts/Sidebar";
import SmallNavBar from "../../layouts/SmallNavBar";

function StudentRecruitment() {
  const sidebarData = [
    { label: "Tuyển dụng sinh viên", link: "/tuyen-dung/tuyen-dung-sinh-vien", marker: true },
    { label: "Tuyển dụng giảng viên", link: "/tuyen-dung/tuyen-dung-giang-vien" },
  ];

  const sampleData = {
    navigationLinks: [
      { label: "Trang chủ", href: "/" },
      { label: "Tuyển dụng", href: "" },
      { label: "Tuyển dụng sinh viên", href: "" },
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
              <Sidebar title="Tuyển dụng" items={sidebarData} />
            </div>

            <div className="flex flex-col gap-y-10">
                <div className="pr-10">
                <HighlightHeader title="THỰC TẬP" />
                <div className="grid grid-cols-3 gap-5">
                    <ArticleMainPage title="Công ty cổ phần ABCXYZ" link="" />
                    <ArticleMainPage title="Công ty cổ phần ABCXYZ" link="" />
                    <ArticleMainPage title="Công ty cổ phần ABCXYZ" link="" />
                    <ArticleMainPage title="Công ty cổ phần ABCXYZ" link="" />
                    <ArticleMainPage title="Công ty cổ phần ABCXYZ" link="" />
                    <ArticleMainPage title="Công ty cổ phần ABCXYZ" link="" />
                </div>
                </div>

                <div className="pr-10">
                <HighlightHeader title="VIỆC LÀM" />
                <div className="grid grid-cols-3 gap-5">
                    <ArticleMainPage title="Công ty cổ phần ABCXYZ" link="" />
                    <ArticleMainPage title="Công ty cổ phần ABCXYZ" link="" />
                    <ArticleMainPage title="Công ty cổ phần ABCXYZ" link="" />
                    <ArticleMainPage title="Công ty cổ phần ABCXYZ" link="" />
                    <ArticleMainPage title="Công ty cổ phần ABCXYZ" link="" />
                    <ArticleMainPage title="Công ty cổ phần ABCXYZ" link="" />
                </div>
                </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default StudentRecruitment;
