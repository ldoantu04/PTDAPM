import React from "react";
import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";
import HighlightHeader from "../layouts/HighlightHeader";
import ArticleOther from "../layouts/ArticleOther";
import Sidebar from "../layouts/Sidebar";
import SmallNavBar from "../layouts/SmallNavBar"

function News() {
  const sidebarData = [
    "Tin tức chung",
    "Tin đào tạo",
    "Tin KHCN & HTQT",
    "Tin công tác sinh viên",
  ];

  const sampleData = {
    navigationLinks: [
      { label: "Trang chủ", href: "/" },
      { label: "Tin tức", href: "" },
    ],
  };
  
  return (
    <div>
      <NavBar />

      <div>
        <div className="px-55 mx-auto mb-10 mt-30">
            <SmallNavBar navigationLinks={ sampleData.navigationLinks } />

            <div className="flex gap-x-30">
              <div >
                <Sidebar title="Tin tức" items={sidebarData} />
              </div>

              <div className="pr-10">
                <HighlightHeader title="TIN TỨC" />
                <div className="flex flex-col gap-y-5">
                  <ArticleOther link="/tuyen-sinh/chi-tiet-bai-viet" />
                  <ArticleOther link="/tuyen-sinh/chi-tiet-bai-viet" />
                  <ArticleOther link="/tuyen-sinh/chi-tiet-bai-viet" />
                  <ArticleOther link="/tuyen-sinh/chi-tiet-bai-viet" />
                  <ArticleOther link="/tuyen-sinh/chi-tiet-bai-viet" />
                  <ArticleOther link="/tuyen-sinh/chi-tiet-bai-viet" />
                </div>
              </div>

            </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default News;
