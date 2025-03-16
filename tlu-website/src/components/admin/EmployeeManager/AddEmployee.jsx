import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import { toast } from "react-toastify";
import Toolbar from "../../layouts/Toolbar";

const AddEmployee = () => {
  const navigate = useNavigate();

  // Form fields
  const [name, setName] = useState("");
  const [degree, setDegree] = useState("Tiến sĩ");
  const [status, setStatus] = useState("Đang làm việc");
  const [department, setDepartment] = useState("Bộ môn Công nghệ phần mềm");
  const [position, setPosition] = useState("Giảng viên");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Validation errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Clear error when user starts typing
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value.trim()) {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value.trim()) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    if (value.trim()) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Tên nhân sự không được để trống";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email không được để trống";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Create form data
      const formData = new FormData();
      formData.append("name", name);
      formData.append("degree", degree);
      formData.append("status", status);
      formData.append("department", department);
      formData.append("position", position);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("bio", bio);

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      // Submit the form
      await axios.post("http://localhost:4000/api/staff", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Redirect to display page after successful submission
      toast.success("Thêm nhân sự thành công");
      navigate("/admin/nhan-su");
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "Lỗi khi thêm nhân sự");

        // Handle specific error messages from server
        if (err.response.data.message.includes("Email đã tồn tại")) {
          setErrors((prev) => ({
            ...prev,
            email: "Email đã tồn tại, vui lòng sử dụng email khác",
          }));
        } else if (
          err.response.data.message.includes("Số điện thoại đã tồn tại")
        ) {
          setErrors((prev) => ({
            ...prev,
            phone:
              "Số điện thoại đã tồn tại, vui lòng sử dụng số điện thoại khác",
          }));
        }
      } else {
        toast.error("Lỗi kết nối đến máy chủ");
      }
      console.error("Error adding staff:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Toolbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-[#192F59]">
              Thêm nhân sự mới
            </h1>
            <div
              onClick={() => navigate("/admin/nhan-su")}
              className="group flex items-center cursor-pointer text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:text-[#E82323] transition-colors duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current "
              >
                <path
                  fillRule="evenodd"
                  d="M11.707 4.293a1 1 0 010 1.414L6.414 11H20a1 1 0 110 2H6.414l5.293 5.293a1 1 0 01-1.414 1.414l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="ml-2">Quay lại</span>
            </div>
          </div>

          <div className="bg-white py-16 rounded-lg border border-gray-300">
            <div className="px-6">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Cột trái - Ảnh đại diện */}
                  <div className="md:w-1/4">
                    <div className="h-full">
                      <label className="block text-gray-700 text-sm font-bold mb-1">
                        Ảnh đại diện
                      </label>
                      <label className="cursor-pointer h-full">
                        <div className="border border-gray-300 rounded w-full h-[calc(100%-26px)] flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-200">
                          {previewImage ? (
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <>
                              <svg
                                className="w-8 h-8 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 4v16m8-8H4"
                                />
                              </svg>
                              <span className="text-xs text-gray-500 mt-2">
                                Tải ảnh lên
                              </span>
                            </>
                          )}
                        </div>
                        <input
                          type="file"
                          id="thumbnail"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Cột phải - Thông tin nhân sự */}
                  <div className="md:w-3/4">
                    {/* Hàng 1: Tên nhân sự, Học vị, Trạng thái */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-1"
                          htmlFor="name"
                        >
                          Tên nhân sự <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={handleNameChange}
                          className={`border ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                          placeholder="Nhập tên nhân sự"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-1"
                          htmlFor="degree"
                        >
                          Học vị <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="degree"
                          value={degree}
                          onChange={(e) => setDegree(e.target.value)}
                          className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Tiến sĩ">Tiến sĩ</option>
                          <option value="Thạc sĩ">Thạc sĩ</option>
                          <option value="Phó giáo sư">Phó giáo sư</option>
                          <option value="Giáo sư">Giáo sư</option>
                          <option value="Cử nhân">Cử nhân</option>
                        </select>
                      </div>

                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-1"
                          htmlFor="status"
                        >
                          Trạng thái <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="status"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Đang làm việc">Đang làm việc</option>
                          <option value="Đã nghỉ">Đã nghỉ hưu</option>
                        </select>
                      </div>
                    </div>

                    {/* Hàng 2: Phòng ban, Chức vụ */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-1"
                          htmlFor="department"
                        >
                          Phòng ban <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="department"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Bộ môn Công nghệ phần mềm">
                            Bộ môn Công nghệ phần mềm
                          </option>
                          <option value="Bộ môn Hệ thống thông tin">
                            Bộ môn Hệ thống thông tin
                          </option>
                          <option value="Bộ môn Khoa học máy tính">
                            Bộ môn Khoa học máy tính
                          </option>
                          <option value="Bộ môn Kỹ thuật máy tính và mạng">
                            Bộ môn Kỹ thuật máy tính và mạng
                          </option>
                          <option value="Văn phòng khoa">Văn phòng khoa</option>
                        </select>
                      </div>

                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-1"
                          htmlFor="position"
                        >
                          Chức vụ <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="position"
                          value={position}
                          onChange={(e) => setPosition(e.target.value)}
                          className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Giảng viên">Giảng viên</option>
                          <option value="Trợ lý khoa">Trợ lý khoa</option>
                        </select>
                      </div>
                    </div>

                    {/* Hàng 3: Email, Số điện thoại */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-1"
                          htmlFor="email"
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={handleEmailChange}
                          className={`border ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                          placeholder="Nhập email"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-1"
                          htmlFor="phone"
                        >
                          Số điện thoại
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={phone}
                          onChange={handlePhoneChange}
                          className={`border ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                          placeholder="Nhập số điện thoại"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Hàng 4: Tiểu sử */}
                    <div className="">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-1"
                        htmlFor="bio"
                      >
                        Tiểu sử
                      </label>
                      <textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                        placeholder="Nhập tiểu sử"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="flex items-center justify-end space-x-3 pt-4 mt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/nhan-su")}
              className="hover:text-[#E82323] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Hủy bỏ
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#1677FF] hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center space-x-2"
            >
              <img src="/assets/icon_luu.png" alt="" className="w-5 h-5" />
              <span>Lưu</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddEmployee;
