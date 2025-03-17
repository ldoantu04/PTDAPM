import React from "react";
import NavBar from "../layouts/NavBar";
import Toolbar from "../layouts/Toolbar";
import Footer from "../layouts/Footer";
import { Button } from "antd";

function Overview() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Toolbar />
      <div className="flex-grow flex items-center justify-center mt-24 mb-10 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full text-center">
          <h1 className="text-2xl font-bold text-[#192E58] mb-6">Chế độ quản lý</h1>
          <p className="text-lg text-gray-700">
            Tính năng không biết có được phát triển hay không, 
            vui lòng đợi thêm vài năm nữa :D
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Overview;
