import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
// import { toast } from "react-toastify";
import Toolbar from "../../layouts/Toolbar";
import { message, Popconfirm } from 'antd';
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
      message.error("Không thể tải danh sách nhân sự");
      console.error("Error fetching staffs:", err);
    }
  };

  // Mở modal xác nhận xóa nhân sự
  const handleDeleteClick = (staff) => {
    setStaffToDelete(staff);
  };

  // Đóng modal xác nhận
  const closeDeleteModal = () => {
    setStaffToDelete(null);

  };

  // Xử lý xóa nhân sự
  const handleDeleteConfirm = async (staffId) => {
    try {
      await axios.delete(`http://localhost:4000/api/staff/${staffId}`);
  
      // Cập nhật danh sách nhân sự sau khi xóa
      setStaffs(staffs.filter((staff) => staff._id !== staffId));
      message.success("Xóa nhân sự thành công");
    } catch (err) {
      message.error("Lỗi khi xóa nhân sự");
      console.error("Error deleting staff:", err);
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
              Danh sách nhân sự
            </h1>
            <Link
              to="/admin/nhan-su/them-moi"
              className="flex items-center bg-[#28A745] hover:opacity-85 space-x-1 text-white font-bold px-4 py-3 rounded-md transition duration-200 cursor-pointer"
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
                <tr className="w-full h-16 border-gray-300 border-y py-8 bg-[#F8F8F8] text-[#737373] text-sm">
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
                  <th className="">Hành động</th>
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
                      className="h-16 border-gray-300 border-b text-sm"
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
                        <div className="flex space-x-5 justify-center items-center">
                          <Link
                            to={`/admin/nhan-su/chi-tiet/${staff._id}`}
                            className="cursor-pointer hover:opacity-80 transition ease-out duration-300"
                          >
                            <img src="/assets/icon_xem.png" alt="" />
                          </Link>
                          <Link
                            to={`/admin/nhan-su/sua/${staff._id}`}
                            className="cursor-pointer hover:opacity-80 transition ease-out duration-300"
                          >
                            <img src="/assets/icon_edit.png" alt="" />
                          </Link>
                          <Popconfirm
                            title="Xóa nhân sự"
                            description="Bạn có chắc chắn muốn xóa nhân sự này không?"
                            onConfirm={() => handleDeleteConfirm(staff._id)}
                            okText="Xóa"
                            cancelText="Hủy"
                            okButtonProps={{ danger: true }}
                          >
                            <button className="cursor-pointer hover:opacity-80 transition ease-out duration-300">
                              <img src="/assets/icon_xoa.png" alt="Xóa" />
                            </button>
                          </Popconfirm>
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


      <Footer />
    </div>
  );
};

export default DisplayEmployee;