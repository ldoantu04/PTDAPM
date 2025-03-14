import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  const handleLogout = () => {
    logout(); // Xóa thông tin đăng nhập
    navigate("/");
  };
  console.log("User in NavBar:", user);
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
        { !user ? (
            <div className="mb-3 flex items-center gap-2 hover:text-red-500 transition-all duration-300 ease-out">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="9" r="3"/><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M17.97 20c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5"/></g></svg>
              <Link to="/login" className="underline text-sm">
                  Đăng nhập
              </Link>
            </div>
          ) : user.role === 'trolykhoa' ? (
            <div className="relative mb-3 z-50 transition-all duration-300 ease-out">
              <div className="flex items-center gap-2 transition-all duration-300 ease-out">
                <img src="/assets/loginh_user_image_2.png" alt="" />
                <button onClick={() => setIsAvatarOpen(!isAvatarOpen)} className="text-xs flex items-center gap-x-1 transition-all duration-300 ease-out py-2">
                  Xin chào, Trợ lý khoa
                  <svg className={`ml-1 font-bold transition-all ease-out duration-300 ${isAvatarOpen ? "rotate-90" : ""}`} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m9 5l6 7l-6 7"/></svg>
                </button>
              </div>

              <div className={`absolute left-0 mt-2 w-60 px-5 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ease-out ${isAvatarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <a href="" className="flex flex-row items-center text-[#192E58] hover:text-[#1677FF] text-left transition-all duration-500 ease-out gap-x-2 font-bold text-xs py-4"> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M22 10.5V12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2h1.5"/><path d="m16.652 3.455l.649-.649A2.753 2.753 0 0 1 21.194 6.7l-.65.649m-3.892-3.893s.081 1.379 1.298 2.595c1.216 1.217 2.595 1.298 2.595 1.298m-3.893-3.893L10.687 9.42c-.404.404-.606.606-.78.829q-.308.395-.524.848c-.121.255-.211.526-.392 1.068L8.412 13.9m12.133-6.552l-5.965 5.965c-.404.404-.606.606-.829.78a4.6 4.6 0 0 1-.848.524c-.255.121-.526.211-1.068.392l-1.735.579m0 0l-1.123.374a.742.742 0 0 1-.939-.94l.374-1.122m1.688 1.688L8.412 13.9"/></g></svg>
                  Quản lý bài viết 
                </a>

                <div className="border-t-2 border-gray-200"></div>

                <a href="/" className="flex flex-row items-center text-[#192E58] hover:text-[#1677FF] text-left transition-all duration-300 ease-out gap-x-2 font-bold text-xs py-4" onClick={handleLogout}> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" stroke="currentColor" stroke-width="0.5" d="M14.945 1.25c-1.367 0-2.47 0-3.337.117c-.9.12-1.658.38-2.26.981c-.524.525-.79 1.17-.929 1.928c-.135.737-.161 1.638-.167 2.72a.75.75 0 0 0 1.5.008c.006-1.093.034-1.868.142-2.457c.105-.566.272-.895.515-1.138c.277-.277.666-.457 1.4-.556c.755-.101 1.756-.103 3.191-.103h1c1.436 0 2.437.002 3.192.103c.734.099 1.122.28 1.4.556c.276.277.456.665.555 1.4c.102.754.103 1.756.103 3.191v8c0 1.435-.001 2.436-.103 3.192c-.099.734-.279 1.122-.556 1.399s-.665.457-1.399.556c-.755.101-1.756.103-3.192.103h-1c-1.435 0-2.436-.002-3.192-.103c-.733-.099-1.122-.28-1.399-.556c-.243-.244-.41-.572-.515-1.138c-.108-.589-.136-1.364-.142-2.457a.75.75 0 1 0-1.5.008c.006 1.082.032 1.983.167 2.72c.14.758.405 1.403.93 1.928c.601.602 1.36.86 2.26.982c.866.116 1.969.116 3.336.116h1.11c1.368 0 2.47 0 3.337-.116c.9-.122 1.658-.38 2.26-.982s.86-1.36.982-2.26c.116-.867.116-1.97.116-3.337v-8.11c0-1.367 0-2.47-.116-3.337c-.121-.9-.38-1.658-.982-2.26s-1.36-.86-2.26-.981c-.867-.117-1.97-.117-3.337-.117z"/><path fill="currentColor" stroke="currentColor" stroke-width="0.5" d="M15 11.25a.75.75 0 0 1 0 1.5H4.027l1.961 1.68a.75.75 0 1 1-.976 1.14l-3.5-3a.75.75 0 0 1 0-1.14l3.5-3a.75.75 0 1 1 .976 1.14l-1.96 1.68z"/></svg>
                  Đăng xuất 
                </a>
              </div>
            </div>
          ) : user.role === 'admin' ? (
            <div className="relative mb-3 z-50 transition-all duration-300 ease-out">
              <div className="flex items-center gap-2 transition-all duration-300 ease-out">
                <img src="/assets/loginh_user_image_2.png" alt="" />
                <button onClick={() => setIsAvatarOpen(!isAvatarOpen)} className="text-xs flex items-center gap-x-1 transition-all duration-300 ease-out py-2">
                  Xin chào, Admin
                  <svg className={`ml-1 font-bold transition-all ease-out duration-300 ${isAvatarOpen ? "rotate-90" : ""}`} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m9 5l6 7l-6 7"/></svg>
                </button>
              </div>

              <div className={`absolute left-0 mt-2 w-60 px-5 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ease-out ${isAvatarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                <a href="" className="flex flex-row items-center text-[#192E58] hover:text-[#1677FF] text-left transition-all duration-300 ease-out gap-x-2 font-bold text-xs py-4"> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M22 10.5V12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2h1.5"/><path d="m16.652 3.455l.649-.649A2.753 2.753 0 0 1 21.194 6.7l-.65.649m-3.892-3.893s.081 1.379 1.298 2.595c1.216 1.217 2.595 1.298 2.595 1.298m-3.893-3.893L10.687 9.42c-.404.404-.606.606-.78.829q-.308.395-.524.848c-.121.255-.211.526-.392 1.068L8.412 13.9m12.133-6.552l-5.965 5.965c-.404.404-.606.606-.829.78a4.6 4.6 0 0 1-.848.524c-.255.121-.526.211-1.068.392l-1.735.579m0 0l-1.123.374a.742.742 0 0 1-.939-.94l.374-1.122m1.688 1.688L8.412 13.9"/></g></svg>
                  Chế độ quản lý
                </a>

                <div className="border-t-2 border-gray-200"></div>

                <a href="/" className="flex flex-row items-center text-[#192E58] hover:text-[#1677FF] text-left transition-all duration-300 ease-out gap-x-2 font-bold text-xs py-4" onClick={handleLogout}> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" stroke="currentColor" stroke-width="0.5" d="M14.945 1.25c-1.367 0-2.47 0-3.337.117c-.9.12-1.658.38-2.26.981c-.524.525-.79 1.17-.929 1.928c-.135.737-.161 1.638-.167 2.72a.75.75 0 0 0 1.5.008c.006-1.093.034-1.868.142-2.457c.105-.566.272-.895.515-1.138c.277-.277.666-.457 1.4-.556c.755-.101 1.756-.103 3.191-.103h1c1.436 0 2.437.002 3.192.103c.734.099 1.122.28 1.4.556c.276.277.456.665.555 1.4c.102.754.103 1.756.103 3.191v8c0 1.435-.001 2.436-.103 3.192c-.099.734-.279 1.122-.556 1.399s-.665.457-1.399.556c-.755.101-1.756.103-3.192.103h-1c-1.435 0-2.436-.002-3.192-.103c-.733-.099-1.122-.28-1.399-.556c-.243-.244-.41-.572-.515-1.138c-.108-.589-.136-1.364-.142-2.457a.75.75 0 1 0-1.5.008c.006 1.082.032 1.983.167 2.72c.14.758.405 1.403.93 1.928c.601.602 1.36.86 2.26.982c.866.116 1.969.116 3.336.116h1.11c1.368 0 2.47 0 3.337-.116c.9-.122 1.658-.38 2.26-.982s.86-1.36.982-2.26c.116-.867.116-1.97.116-3.337v-8.11c0-1.367 0-2.47-.116-3.337c-.121-.9-.38-1.658-.982-2.26s-1.36-.86-2.26-.981c-.867-.117-1.97-.117-3.337-.117z"/><path fill="currentColor" stroke="currentColor" stroke-width="0.5" d="M15 11.25a.75.75 0 0 1 0 1.5H4.027l1.961 1.68a.75.75 0 1 1-.976 1.14l-3.5-3a.75.75 0 0 1 0-1.14l3.5-3a.75.75 0 1 1 .976 1.14l-1.96 1.68z"/></svg>
                  Đăng xuất 
                </a>
              </div>
            </div>
          ) : null
        }

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
              <a href="" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Tuyển sinh Đại học</a>
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
              <a href="/nghien-cuu/cong-bo-khoa-hoc" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Công bố khoa học</a>
              <a href="/nghien-cuu/de-tai-nckh" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Đề tài NCKH</a>
              <a href="/nghien-cuu/cac-nhom-nghien-cuu" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Các nhóm nghiên cứu</a>
              <a href="/nghien-cuu/trien-khai-ung-dung" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Triển khai ứng dụng</a>
              <a href="/nghien-cuu/sinh-vien-nckh" className="block px-5 py-3 hover:bg-gray-200 rounded-md text-xs font-semibold">Sinh viên NCKH</a>
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
            <div className="mb-3 flex items-center gap-2 hover:text-red-500 transition-all duration-300 ease-out">
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
                <a href="/doanh-nghiep/danh-sach-doi-tac" className="py-2">Danh sách đối tác</a>
                <a href="/doanh-nghiep/chuong-trinh-hop-tac" className="py-2">Chương trình hợp tác</a>
                <a href="/doanh-nghiep/hoc-bong-doanh-nghiep" className="py-2">Học bổng doanh nghiệp</a>
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
                <a href="/tuyen-dung/tuyen-dung-sinh-vien" className="py-2">Tuyển dụng sinh viên</a>
                <a href="/tuyen-dung/tuyen-dung-giang-vien" className="py-2">Tuyển sinh nhân sự</a>
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
                <a href="/nghien-cuu/cong-bo-khoa-hoc" className="py-2">Công bố khoa học</a>
                <a href="/nghien-cuu/de-tai-nckh" className="py-2">Đề tài NCKH</a>
                <a href="/nghien-cuu/cac-nhom-nghien-cuu" className="py-2">Các nhóm nghiên cứu</a>
                <a href="/nghien-cuu/trien-khai-ung-dung" className="py-2">Triển khai ứng dụng</a>
                <a href="/nghien-cuu/sinh-vien-nckh" className="py-2">Sinh viên NCKH</a>
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