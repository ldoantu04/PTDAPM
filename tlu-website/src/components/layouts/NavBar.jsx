import React, { useState } from 'react';
import { Link } from "react-router-dom";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  return (
    <div className="w-full flex items-center justify-between px-60 py-4 bg-white shadow-lg fixed top-0 z-10">
      {/* Logo */}
      <div>
        <a href="/">
          <img src="/assets/logo_khoa.jpg" alt="Logo" className="h-12" />
        </a>
      </div>

      {/* Large screen menu */}
      <div className="hidden md:flex flex-col items-end">
        {/* Đăng nhập */}
        <div className="mb-3 flex items-center gap-2 hover:text-red-500 transition-all duration-500 ease-out">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="9" r="3"/><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M17.97 20c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5"/></g></svg>
          <Link to="/login" className="underline text-sm">
              Đăng nhập
          </Link>
        </div>

        {/* Menu */}
        <div className="flex space-x-2">
          <div className="relative group hover:text-red-700 transition-all duration-300 ease-out">
            <button className="pl-4 py-2 text-sm font-semibold">GIỚI THIỆU</button>
            <div className="text-[#192F59] absolute left-0 mt-1 w-48 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-1000 ease-out">
              <Link to="/gioi-thieu/tong-quan-ve-khoa" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Tổng quan về khoa</Link>
              <a href="/gioi-thieu/doi-ngu-nhan-su" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Đội ngũ nhân sự</a>
            </div>
          </div>

          <div className="relative group hover:text-red-700 transition-all duration-300 ease-out">
            <a href="/tuyen-sinh" className="pl-4 py-2 text-sm font-semibold block">
              TUYỂN SINH
            </a>
            <div className="text-[#192F59] absolute left-0 mt-1 w-48 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-1000 ease-out">
              <a href="/dao-tao/dao-tao-dai-hoc/ngang-cong-nghe-thong-tin" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Tuyển sinh Đại học</a>
              <a href="" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Tuyển sinh Thạc sĩ</a>
              <a href="" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Tuyển sinh Tiến sĩ</a>
            </div>
          </div>

          <div className="relative group hover:text-red-700 transition-all duration-300 ease-out">
            <button className="pl-4 py-2 text-sm font-semibold">ĐÀO TẠO</button>
            <div className="text-[#192F59] absolute left-0 mt-1 w-48 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-1000 ease-out">
              <Link to="/dao-tao/dao-tao-dai-hoc/nganh-cong-nghe-thong-tin" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Đào tạo Đại học</Link>
              <Link to="" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Đào tạo Thạc sĩ</Link>
              <Link to="" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Đào tạo Tiến sĩ</Link>
            </div>
          </div>

          <div className="relative group hover:text-red-700 transition-all duration-300 ease-out">
            <button className="pl-4 py-2 text-sm font-semibold">DOANH NGHIỆP</button>
            <div className="text-[#192F59] absolute left-0 mt-1 w-48 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-1000 ease-out">
              <a href="/doanh-nghiep/danh-sach-doi-tac" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Danh sách đối tác</a>
              <a href="/doanh-nghiep/chuong-trinh-hop-tac" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Chương trình hợp tác</a>
              <a href="/doanh-nghiep/hoc-bong-doanh-nghiep" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Học bổng doanh nghiệp</a>
            </div>
          </div>

          <div className="relative group hover:text-red-700 transition-all duration-300 ease-out">
            <button className="pl-4 py-2 text-sm font-semibold">TUYỂN DỤNG</button>
            <div className="text-[#192F59] absolute left-0 mt-1 w-48 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-1000 ease-out">
              <a href="/tuyen-dung/tuyen-dung-sinh-vien" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Tuyển dụng sinh viên</a>
              <a href="/tuyen-dung/tuyen-dung-giang-vien" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Tuyển sinh nhân sự</a>
            </div>
          </div>

          <div className="relative group hover:text-red-700 transition-all duration-300 ease-out">
            <button className="pl-4 py-2 text-sm font-semibold">NGHIÊN CỨU</button>
            <div className="text-[#192F59] absolute left-0 mt-1 w-48 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-1000 ease-out">
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Công bố khoa học</a>
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Đề tài NCKH</a>
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Các nhóm nghiên cứu</a>
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Triển khai ứng dụng</a>
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Sinh viên NCKH</a>
            </div>
          </div>

          <div className="relative group hover:text-red-700 transition-all duration-300 ease-out">
            <a href="/tin-tuc" className="pl-4 py-2 text-sm font-semibold block">
                TIN TỨC
            </a>
          </div>

          <div className="relative group hover:text-red-700 transition-all duration-300 ease-out">
          <a href="/thong-bao" className="pl-4 py-2 text-sm font-semibold block">
                THÔNG BÁO
            </a>
            <div className="text-[#192F59] absolute left-0 mt-1 w-48 bg-white shadow-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-1000 ease-out">
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Thông báo chung</a>
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Thông báo Đại học</a>
              <a href="#" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Thông báo Sau đại học</a>
            </div>
          </div>
        </div>
      </div>

      {/* Small screen menu */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-black focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md z-20">
          <div className="flex flex-col p-4">
            {/* Đăng nhập */}
            <div className="mb-3 flex items-center gap-2 hover:text-red-500 transition-all duration-500 ease-out">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="9" r="3"/><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M17.97 20c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5"/></g></svg>
              <Link to="/login" className="underline text-sm">
                Đăng nhập
              </Link>
            </div>
            {/* Menu items */}
            <button onClick={() => toggleSubMenu('gioi-thieu')} className="flex justify-between items-center py-2 font-semibold">
              GIỚI THIỆU
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openSubMenu === 'gioi-thieu' && (
              <div className="flex flex-col pl-4">
                <Link to="/gioi-thieu/tong-quan-ve-khoa" className="py-2">Tổng quan về khoa</Link>
                <a href="#" className="py-2">Cơ cấu tổ chức</a>
                <a href="/gioi-thieu/doi-ngu-nhan-su" className="py-2">Đội ngũ nhân sự</a>
              </div>
            )}

            <button onClick={() => toggleSubMenu('tuyen-sinh')} className="flex justify-between items-center py-2 font-semibold">
              TUYỂN SINH
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openSubMenu === 'tuyen-sinh' && (
              <div className="flex flex-col pl-4">
                <a href="" className="py-2">Tuyển sinh Đại học</a>
                <a href="" className="py-2">Tuyển sinh Thạc sĩ</a>
                <a href="" className="py-2">Tuyển sinh Tiến sĩ</a>
              </div>
            )}

            <button onClick={() => toggleSubMenu('dao-tao')} className="flex justify-between items-center py-2 font-semibold">
              ĐÀO TẠO
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openSubMenu === 'dao-tao' && (
              <div className="flex flex-col pl-4">
                <Link to="/dao-tao/dao-tao-dai-hoc/nganh-cong-nghe-thong-tin" className="py-2">Đào tạo Đại học</Link>
                <Link to="" className="py-2">Đào tạo Thạc sĩ</Link>
                <Link to="" className="py-2">Đào tạo Tiến sĩ</Link>
              </div>
            )}

            <button onClick={() => toggleSubMenu('doanh-nghiep')} className="flex justify-between items-center py-2 font-semibold">
              DOANH NGHIỆP
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openSubMenu === 'doanh-nghiep' && (
              <div className="flex flex-col pl-4">
                <a href="#" className="py-2">Các đối tác</a>
                <a href="#" className="py-2">Chương trình hợp tác</a>
                <a href="#" className="py-2">Học bổng</a>
              </div>
            )}

            <button onClick={() => toggleSubMenu('tuyen-dung')} className="flex justify-between items-center py-2 font-semibold">
              TUYỂN DỤNG
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openSubMenu === 'tuyen-dung' && (
              <div className="flex flex-col pl-4">
                <a href="#" className="py-2">Tuyển dụng sinh viên</a>
                <a href="#" className="py-2">Tuyển sinh nhân sự</a>
              </div>
            )}

            <button onClick={() => toggleSubMenu('nghien-cuu')} className="flex justify-between items-center py-2 font-semibold">
              NGHIÊN CỨU
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openSubMenu === 'nghien-cuu' && (
              <div className="flex flex-col pl-4">
                <a href="#" className="py-2">Công bố khoa học</a>
                <a href="#" className="py-2">Đề tài NCKH</a>
                <a href="#" className="py-2">Các nhóm nghiên cứu</a>
                <a href="#" className="py-2">Triển khai ứng dụng</a>
                <a href="#" className="py-2">Sinh viên NCKH</a>
              </div>
            )}

            <button onClick={() => toggleSubMenu('tin-tuc')} className="flex justify-between items-center py-2 font-semibold">
              TIN TỨC
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <button onClick={() => toggleSubMenu('thong-bao')} className="flex justify-between items-center py-2 font-semibold">
              THÔNG BÁO
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openSubMenu === 'thong-bao' && (
              <div className="flex flex-col pl-4">
                <a href="#" className="py-2">Thông báo chung</a>
                <a href="#" className="py-2">Thông báo Đại học</a>
                <a href="#" className="py-2">Thông báo Sau đại học</a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;