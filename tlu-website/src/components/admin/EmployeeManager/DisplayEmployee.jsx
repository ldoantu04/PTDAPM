import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import Dashboard from "../Dashboard";
import { toast } from "react-toastify";

const DisplayEmployee = () => {
  const [staffs, setStaffs] = useState([]);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch staffs when component mounts
  useEffect(() => {
    fetchStaffs();
  }, []);

  // Get staff list
  const fetchStaffs = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/staff");
      setStaffs(response.data);
    } catch (err) {
      toast.error("Không thể tải danh sách nhân sự");
      console.error("Error fetching staffs:", err);
    }
  };

  // Mở modal xác nhận xóa nhân sự
  const handleDeleteClick = (staff) => {
    setStaffToDelete(staff);
    setShowDeleteModal(true);
  };

  // Đóng modal xác nhận
  const closeDeleteModal = () => {
    setStaffToDelete(null);
    setShowDeleteModal(false);
  };

  // Xử lý xóa nhân sự
  const handleDeleteConfirm = async () => {
    if (!staffToDelete) return;

    try {
      await axios.delete(
        `http://localhost:4000/api/staff/${staffToDelete._id}`
      );

      // Cập nhật danh sách nhân sự sau khi xóa
      setStaffs(staffs.filter((staff) => staff._id !== staffToDelete._id));
      toast.success("Xóa nhân sự thành công");

      // Đóng modal xác nhận
      closeDeleteModal();
    } catch (err) {
      toast.error("Lỗi khi xóa nhân sự");
      console.error("Error deleting staff:", err);
      closeDeleteModal();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Dashboard />
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-[#192F59]">
              Danh sách nhân sự
            </h1>
            <Link
              to="/admin/nhan-su/them"
              className="flex items-center bg-[#28A745] hover:bg-[#7fca8d] text-white font-bold p-4 px-4 rounded-md transition duration-200 cursor-pointer"
            >
              <img src="/assets/icon_them.png" alt="" className="w-5 h-5" />
              <span className="ml-2">Thêm mới</span>
            </Link>
          </div>

          {/* Bảng danh sách nhân sự */}
          <div
            className={`overflow-x-auto ${
              showDeleteModal ? "opacity-25" : ""
            } bg-white py-16 rounded-lg border border-gray-300`}
          >
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full h-16 border-gray-300 border-y py-8 bg-[#D9D9D9]">
                  <th className="text-left pl-4">
                    <input type="checkbox" />
                  </th>
                  <th className="text-left pl-4">#</th>
                  <th className="text-left">Ảnh đại diện</th>
                  <th className="text-left">Tên Nhân sự</th>
                  <th className="text-left">Học vị</th>
                  <th className="text-left">Phòng ban</th>
                  <th className="text-left">Chức vụ</th>
                  <th className="text-left">Trạng thái</th>
                  <th className="text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {staffs.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      Không có nhân sự nào
                    </td>
                  </tr>
                ) : (
                  staffs.map((staff) => (
                    <tr
                      key={staff._id}
                      className="h-16 border-gray-300 border-b"
                    >
                      <td className="pl-4">
                        <input type="checkbox" />
                      </td>
                      <td className="pl-4 truncate max-w-[100px]">
                        {staff._id}
                      </td>
                      <td>
                        {staff.thumbnail ? (
                          <img
                            src={staff.thumbnail}
                            alt={staff.name}
                            className="h-12 w-12 object-cover"
                            style={{ borderRadius: "4px" }}
                          />
                        ) : (
                          <div
                            className="h-12 w-12 bg-gray-300"
                            style={{ borderRadius: "4px" }}
                          ></div>
                        )}
                      </td>
                      <td>{staff.name}</td>
                      <td>{staff.degree}</td>
                      <td>{staff.department}</td>
                      <td>{staff.position}</td>
                      <td>{staff.status}</td>
                      <td>
                        <div className="flex space-x-2">
                          <Link
                            to={`/admin/nhan-su/chi-tiet/${staff._id}`}
                            className="cursor-pointer"
                          >
                            <img src="/assets/icon_xem.png" alt="" />
                          </Link>
                          <Link
                            to={`/admin/nhan-su/sua/${staff._id}`}
                            className="cursor-pointer"
                          >
                            <img src="/assets/icon_edit.png" alt="" />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(staff)}
                            className="cursor-pointer"
                          >
                            <img src="/assets/icon_xoa.png" alt="" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal xác nhận xóa */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div onClick={closeDeleteModal}></div>
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Xóa nhân sự</h2>
            </div>

            <p className="mb-6">
              Bạn có chắc chắn muốn xóa nhân sự này?
            </p>

            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="hover:text-[#E82323] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="bg-[#E82323] hover:bg-red-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center space-x-2"
              >
                <img
                  src="/assets/icon_xoa.png"
                  alt=""
                  className="w-5 h-5 filter brightness-0 invert"
                />
                <span>Xóa</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default DisplayEmployee;
