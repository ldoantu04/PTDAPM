import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/user/Main";
import Login from "./components/user/Login";
import FacultyOverview from "./components/user/FacultyOverview";
import TeachStaff from "./components/user/TeachStaff";
import AdmissionMain from "./components/user/admission/AdmissionMain";
import AdmissionPost from "./components/user/admission/AdmissionPost"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gioi-thieu/tong-quan-ve-khoa" element={<FacultyOverview />} />
        <Route path="/gioi-thieu/doi-ngu-nhan-su" element={<TeachStaff />} />
        <Route path="/tuyen-sinh" element={<AdmissionMain />} />
        <Route path="/tuyen-sinh/chi-tiet-bai-viet" element={<AdmissionPost />} />
      </Routes>
    </Router>
  );
}

export default App;
