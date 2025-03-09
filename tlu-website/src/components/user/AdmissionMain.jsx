import React from "react";
import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";
import HighlightHeader from "../layouts/HighlightHeader";
import ArticleOther from "../layouts/ArticleOther";
import Sidebar from "../layouts/Sidebar";

function AdmissionMain() {
  const majors = [
    "Ngành Công nghệ thông tin",
    "Ngành Kỹ thuật phần mềm",
    "Ngành Hệ thống thông tin",
    "Ngành trí tuệ nhân tạo",
  ];
  return (
    <div>
      <NavBar />

      <div>
        <div className="w-[1300px] mx-auto mb-10 mt-30">
          <div>
            <div className="flex">
              <Sidebar items={majors} />
              <div className="pr-10">
                <HighlightHeader title="TUYỂN SINH" />
                <div className="flex flex-col gap-y-5">
                  <ArticleOther />
                  <ArticleOther />
                  <ArticleOther />
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

export default AdmissionMain;
