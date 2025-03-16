import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="mt-28">
      <div className="flex flex-col items-center bg-[#192E58] p-5">
        <div className="flex justify-center w-full max-w-5xl text-white space-x-10">
          <a href="/admin/tong-quan" className="flex items-center space-x-2">
            <img
              src="/assets/admin/icon_tongquan.png"
              alt=""
              className="w-6 h-6"
            />
            <div className="font-bold">Tổng quan</div>
          </a>

          <a
            href="/trolykhoa/quan-ly-bai-viet"
            className="flex items-center space-x-2"
          >
            <img
              src="/assets/admin/icon_baiviet.png"
              alt=""
              className="w-6 h-6"
            />
            <div className="font-bold">Bài viết</div>
          </a>

          <a href="/admin/danh" className="flex items-center space-x-2">
            <img
              src="/assets/admin/icon_danhmuc.png"
              alt=""
              className="w-6 h-6"
            />
            <div className="font-bold">Danh mục</div>
          </a>

          <Link to="/admin/nhan-su" className="flex items-center space-x-2">
            <img
              src="/assets/admin/icon_nhansu.png"
              alt=""
              className="w-6 h-6"
            />
            <div className="font-bold">Nhân sự</div>
          </Link>

          <Link to="/admin/tai-khoan" className="flex items-center space-x-2">
            <img
              src="/assets/admin/icon_taikhoan.png"
              alt=""
              className="w-6 h-6"
            />
            <div className="font-bold">Tài khoản</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
