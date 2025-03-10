import React from 'react'

function Login() {
  return (
    <div className="w-full h-screen bg-[url('/assets/login_background.webp')] bg-cover bg-center flex flex-col items-center justify-center">
      <div style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }} className='w-[1000px] h-auto flex flex-col items-center justify-center p-6'>
        <p className='font-bold text-lg mb-4'>Khoa Công nghệ thông tin - TLU</p>

        <input
          type="text"
          placeholder="Tài khoản"
          className="w-full p-2 mb-3 border-b-2 border-gray-400 focus:border-green-500 outline-none transition-colors"
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full p-2 mb-3 border-b-2 border-gray-400 focus:border-green-500 outline-none transition-colors"
        />

        <button className="w-[800px] bg-red-500 text-white py-2 mt-4 hover:bg-red-600 transition-all ease-out duration-300">
          Đăng nhập
        </button>
      </div>
    </div>
  )
}

export default Login
