import React, { useState, useEffect } from "react";
import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";
import SmallNavBar from "../layouts/SmallNavBar";
import HighlightHeader from "../layouts/HighlightHeader";
import axios from "axios";
const sampleData = {
  navigationLinks: [
    { label: "Trang chủ", link: "/" },
    { label: "Giới thiệu", link: "#" },
    { label: "Đội ngũ nhân sự", link: "" },
  ],
};

function TeachStaff() {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch staff data when component mounts
  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4000/api/staff");
        setStaffs(response.data);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải thông tin nhân sự");
        console.error("Error fetching staff data:", err);
        setLoading(false);
      }
    };

    fetchStaffs();
  }, []);

  return (
    <>
      <NavBar />

      <main>
        <SmallNavBar navigationLinks={sampleData.navigationLinks} />
        <div>
          <div className="container flex flex-col md:flex-row gap-50 ">
            {/* Đội ngũ nhân sự */}
            <div className="md:w-2/3">
              <HighlightHeader title="ĐỘI NGŨ NHÂN SỰ" />

              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <p>Đang tải dữ liệu...</p>
                </div>
              ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              ) : (
                staffs.map((staff) => (
                  <div
                    key={staff._id}
                    className="mb-[50px] bg-gray-50 rounded-lg shadow"
                    style={{
                      backgroundImage:
                        "url('/assets/lecturer_list/background.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundColor: "rgba(255, 255, 255, 0.6)",
                      backgroundBlendMode: "lighten",
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    }}
                  >
                    <div>
                      <div className="flex gap-[20px] md:gap-[30px] flex-col md:flex-row">
                        <div className="md:w-1/4">
                          {staff.thumbnail ? (
                            <img
                              src={staff.thumbnail}
                              alt={staff.name}
                              className="rounded-lg w-full h-auto object-cover aspect-square"
                            />
                          ) : (
                            <div className="rounded-lg w-full aspect-square bg-gray-300 flex items-center justify-center">
                              <span className="text-gray-500">No image</span>
                            </div>
                          )}
                        </div>

                        <div className="w-full md:w-3/4 pt-2">
                          <div className="mb-4">
                            <p className="font-bold text-[22px] text-black mb-1">
                              {staff.name}
                            </p>
                            <p className="font-normal text-[16px] text-[#A3A3A3]">
                              {staff.degree}
                            </p>
                          </div>

                          <p className="font-normal text-[16px] mt-[15px]">
                            {staff.department}
                          </p>
                          <div className="font-normal text-[16px] flex items-center gap-2 mt-[15px]">
                            <img
                              src="/assets/lecturer_list/email.png"
                              alt="icon_email"
                            />
                            <a href={`mailto:${staff.email}`}>{staff.email}</a>
                          </div>
                          {staff.phone && (
                            <div className="font-normal text-[16px] flex items-center gap-2 mt-[15px]">
                              <img
                                src="/assets/lecturer_list/phone.png"
                                alt="icon_phone"
                              />
                              <a href={`tel:${staff.phone}`}>{staff.phone}</a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Chuyên gia hàng đầu */}
            <div className="md:w-1/3">
              <div className="border-2 border-gray-300 rounded-lg p-[30px]">
                <div className="flex flex-col items-start mb-[30px]">
                  <p className="font-bold text-[22px] text-[#192E58] mb-[20px]">
                    DANH SÁCH CHUYÊN GIA
                  </p>
                  <div className="h-0.5 w-24 bg-red-600"></div>
                </div>

                {staffs.slice(0, 5).map((staff, index) => (
                  <div
                    key={`expert-${staff._id}-${index}`}
                    className="mb-6 flex items-start gap-2"
                  >
                    <div className="w-1/4">
                      {staff.thumbnail ? (
                        <img
                          src={staff.thumbnail}
                          alt={staff.name}
                          className="rounded-lg w-full h-auto object-cover aspect-square"
                        />
                      ) : (
                        <div className="rounded-lg w-full aspect-square bg-gray-300"></div>
                      )}
                    </div>
                    <div className="w-3/4">
                      <p className="font-bold text-[16px] text-black hover:text-[#35c56c] transition-colors mt-1">
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default TeachStaff;
