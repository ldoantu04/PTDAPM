import React, { useState, useEffect } from "react";
import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import Toolbar from "../layouts/Toolbar";
import { message, Popconfirm } from "antd"; // Import Ant Design components

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState(""); // Danh mục lớn
  const [currentCategory, setCurrentCategory] = useState(null);
  const [errors, setErrors] = useState({ name: "" }); // Đổi từ error string thành errors object
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/categories");
      setCategories(response.data);
      setErrors({ name: "" });
    } catch (err) {
      toast.error("Không thể tải danh sách danh mục");
      console.error("Error fetching categories:", err);
    }
  };

  // Kiểm tra input
  const validateForm = () => {
    const newErrors = { name: "" };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Name không được để trống";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Xử lý thay đổi tên danh mục
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value.trim()) {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    
    // Validate form trước khi submit
    if (!validateForm()) {
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/categories", {
        name,
        parent_id: parentCategory || null, // Gửi parent_id nếu có
      });

      resetForm();
      fetchCategories();
      message.success("Danh mục đã được tạo thành công");
    } catch (err) {
      message.error("Lỗi khi thêm danh mục");
      console.error("Error adding category:", err);
    }
  };

  const handleEditClick = (category) => {
    setCurrentCategory(category);
    setName(category.name);
    setParentCategory(category.parent_id || ""); // Set danh mục lớn khi sửa
    setShowEditForm(true);
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    
    // Validate form trước khi submit
    if (!validateForm()) {
      return;
    }

    try {
      await axios.put(`http://localhost:4000/api/categories/${currentCategory._id}`, {
        name,
        parent_id: parentCategory || null, // Cập nhật danh mục lớn
      });

      resetForm();
      fetchCategories();
      message.success("Cập nhật thông tin danh mục thành công!");
    } catch (err) {
      message.error("Lỗi khi cập nhật danh mục");
      console.error("Error updating category:", err);
    }
  };

  const resetForm = () => {
    setName("");
    setParentCategory("");
    setCurrentCategory(null);
    setShowAddForm(false);
    setShowEditForm(false);
    setErrors({ name: "" });
  };

  const handleCheckboxChange = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const handleDeleteConfirm = async (category) => {
    try {
      await axios.delete(`http://localhost:4000/api/categories/${category._id}`);
      setCategories(categories.filter((cat) => cat._id !== category._id));
      message.success("Danh mục đã được xóa thành công!");
    } catch (error) {
      message.error("Lỗi khi xóa danh mục");
      console.error("Lỗi khi xóa danh mục:", error);
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
              Danh sách danh mục
            </h1>
            <div
              className="flex items-center bg-[#28A745] hover:opacity-85 space-x-1 text-white font-bold px-4 py-3 rounded-md transition duration-200 cursor-pointer"
              onClick={() => setShowAddForm(true)}
            >
              <img src="/assets/icon_them.png" alt="" className="w-5 h-5" />
              <span className="ml-2">Thêm mới</span>
            </div>
          </div>

          {/* Bảng danh sách danh mục */}
          <div
            className={`overflow-x-auto ${
              showAddForm || showEditForm ? "opacity-25" : ""
            } bg-white py-16 rounded-lg border border-gray-300`}
          >
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full h-16 border-gray-300 border-y py-8 bg-[#F8F8F8] text-[#737373] text-sm">
                  <th className="text-left pl-4">
                    <input type="checkbox" />
                  </th>
                  <th className="text-left pl-4">#</th>
                  <th className="text-left">Danh mục</th>
                  <th className="text-left">Danh mục lớn</th>
                  <th className="">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      Không có danh mục nào
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr
                      key={category._id}
                      className="h-16 border-gray-300 border-b text-sm"
                    >
                      <td className="pl-4">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category._id)}
                          onChange={() => handleCheckboxChange(category._id)}
                        />
                      </td>
                      <td className="pl-4">{category._id}</td>
                      <td>{category.parent_id ? `${categories.find(c => c._id === category.parent_id)?.name || ""} >>` : ""} {category.name}</td>
                      <td>
                        {category.parent_id
                          ? categories.find((c) => c._id === category.parent_id)?.name || ""
                          : ""}
                      </td>
                      <td>
                        <div className="flex space-x-5 justify-center ">
                          <button
                            onClick={() => handleEditClick(category)}
                            className="cursor-pointer hover:opacity-80 transition ease-out duration-300"
                          >
                            <img src="/assets/icon_edit.png" alt="" />
                          </button>
                          <Popconfirm
                            title="Xóa danh mục"
                            description="Bạn có chắc chắn muốn xóa danh mục này không?"
                            onConfirm={() => handleDeleteConfirm(category)}
                            okText="Xóa"
                            cancelText="Hủy"
                            okButtonProps={{ danger: true }}
                          >
                            <button className="cursor-pointer hover:opacity-80 transition ease-out duration-300">
                              <img src="/assets/icon_xoa.png" alt="" />
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

          {/* Form thêm danh mục */}
          {showAddForm && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div onClick={resetForm}></div>
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-10">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold">Thêm danh mục mới</h2>
                </div>

                <form onSubmit={handleAddCategory}>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {/* Cột 1: Tên danh mục */}
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-1"
                        htmlFor="name"
                      >
                        Tên danh mục <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        className={`border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Nhập tên danh mục"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Cột 2: Danh mục lớn */}
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-1"
                        htmlFor="parentCategory"
                      >
                        Danh mục lớn
                      </label>
                      <select
                        id="parentCategory"
                        value={parentCategory}
                        onChange={(e) => setParentCategory(e.target.value)}
                        className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Chọn danh mục lớn</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
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

          {/* Form sửa danh mục */}
          {showEditForm && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div onClick={resetForm}></div>
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-10">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold">Sửa danh mục</h2>
                </div>

                <form onSubmit={handleUpdateCategory}>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {/* Cột 1: Tên danh mục */}
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-1"
                        htmlFor="edit-name"
                      >
                        Tên danh mục <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="edit-name"
                        value={name}
                        onChange={handleNameChange}
                        className={`border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Cột 2: Danh mục lớn */}
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-1"
                        htmlFor="edit-parentCategory"
                      >
                        Danh mục lớn
                      </label>
                      <select
                        id="edit-parentCategory"
                        value={parentCategory}
                        onChange={(e) => setParentCategory(e.target.value)}
                        className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Chọn danh mục lớn</option>
                        {categories.map((category) => (
                          // Không hiển thị danh mục đang sửa trong danh sách danh mục lớn
                          currentCategory && category._id !== currentCategory._id && (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          )
                        ))}
                      </select>
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Categories;