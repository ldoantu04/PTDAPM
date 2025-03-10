import React from "react";
import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";
import HighlightHeader from "../layouts/HighlightHeader";
import ArticleOther from "../layouts/ArticleOther";
import Sidebar from "../layouts/Sidebar";
import SmallNavBar from "../layouts/SmallNavBar"

function Announcements() {
  const sidebarData = [
    { label: "Thông báo chung", link: "" },
    { label: "Thông báo Đại học", link: "" },
    { label: "Thông báo Sau Đại học", link: "" },
  ];

  const sampleData = {
    navigationLinks: [
      { label: "Trang chủ", href: "/" },
      { label: "Thông báo", href: "" },
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
                <Sidebar title="Thông báo" items={sidebarData} />
              </div>

              <div className="pr-10">
                <HighlightHeader title="THÔNG BÁO" />
                <div className="flex flex-col gap-y-5">
                  <ArticleOther link="" />
                  <ArticleOther link="" />
                  <ArticleOther link="" />
                  <ArticleOther link="" />
                  <ArticleOther link="" />
                  <ArticleOther link="" />
                </div>
              </div>

            </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Announcements;
