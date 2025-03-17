import React, { useState, useEffect } from "react";
import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import Toolbar from "../layouts/Toolbar";

const AccountManager = () => {
  const [accounts, setAccounts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentAccount, setCurrentAccount] = useState(null);
  const [accountToDelete, setAccountToDelete] = useState(null);
  // Thêm state để lưu các lỗi validation
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  // Fetch danh sách tài khoản khi component mount
  useEffect(() => {
    fetchAccounts();
  }, []);

  // Lấy danh sách tài khoản
  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/account");
      setAccounts(response.data);
    } catch (err) {
      toast.error("Không thể tải danh sách tài khoản");
      console.error("Error fetching accounts:", err);
    }
  };

  // Kiểm tra username đã tồn tại chưa
  const checkUsernameExists = (inputUsername, currentId = null) => {
    return accounts.some(
      (account) =>
        account.username === inputUsername && account._id !== currentId
    );
  };

  // Validate input và cập nhật state errors
  const validateInputs = (isEdit = false, currentId = null) => {
    let tempErrors = { username: "", password: "" };
    let isValid = true;

    // Kiểm tra username
    if (!username.trim()) {
      tempErrors.username = "Username không được để trống";
      isValid = false;
    } else if (checkUsernameExists(username, isEdit ? currentId : null)) {
      tempErrors.username = "Username không được trùng nhau";
      isValid = false;
    }

    // Kiểm tra password
    if (!password.trim()) {
      tempErrors.password = "Password không được để trống";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Xử lý thay đổi username
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    // Xóa lỗi khi người dùng bắt đầu nhập
    if (value.trim()) {
      setErrors((prev) => ({ ...prev, username: "" }));
    }
  };

  // Xử lý thay đổi password
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Xóa lỗi khi người dùng bắt đầu nhập
    if (value.trim()) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  // Xử lý thêm tài khoản
  const handleAddAccount = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/account", {
        username,
        password,
        role: "trolykhoa", // Mặc định là trolykhoa
      });

      // Reset form
      setUsername("");
      setPassword("");
      setErrors({ username: "", password: "" });
      setShowAddForm(false);

      // Tải lại danh sách
      fetchAccounts();
      toast.success("Thêm tài khoản thành công");
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "Lỗi khi thêm tài khoản");

        // Cập nhật lỗi nếu server trả về lỗi username trùng
        if (err.response.data.message === "Tên tài khoản đã tồn tại") {
          setErrors((prev) => ({
            ...prev,
            username: "Username không được trùng nhau",
          }));
        }
      } else {
        toast.error("Lỗi kết nối đến máy chủ");
      }
      console.error("Error adding account:", err);
    }
  };

  // Xử lý mở form sửa tài khoản
  const handleEditClick = (account) => {
    setCurrentAccount(account);
    setUsername(account.username);
    setPassword("");
    setErrors({ username: "", password: "" });
    setShowEditForm(true);
  };

  // Xử lý cập nhật tài khoản
  const handleUpdateAccount = async (e) => {
    e.preventDefault();

    if (!validateInputs(true, currentAccount._id)) {
      return;
    }

    try {
      const updateData = { username, password };

      await axios.put(
        `http://localhost:4000/api/account/${currentAccount._id}`,
        updateData
      );

      // Reset form
      setUsername("");
      setPassword("");
      setErrors({ username: "", password: "" });
      setShowEditForm(false);
      setCurrentAccount(null);

      // Tải lại danh sách
      fetchAccounts();
      toast.success("Cập nhật tài khoản thành công");
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "Lỗi khi cập nhật tài khoản");

        // Cập nhật lỗi nếu server trả về lỗi username trùng
        if (err.response.data.message === "Tên tài khoản đã tồn tại") {
          setErrors((prev) => ({
            ...prev,
            username: "Username không được trùng nhau",
          }));
        }
      } else {
        toast.error("Lỗi khi cập nhật tài khoản");
      }
      console.error("Error updating account:", err);
    }
  };

  // Mở modal xác nhận xóa tài khoản
  const handleDeleteClick = (account) => {
    setAccountToDelete(account);
    setShowDeleteModal(true);
  };

  // Đóng modal xác nhận xóa
  const closeDeleteModal = () => {
    setAccountToDelete(null);
    setShowDeleteModal(false);
  };

  // Xử lý xóa tài khoản
  const handleDeleteConfirm = async () => {
    if (!accountToDelete) return;

    try {
      await axios.delete(
        `http://localhost:4000/api/account/${accountToDelete._id}`
      );

      // Cập nhật danh sách tài khoản sau khi xóa
      setAccounts(
        accounts.filter((account) => account._id !== accountToDelete._id)
      );

      toast.success("Xóa tài khoản thành công");

      // Đóng modal xác nhận
      closeDeleteModal();
    } catch (err) {
      toast.error("Lỗi khi xóa tài khoản");
      console.error("Error deleting account:", err);
      closeDeleteModal();
    }
  };

  // Hàm đóng form và xóa dữ liệu form
  const resetForm = () => {
    setUsername("");
    setPassword("");
    setErrors({ username: "", password: "" });
    setCurrentAccount(null);
    setShowAddForm(false);
    setShowEditForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Toolbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-[#192F59]">
              Danh sách tài khoản
            </h1>
            <div
              className="flex items-center bg-[#28A745] hover:bg-[#7fca8d] text-white font-bold p-4 px-4 rounded-md transition duration-200 cursor-pointer"
              onClick={() => setShowAddForm(true)}
            >
              <img src="/assets/icon_them.png" alt="" className="w-5 h-5" />
              <span className="ml-2">Thêm mới</span>
            </div>
          </div>

          {/* Bảng danh sách tài khoản */}
          <div
            className={`overflow-x-auto ${
              showAddForm || showEditForm || showDeleteModal ? "opacity-25" : ""
            } bg-white py-16 rounded-lg border border-gray-300`}
          >
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full h-16 border-gray-300 border-y py-8 bg-[#D9D9D9]">
                  <th className="text-left pl-4">
                    <input type="checkbox" />
                  </th>
                  <th className="text-left pl-4">#</th>
                  <th className="text-left">Tài khoản</th>
                  <th className="text-left">Mật khẩu</th>
                  <th className="text-left">Vai trò</th>
                  <th className="text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {accounts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      Không có tài khoản nào
                    </td>
                  </tr>
                ) : (
                  accounts.map((account) => (
                    <tr
                      key={account._id}
                      className="h-16 border-gray-300 border-b"
                    >
                      <td className="pl-4">
                        <input type="checkbox" />
                      </td>
                      <td className="pl-4">{account._id}</td>
                      <td>{account.username}</td>
                      <td>{account.password}</td>
                      <td>{account.role}</td>
                      <td>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditClick(account)}
                            className="cursor-pointer"
                          >
                            <img src="/assets/icon_edit.png" alt="" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(account)}
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

          {/* Form thêm tài khoản */}
          {showAddForm && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div onClick={resetForm}></div>
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-10">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold">Thêm tài khoản mới</h2>
                </div>

                <form onSubmit={handleAddAccount}>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {/* Cột 1: Tài khoản */}
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-1"
                        htmlFor="username"
                      >
                        Tài khoản <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Nhập tên tài khoản"
                      />
                      {errors.username && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.username}
                        </p>
                      )}
                    </div>

                    {/* Cột 2: Mật khẩu */}
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-1"
                        htmlFor="password"
                      >
                        Mật khẩu <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Nhập mật khẩu"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="hover:text-[#E82323] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Hủy bỏ
                    </button>

                    <button
                      type="submit"
                      className="bg-[#1677FF] hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center space-x-2"
                    >
                      <img
                        src="/assets/icon_luu.png"
                        alt=""
                        className="w-5 h-5"
                      />
                      <span>Lưu</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Form sửa tài khoản */}
          {showEditForm && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div onClick={resetForm}></div>
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-10">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold">Sửa tài khoản</h2>
                </div>

                <form onSubmit={handleUpdateAccount}>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {/* Cột 1: Tài khoản */}
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-1"
                        htmlFor="edit-username"
                      >
                        Tài khoản <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="edit-username"
                        value={username}
                        onChange={handleUsernameChange}
                        className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.username && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.username}
                        </p>
                      )}
                    </div>

                    {/* Cột 2: Mật khẩu */}
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-1"
                        htmlFor="edit-password"
                      >
                        Mật khẩu <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        id="edit-password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Nhập mật khẩu mới"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="hover:text-[#E82323] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Hủy bỏ
                    </button>

                    <button
                      type="submit"
                      className="bg-[#1677FF] hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center space-x-2"
                    >
                      <img
                        src="/assets/icon_luu.png"
                        alt=""
                        className="w-5 h-5"
                      />
                      <span>Lưu</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* Modal xác nhận xóa */}
          {showDeleteModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div onClick={closeDeleteModal}></div>
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-10">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Xóa tài khoản</h2>
                </div>

                <p className="mb-6">Bạn có chắc chắn muốn xóa tài khoản này?</p>

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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AccountManager;