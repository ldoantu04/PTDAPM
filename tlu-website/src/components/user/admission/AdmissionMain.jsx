import React from "react";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import HighlightHeader from "../../layouts/HighlightHeader";
import ArticleOther from "../../layouts/ArticleOther";
import Sidebar from "../../layouts/Sidebar";
import SmallNavBar from "../../layouts/SmallNavBar"

function AdmissionMain() {
  const menuItems = [
    { label: "Tuyển sinh Đại học", link: "" },
    { label: "Tuyển sinh Thạc sĩ", link: "" },
    { label: "Tuyển sinh Tiến sĩ", link: "" },
  ];

  const sampleData = {
    navigationLinks: [
      { label: "Trang chủ", href: "/" },
      { label: "Tuyển sinh", href: "" },
    ],
  };
  
  return (
    <div>
      <NavBar />

      <div>
        <div className="px-55 mx-auto mb-10">
            <SmallNavBar navigationLinks={ sampleData.navigationLinks } />

            <div className="flex gap-x-30">
              <div >
                <Sidebar title="Tuyển sinh" items={menuItems} />
              </div>

              <div className="pr-10">
                <HighlightHeader title="TUYỂN SINH" />
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

export default AdmissionMain;
