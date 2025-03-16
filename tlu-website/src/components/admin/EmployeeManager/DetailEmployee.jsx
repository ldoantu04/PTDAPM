import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import NavBar from '../../layouts/NavBar'
import Footer from '../../layouts/Footer'
import Dashboard from '../Dashboard'

const DetailEmployee = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [staff, setStaff] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch staff data when component mounts
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/staff/${id}`)
        setStaff(response.data)
        setLoading(false)
      } catch (err) {
        setError('Không thể tải thông tin nhân sự')
        console.error('Error fetching staff data:', err)
        setLoading(false)
      }
    }
    
    fetchStaffData()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <Dashboard />
        <div className="container mx-auto px-4 py-8 mt-20 flex justify-center items-center">
          <p>Đang tải thông tin...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !staff) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <Dashboard />
        <div className="container mx-auto px-4 py-8 mt-20 flex flex-col items-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-3xl">
            {error || 'Không tìm thấy thông tin nhân sự'}
          </div>
          <Link to="/admin/nhan-su" className="mt-4 text-blue-500 hover:underline">
            Quay lại danh sách nhân sự
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Dashboard />
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Chi tiết nhân sự</h1>
          <div className="space-x-2">
            <Link 
              to={`/admin/nhan-su/sua/${id}`}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sửa thông tin
            </Link>
            <Link 
              to="/admin/nhan-su"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Quay lại
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Card bên trái - Chi tiết nhân sự */}
          <div className="md:w-2/3 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex md:flex-row flex-col">
              <div className="md:w-1/3">
                {staff.thumbnail ? (
                  <img 
                    src={staff.thumbnail} 
                    alt={staff.name} 
                    className="w-full h-full object-cover"
                    style={{ minHeight: '300px' }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500" style={{ minHeight: '300px' }}>
                    Không có ảnh
                  </div>
                )}
              </div>

              <div className="md:w-2/3 p-6">
                <div className="mb-4">
                  <p className="text-red-600 font-semibold">{staff.position}</p>
                  <h2 className="text-3xl font-bold text-gray-800 mt-1">{staff.name}</h2>
                  <p className="text-gray-600 text-lg mt-2">{staff.department}</p>
                </div>

                <div className="space-y-3 mt-6">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <p className="text-gray-700">{staff.email || 'Chưa cập nhật'}</p>
                  </div>

                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <p className="text-gray-700">{staff.phone || 'Chưa cập nhật'}</p>
                  </div>

                </div>

                <div className="mt-6">
                  <p className="text-gray-700 whitespace-pre-line">{staff.bio || 'Chưa cập nhật tiểu sử'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card bên phải - Hiển thị theo style TeachStaff */}
          <div className="md:w-1/3 mt-4 md:mt-0">
            <div 
              className="bg-gray-50 rounded-lg shadow h-full"
              style={{
                backgroundImage: "url('/assets/lecturer_list/background.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                backgroundBlendMode: "lighten",
              }}
            >
              <div className="flex flex-col items-center p-6">
                <div className="w-full mb-4 overflow-hidden">
                  {staff.thumbnail ? (
                    <img 
                      src={staff.thumbnail} 
                      alt={staff.name} 
                      className="w-full h-auto rounded-lg object-cover hover:scale-110 transition ease-in-out"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                      Không có ảnh
                    </div>
                  )}
                </div>
                <p className="font-normal text-[20px] text-[#E82323] mt-4">{staff.position}</p>
                <p className="font-bold text-[24px] text-black hover:text-[#35c56c] transition-colors mt-2">{staff.name}</p>
                <p className="font-normal text-[16px] mt-3">{staff.department}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default DetailEmployee