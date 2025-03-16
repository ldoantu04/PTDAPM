import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext"; // Import AuthContext

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Lấy hàm login từ AuthContext

  const handleLogin = () => {
    if (username === 'admin' && password === '1') {
      login('admin');
      navigate('/'); // Điều hướng đến trang Dashboard hoặc trang chính
    } else if (username === 'trolykhoa' && password === '1') {
      login('trolykhoa');
      navigate('/'); // Điều hướng đến trang Dashboard hoặc trang chính
    } else {
      setError('Tài khoản hoặc mật khẩu không hợp lệ!');
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
          className="w-[800px] bg-red-500 text-white py-2 mt-4 hover:bg-red-600 transition-all ease-out duration-300">
          Đăng nhập
        </button>
      </div>
    </div>
  );
}

export default Login;
