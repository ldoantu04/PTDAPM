import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NavBar from '../../layouts/NavBar'
import Footer from '../../layouts/Footer'
import Dashboard from '../Dashboard'

const DisplayEmployee = () => {
  const [staffs, setStaffs] = useState([])
  const [error, setError] = useState('')

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

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Dashboard />
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
                            to={`/admin/nhan-su/${staff._id}`}
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
      <Footer />
    </div>
  )
}

export default DisplayEmployee