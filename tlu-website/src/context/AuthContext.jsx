import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Lấy dữ liệu từ localStorage nếu có
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Hàm đăng nhập (lưu vào state và localStorage)
  const login = (role) => {
    const newUser = { role };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser)); // Lưu vào localStorage
  };

  // Hàm đăng xuất (xoá khỏi state và localStorage)
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Xoá khỏi localStorage
  };

  return (
    // Content bọc trong Provider sẽ sử dụng được user, login và logout
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook để sử dụng AuthContext dễ dàng
const useAuth = () => useContext(AuthContext);

export { useAuth };
export default AuthProvider;
