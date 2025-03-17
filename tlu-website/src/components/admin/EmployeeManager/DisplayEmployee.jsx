import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NavBar from '../../layouts/NavBar'
import Footer from '../../layouts/Footer'
import Toolbar from '../../layouts/Toolbar'

const DisplayEmployee = () => {
  const [staffs, setStaffs] = useState([])
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [staffToDelete, setStaffToDelete] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // Fetch staffs when component mounts
  useEffect(() => {
    fetchStaffs()
  }, [])

  // Get staff list
  const fetchStaffs = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/staff')
      setStaffs(response.data)
    } catch (err) {
      setError('Không thể tải danh sách nhân sự')
      console.error('Error fetching staffs:', err)
    }
  }

  // Mở modal xác nhận xóa nhân sự
  const handleDeleteClick = (staff) => {
    setStaffToDelete(staff)
    setShowDeleteModal(true)
  }

  // Đóng modal xác nhận
  const closeDeleteModal = () => {
    setStaffToDelete(null)
    setShowDeleteModal(false)
  }

  // Xử lý xóa nhân sự
  const handleDeleteConfirm = async () => {
    if (!staffToDelete) return
    
    try {
      await axios.delete(`http://localhost:4000/api/staff/${staffToDelete._id}`)
      
      // Cập nhật danh sách nhân sự sau khi xóa
      setStaffs(staffs.filter(staff => staff._id !== staffToDelete._id))
      setSuccessMessage('Xóa nhân sự thành công')
      
      // Ẩn thông báo thành công sau 3 giây
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
      
      // Đóng modal xác nhận
      closeDeleteModal()
    } catch (err) {
      setError('Lỗi khi xóa nhân sự')
      console.error('Error deleting staff:', err)
      closeDeleteModal()
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Toolbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Danh sách nhân sự</h1>
            <Link 
              to="/admin/nhan-su/them"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Thêm mới
            </Link>
          </div>

          {/* Display error message if any */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Display success message if any */}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {successMessage}
            </div>
          )}

          {/* Staff listing */}
          <div className="overflow-x-auto">
            {staffs.length === 0 ? (
              <p className="text-center py-4">Chưa có nhân sự nào</p>
            ) : (
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="w-full h-16 border-gray-300 border-b py-8">
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
                  {staffs.map((staff) => (
                    <tr key={staff._id} className="h-16 border-gray-300 border-b">
                      <td className="pl-4 truncate max-w-[100px]">{staff._id}</td>
                      <td>
                        {staff.thumbnail ? (
                          <img 
                            src={staff.thumbnail} 
                            alt={staff.name} 
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                        )}
                      </td>
                      <td>{staff.name}</td>
                      <td>{staff.degree}</td>
                      <td>{staff.department}</td>
                      <td>{staff.position}</td>
                      <td>
                        <span className={`px-2 py-1 rounded text-xs ${
                          staff.status === 'Đang làm việc' 
                            ? 'bg-green-100 text-green-800' 
                            : staff.status === 'Đã nghỉ'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {staff.status}
                        </span>
                      </td>
                      <td>
                        <div className="flex space-x-2">
                          <Link 
                            to={`/admin/nhan-su/chi-tiet/${staff._id}`}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-2 rounded text-sm"
                          >
                            Xem
                          </Link>
                          <Link 
                            to={`/admin/nhan-su/sua/${staff._id}`}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 px-2 rounded text-sm"
                          >
                            Sửa
                          </Link>
                          <button 
                            onClick={() => handleDeleteClick(staff)}
                            className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded text-sm"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      
      {/* Modal xác nhận xóa */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Xác nhận xóa</h2>
            </div>
            
            <p className="mb-6">
              Bạn có chắc chắn muốn xóa nhân sự <span className="font-bold">{staffToDelete?.name}</span>?
              <br />
              Hành động này không thể hoàn tác.
            </p>
            
            <div className="flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  )
}

export default DisplayEmployee