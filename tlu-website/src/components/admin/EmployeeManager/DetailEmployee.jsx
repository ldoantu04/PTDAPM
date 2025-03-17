import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import Toolbar from "../../layouts/Toolbar";

const DetailEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch staff data when component mounts
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/staff/${id}`
        );
        setStaff(response.data);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải thông tin nhân sự");
        console.error("Error fetching staff data:", err);
        setLoading(false);
      }
    };

    fetchStaffData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <Toolbar />
        <div className="container mx-auto px-4 py-8 mt-20 flex justify-center items-center">
          <p>Đang tải thông tin...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !staff) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <Toolbar />
        <div className="container mx-auto px-4 py-8 mt-20 flex flex-col items-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-3xl">
            {error || "Không tìm thấy thông tin nhân sự"}
          </div>
          <Link
            to="/admin/nhan-su"
            className="mt-4 text-blue-500 hover:underline"
          >
            Quay lại danh sách nhân sự
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Toolbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-[#192F59]">
            Thông tin về nhân sự
          </h1>
          <div className="flex items-center">
            <div
              onClick={() => navigate("/admin/nhan-su")}
              className="group flex items-center cursor-pointer text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:text-[#E82323] transition-colors duration-150 mr-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current"
              >
                <path
                  fillRule="evenodd"
                  d="M11.707 4.293a1 1 0 010 1.414L6.414 11H20a1 1 0 110 2H6.414l5.293 5.293a1 1 0 01-1.414 1.414l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-2">Quay lại</span>
            </div>
            <Link
              to={`/admin/nhan-su/sua/${id}`}
              className="bg-red-500 hover:bg-[#E82323] text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center transition-colors duration-200"
            >
              <img
                src="/assets/icon_edit.png"
                alt=""
                className="w-5 h-5 mr-2 filter brightness-0 invert"
              />
              <span>Sửa</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Card chính - Card lớn hiển thị đầy đủ thông tin */}
          <div className="md:w-3/4">
            <div
              className="bg-gray-50 rounded-lg shadow-lg p-6"
              style={{
                backgroundImage: "url('/assets/lecturer_list/background.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                backgroundBlendMode: "lighten",
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  {staff.thumbnail ? (
                    <div
                      className="w-full h-full overflow-hidden rounded-lg"
                      style={{ minHeight: "220px" }}
                    >
                      <img
                        src={staff.thumbnail}
                        alt={staff.name}
                        className="w-full h-full object-cover"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ) : (
                    <div
                      className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500"
                      style={{ minHeight: "220px" }}
                    >
                      <span>Không có ảnh</span>
                    </div>
                  )}
                </div>
                <div className="md:w-3/4">
                  <p className="font-bold text-[24px] text-black hover:text-[#35c56c] transition-colors">
                    {staff.name}
                  </p>
                  <p className="font-normal text-[18px] text-[#E82323] mt-2">
                    {staff.position}
                  </p>
                  <p className="font-normal text-[16px] text-black mt-3">
                    {staff.department}
                  </p>

                  <div className="font-normal text-[16px] flex items-center gap-2 mt-4">
                    <img
                      src="/assets/lecturer_list/email.png"
                      alt="icon_email"
                    />
                    <a href={`mailto:${staff.email}`}>
                      {staff.email || "Chưa cập nhật"}
                    </a>
                  </div>

                  <div className="font-normal text-[16px] flex items-center gap-2 mt-3">
                    <img
                      src="/assets/lecturer_list/phone.png"
                      alt="icon_phone"
                    />
                    <a href={`tel:${staff.phone}`}>
                      {staff.phone || "Chưa cập nhật"}
                    </a>
                  </div>

                  <div className="mt-6">
                    <p className="text-gray-700 whitespace-pre-line">
                      {staff.bio || "Chưa cập nhật tiểu sử"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card nhỏ ở bên phải - Style theo TeachStaff */}
          <div className="md:w-1/4">
            <div
              className="bg-gray-50 rounded-lg p-4 shadow-lg"
              style={{
                backgroundImage: "url('/assets/lecturer_list/background.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                backgroundBlendMode: "lighten",
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="flex flex-row items-center">
                <div className="w-1/3 mr-3">
                  {staff.thumbnail ? (
                    <div className="w-full aspect-square overflow-hidden rounded-lg">
                      <img
                        src={staff.thumbnail}
                        alt={staff.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                      <span>Không có ảnh</span>
                    </div>
                  )}
                </div>
                <div className="w-2/3">
                  <p className="font-bold text-[16px] text-black hover:text-[#35c56c] transition-colors">
                    {staff.name}
                  </p>
                  <p className="font-normal text-[14px] text-[#A3A3A3] mt-1">
                    {staff.position}
                  </p>
                  <p className="font-normal text-[14px] text-black mt-1">
                    {staff.department}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailEmployee;