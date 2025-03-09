import React from "react";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import HighlightHeader from "../../layouts/HighlightHeader";
import ArticleMainPage from "../../layouts/ArticleMainPage";
import Sidebar from "../../layouts/Sidebar";
import SmallNavBar from "../../layouts/SmallNavBar";

function BusinessScholarship() {
  const sidebarData = [
    "Danh sách đối tác",
    "Chương trình hợp tác",
    "Học bổng doanh nghiệp",
  ];

  const sampleData = {
    navigationLinks: [
      { label: "Trang chủ", href: "/" },
      { label: "Doanh nghiệp", href: "" },
      { label: "Học bổng doanh nghiệp", href: "" },
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
              <HighlightHeader title="HỌC BỔNG DOANH NGHIỆP" />
              <div className="grid grid-cols-3 gap-5">
                <ArticleMainPage title="Học bổng của công ty cổ phần ABCXYZ" link="/doanh-nghiep/hoc-bong-doanh-nghiep/chi-tiet-hoc-bong" />
                <ArticleMainPage title="Học bổng của công ty cổ phần ABCXYZ" link="/doanh-nghiep/hoc-bong-doanh-nghiep/chi-tiet-hoc-bong" />
                <ArticleMainPage title="Học bổng của công ty cổ phần ABCXYZ" link="/doanh-nghiep/hoc-bong-doanh-nghiep/chi-tiet-hoc-bong" />
                <ArticleMainPage title="Học bổng của công ty cổ phần ABCXYZ" link="/doanh-nghiep/hoc-bong-doanh-nghiep/chi-tiet-hoc-bong" />
                <ArticleMainPage title="Học bổng của công ty cổ phần ABCXYZ" link="/doanh-nghiep/hoc-bong-doanh-nghiep/chi-tiet-hoc-bong" />
                <ArticleMainPage title="Học bổng của công ty cổ phần ABCXYZ" link="/doanh-nghiep/hoc-bong-doanh-nghiep/chi-tiet-hoc-bong" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BusinessScholarship;
