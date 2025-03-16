import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext"; // Import AuthContext
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Lấy hàm login từ AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu username hoặc password để trống
    if (!username) {
      setError('Vui lòng nhập tên đăng nhập!');
      return;
    } else if (!password) {
      setError('Vui lòng nhập mật khẩu!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/login', { username, password });
      const { role } = response.data;
      login(role);
      navigate('/'); // Điều hướng đến trang Dashboard hoặc trang chính
    } catch (error) {
      setError('Tên đăng nhập hoặc mật khẩu không chính xác!');
    }
  };

  return (
    <div className="w-full h-screen bg-[url('/assets/login_background.webp')] bg-cover bg-center flex flex-col items-center justify-center fixed top-0">
      <div style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }} className='w-[1000px] h-auto flex flex-col items-center justify-center p-6'>
        <p className='font-bold text-lg mb-4'>Khoa Công nghệ thông tin - TLU</p>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Tài khoản"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border-b-2 border-gray-400 focus:border-green-500 outline-none transition-colors"
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border-b-2 border-gray-400 focus:border-green-500 outline-none transition-colors"
        />

        <button 
          onClick={handleLogin} 
          className="w-[800px] bg-red-500 text-white py-2 mt-4 hover:bg-red-700 transition-all ease-out duration-500">
          Đăng nhập
        </button>
      </div>
    </div>
  );
}

export default Login;