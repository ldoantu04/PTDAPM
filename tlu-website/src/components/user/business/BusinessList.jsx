import React from "react";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import HighlightHeader from "../../layouts/HighlightHeader";
import ArticleMainPage from "../../layouts/ArticleMainPage";
import Sidebar from "../../layouts/Sidebar";
import SmallNavBar from "../../layouts/SmallNavBar";

function BusinessList() {
  const sidebarData = [
    "Danh sách đối tác",
    "Chương trình hợp tác",
    "Học bổng doanh nghiệp",
  ];

  const sampleData = {
    navigationLinks: [
      { label: "Trang chủ", href: "/" },
      { label: "Doanh nghiệp", href: "" },
      { label: "Danh sách đối tác", href: "" },
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
              <HighlightHeader title="DANH SÁCH ĐỐI TÁC" />
              <div className="grid grid-cols-3 gap-5">
                <ArticleMainPage title="Công ty cổ phần ABCXYZ" link="/doanh-nghiep/danh-sach-doi-tac/chi-tiet-doi-tac" />
                <ArticleMainPage title="Công ty cổ phần ABCXYZ" link="/doanh-nghiep/danh-sach-doi-tac/chi-tiet-doi-tac" />
                <ArticleMainPage title="Công ty cổ phần ABCXYZ" link="/doanh-nghiep/danh-sach-doi-tac/chi-tiet-doi-tac" />
                <ArticleMainPage title="Công ty cổ phần ABCXYZ" link="/doanh-nghiep/danh-sach-doi-tac/chi-tiet-doi-tac" />
                <ArticleMainPage title="Công ty cổ phần ABCXYZ" link="/doanh-nghiep/danh-sach-doi-tac/chi-tiet-doi-tac" />
                <ArticleMainPage title="Công ty cổ phần ABCXYZ" link="/doanh-nghiep/danh-sach-doi-tac/chi-tiet-doi-tac" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BusinessList;
