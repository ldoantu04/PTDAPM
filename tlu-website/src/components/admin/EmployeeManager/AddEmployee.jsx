import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavBar from '../../layouts/NavBar'
import Footer from '../../layouts/Footer'
import Toolbar from '../../layouts/Toolbar'

const AddEmployee = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  
  // Form fields
  const [name, setName] = useState('')
  const [degree, setDegree] = useState('Tiến sĩ')
  const [status, setStatus] = useState('Đang làm việc')
  const [department, setDepartment] = useState('Bộ môn Công nghệ phần mềm')
  const [position, setPosition] = useState('Giảng viên')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [bio, setBio] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setThumbnail(file)
      
      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!name || !email || !degree || !status || !department || !position) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc')
      return
    }
    
    try {
      // Create form data
      const formData = new FormData()
      formData.append('name', name)
      formData.append('degree', degree)
      formData.append('status', status)
      formData.append('department', department)
      formData.append('position', position)
      formData.append('email', email)
      formData.append('phone', phone)
      formData.append('bio', bio)
      
      if (thumbnail) {
        formData.append('thumbnail', thumbnail)
      }
      
      // Submit the form
      await axios.post('http://localhost:4000/api/staff', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      // Redirect to display page after successful submission
      navigate('/admin/nhan-su')
      
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Lỗi khi thêm nhân sự')
      } else {
        setError('Lỗi kết nối đến máy chủ')
      }
      console.error('Error adding staff:', err)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Toolbar />
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Thêm nhân sự mới</h1>
          </div>

          {/* Display error message if any */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Thumbnail upload */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Ảnh đại diện
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 border rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <input 
                  type="file"
                  id="thumbnail"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>
            
            {/* Name */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Tên nhân sự <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Nhập tên nhân sự"
                required
              />
            </div>
            
            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Nhập email"
                required
              />
            </div>
            
            {/* Phone */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Nhập số điện thoại"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Degree */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="degree">
                  Học vị <span className="text-red-500">*</span>
                </label>
                <select
                  id="degree"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="Tiến sĩ">Tiến sĩ</option>
                  <option value="Thạc sĩ">Thạc sĩ</option>
                  <option value="Phó giáo sư">Phó giáo sư</option>
                  <option value="Giáo sư">Giáo sư</option>
                  <option value="Cử nhân">Cử nhân</option>
                </select>
              </div>
              
              {/* Status */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                  Trạng thái <span className="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="Đang làm việc">Đang làm việc</option>
                  <option value="Đã nghỉ">Đã nghỉ</option>
                  <option value="Đang học tập">Đang học tập</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Department */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                  Phòng ban <span className="text-red-500">*</span>
                </label>
                <select
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="Bộ môn Công nghệ phần mềm">Bộ môn Công nghệ phần mềm</option>
                  <option value="Bộ môn Hệ thống thông tin">Bộ môn Hệ thống thông tin</option>
                  <option value="Bộ môn Khoa học máy tính">Bộ môn Khoa học máy tính</option>
                  <option value="Bộ môn Kỹ thuật máy tính và mạng">Bộ môn Kỹ thuật máy tính và mạng</option>
                  <option value="Văn phòng khoa">Văn phòng khoa</option>
                </select>
              </div>
              
              {/* Position */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                  Chức vụ <span className="text-red-500">*</span>
                </label>
                <select
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="Giảng viên">Giảng viên</option>
                  <option value="Trưởng khoa">Trưởng khoa</option>
                  <option value="Phó trưởng khoa">Phó trưởng khoa</option>
                  <option value="Trưởng bộ môn">Trưởng bộ môn</option>
                  <option value="Phó bộ môn">Phó bộ môn</option>
                  <option value="Trợ lý khoa">Trợ lý khoa</option>
                </select>
              </div>
            </div>
            
            {/* Bio */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                Tiểu sử
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                placeholder="Nhập tiểu sử"
              />
            </div>
            
            <div className="flex items-center justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/admin/nhan-su')}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AddEmployee