import React, { useState, useEffect } from 'react'
import NavBar from '../layouts/NavBar'
import Footer from '../layouts/Footer'
import Dashboard from './Dashboard'
import axios from 'axios'

const AccountManager = () => {
  const [accounts, setAccounts] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [currentAccount, setCurrentAccount] = useState(null)
  const [error, setError] = useState('')

  // Fetch danh sách tài khoản khi component mount
  useEffect(() => {
    fetchAccounts()
  }, [])

  // Lấy danh sách tài khoản
  const fetchAccounts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/account')
      setAccounts(response.data)
      setError('')
    } catch (err) {
      setError('Không thể tải danh sách tài khoản')
      console.error('Error fetching accounts:', err)
    }
  }

  // Xử lý thêm tài khoản
  const handleAddAccount = async (e) => {
    e.preventDefault()
    
    if (!username || !password) {
      setError('Vui lòng nhập đầy đủ thông tin')
      return
    }
    
    try {
      await axios.post('http://localhost:4000/api/account', {
        username,
        password,
        role: 'trolykhoa' // Mặc định là trolykhoa
      })
      
      // Reset form
      setUsername('')
      setPassword('')
      setShowAddForm(false)
      
      // Tải lại danh sách
      fetchAccounts()
      setError('')
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Lỗi khi thêm tài khoản')
      } else {
        setError('Lỗi kết nối đến máy chủ')
      }
      console.error('Error adding account:', err)
    }
  }

  // Xử lý mở form sửa tài khoản
  const handleEditClick = (account) => {
    setCurrentAccount(account)
    setUsername(account.username)
    setPassword('')
    setShowEditForm(true)
  }

  // Xử lý cập nhật tài khoản
  const handleUpdateAccount = async (e) => {
    e.preventDefault()
    
    if (!username) {
      setError('Vui lòng nhập tên tài khoản')
      return
    }
    
    try {
      const updateData = { username }
      if (password) updateData.password = password
      
      await axios.put(`http://localhost:4000/api/account/${currentAccount._id}`, updateData)
      
      // Reset form
      setUsername('')
      setPassword('')
      setShowEditForm(false)
      setCurrentAccount(null)
      
      // Tải lại danh sách
      fetchAccounts()
      setError('')
    } catch (err) {
      setError('Lỗi khi cập nhật tài khoản')
      console.error('Error updating account:', err)
    }
  }

  // Hàm đóng form và xóa dữ liệu form
  const resetForm = () => {
    setUsername('')
    setPassword('')
    setError('')
    setCurrentAccount(null)
    setShowAddForm(false)
    setShowEditForm(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Dashboard />
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Quản lý tài khoản</h1>
            <button 
              onClick={() => setShowAddForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Thêm tài khoản
            </button>
          </div>

          {/* Hiển thị lỗi nếu có */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Bảng danh sách tài khoản */}
          <div className={`overflow-x-auto ${showAddForm || showEditForm ? 'opacity-25' : ''}`}>
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full h-16 border-gray-300 border-b py-8">
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
                    <td colSpan="5" className="text-center py-4">Không có tài khoản nào</td>
                  </tr>
                ) : (
                  accounts.map((account) => (
                    <tr key={account._id} className="h-16 border-gray-300 border-b">
                      <td className="pl-4">{account._id}</td>
                      <td>{account.username}</td>
                      <td>{account.password}</td>
                      <td>{account.role}</td>
                      <td>
                        <button
                          onClick={() => handleEditClick(account)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          Sửa
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Form thêm tài khoản - Sử dụng lớp overlay trong suốt hơn */}
          {showAddForm && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-10">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Thêm tài khoản</h2>
                </div>
                
                <form onSubmit={handleAddAccount}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                      Tài khoản
                    </label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Nhập tên tài khoản"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                      Mật khẩu
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Nhập mật khẩu"
                    />
                  </div>
                  
                  <div className="flex items-center justify-end space-x-3">
                    <button
                      type="button"
                      onClick={resetForm}
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
          )}

          {/* Form sửa tài khoản - Sử dụng lớp overlay trong suốt hơn */}
          {showEditForm && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-10">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Sửa tài khoản</h2>
                </div>
                
                <form onSubmit={handleUpdateAccount}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-username">
                      Tài khoản
                    </label>
                    <input
                      type="text"
                      id="edit-username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-password">
                      Mật khẩu mới (để trống nếu không đổi)
                    </label>
                    <input
                      type="password"
                      id="edit-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Nhập mật khẩu mới"
                    />
                  </div>
                  
                  <div className="flex items-center justify-end space-x-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Cập nhật
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
  )
}

export default AccountManager