import React from 'react';
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="w-full flex items-center justify-between px-50 py-4 bg-white shadow-md fixed top-0 z-10">
      {/* Logo */}
      <div>
        <a href="/">
          <img src="/assets/logo_khoa.jpg" alt="Logo" className="h-12" />
        </a>
      </div>

      {/* Phần chứa Đăng nhập + Menu */}
      <div className="flex flex-col items-end">
        {/* Đăng nhập */}
        <div className="mb-3 flex items-center gap-1 hover:text-red-500 transition-all duration-300 ease-out">
            <img src="/assets/login_user_image.png" alt="" />
            <Link to="/login" className="underline text-sm">
                Đăng nhập
            </Link>
        </div>

        {/* Menu */}
        <div className="flex space-x-2">
          <div className="relative group hover:text-red-700 transition-all duration-300 ease-out">
            <button className="pl-4 py-2 font-semibold">GIỚI THIỆU</button>
            <div className="text-black absolute left-0 mt-1 w-48 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out">
              <Link to="/gioi-thieu/tong-quan-ve-khoa" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Tổng quan về khoa</Link>
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Cơ cấu tổ chức</a>
              <a href="/dao-tao/doi-ngu-giang-vien" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Đội ngũ nhân sự</a>
            </div>
          </div>

          <div className="relative group hover:text-red-700 transition-all duration-300 ease-out">
            <a href="/tuyen-sinh" className="pl-4 py-2 font-semibold block">
              TUYỂN SINH
            </a>
            <div className="text-black absolute left-0 mt-1 w-48 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out">
              <a href="/tuyen-sinh/dai-hoc" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Tuyển sinh Đại học</a>
              <a href="/tuyen-sinh/thac-si" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Tuyển sinh Thạc sĩ</a>
              <a href="/tuyen-sinh/tien-si" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Tuyển sinh Tiến sĩ</a>
            </div>
          </div>

          <div className="relative group hover:text-red-700 transition-all duration-300 ease-out">
            <button className="pl-4 py-2 font-semibold">ĐÀO TẠO</button>
            <div className="text-black absolute left-0 mt-1 w-48 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out">
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Đào tạo Đại học</a>
              <Link to="/dao-tao/doi-ngu-giang-vien" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Đào tạo Thạc sĩ</Link>
              <Link to="/dao-tao/doi-ngu-giang-vien" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Đào tạo Tiến sĩ</Link>
            </div>
          </div>

          <div className="relative group hover:text-red-700 transition-all duration-300 ease-out">
            <button className="pl-4 py-2 font-semibold">DOANH NGHIỆP</button>
            <div className="text-black absolute left-0 mt-1 w-48 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out">
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Các đối tác</a>
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Chương trình hợp tác</a>
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Học bổng</a>
            </div>
          </div>

          <div className="relative group hover:text-red-700 transition-all duration-300 ease-out">
            <button className="pl-4 py-2 font-semibold">TUYỂN DỤNG</button>
            <div className="text-black absolute left-0 mt-1 w-48 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out">
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Tuyển dụng sinh viên</a>
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Tuyển sinh nhân sự</a>
            </div>
          </div>

          <div className="relative group hover:text-red-700 transition-all duration-300 ease-out">
            <button className="pl-4 py-2 font-semibold">NGHIÊN CỨU</button>
            <div className="text-black absolute left-0 mt-1 w-48 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out">
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Công bố khoa học</a>
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Đề tài NCKH</a>
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Các nhóm nghiên cứu</a>
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Triển khai ứng dụng</a>
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Sinh viên NCKH</a>
            </div>
          </div>

          <div className="relative group hover:text-red-700 transition-all duration-300 ease-out">
            <button className="pl-4 py-2 font-semibold">THÔNG BÁO</button>
            <div className="text-black absolute left-0 mt-1 w-48 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out">
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Thông báo chung</a>
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Thông báo Đại học</a>
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md font-semibold">Thông báo Sau đại học</a>
            </div>
          </div>

          <div className="relative group hover:text-red-700 transition-all duration-300 ease-out">
            <button className="pl-4 py-2 font-semibold">TIN TỨC</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default NavBar;
