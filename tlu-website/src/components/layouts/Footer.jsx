import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#122A58] text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Thông tin bên trái */}
        <div>
          <div className="flex items-center gap-3">
            <img src="/assets/logo_cse.png" alt="CSE Logo" className="w-14" />
            <h2 className="text-xl font-semibold">Khoa Công nghệ thông tin</h2>
          </div>

          {/* Bảng thông tin liên hệ */}
          <div className="mt-4 text-sm font-semibold opacity-70">
            <table>
              <tbody>
                <tr>
                  <td className="pr-6 font-semibold text-left">Địa chỉ</td>
                  <td className="py-1 px-3">Nhà C1</td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-1 px-3">Trường Đại học Thủy Lợi</td>
                </tr>
                <tr>
                  <td></td>
                  <td className="py-1 px-3">175 Tây Sơn, Đống Đa, Hà Nội</td>
                </tr>
                <tr>
                  <td className="pr-6 font-semibold text-left">Điện thoại</td>
                  <td className="py-1 px-3">(+84)-024 3 5632211</td>
                </tr>
                <tr>
                  <td className="pr-6 font-semibold text-left">Email</td>
                  <td className="py-1 px-3">
                    <a href="mailto:vpkcntt@tlu.edu.vn" className="hover:underline">
                      vpkcntt@tlu.edu.vn
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
        </div>

        {/* Dòng bản quyền */}
        <div className="mt-8 border-t border-gray-600 pt-4 text-sm opacity-40">
            Copyright © 2025 Thuy Loi University - Information Technology Faculty.  All rights reserved.
        </div>

        {/* Biểu tượng mạng xã hội */}
        <div className="flex flex-col justify-between items-center md:items-end">
          <div className="flex space-x-4 text-2xl opacity-50">
            <a href="https://www.facebook.com/cse.tlu.edu.vn" className="hover:text-gray-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-400"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-400"><FaYoutube /></a>
            <a href="#" className="hover:text-gray-400"><FaTiktok /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
