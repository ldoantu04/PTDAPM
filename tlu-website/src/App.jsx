import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/user/Main";
import Login from "./components/user/Login";
import FacultyOverview from "./components/user/FacultyOverview";
import TeachStaff from "./components/user/TeachStaff";
import AdmissionMain from "./components/user/admission/AdmissionMain";
import AdmissionPost from "./components/user/admission/AdmissionPost"
import News from "./components/user/News";
import BusinessList from "./components/user/business/BusinessList";
import CooperationInfo from "./components/user/business/CooperationInfo";
import CooperateProgram from "./components/user/business/CooperateProgram";
import BusinessScholarship from "./components/user/business/BusinessScholarship"; 
import ScholarshipInfo from "./components/user/business/ScholarshipInfo"; 
import Announcements from "./components/user/Announcements";
import StudentRecruitment from "./components/user/recruitment/StudentRecruitment";
import LecturerRecruitment from "./components/user/recruitment/LecturerRecruitment";

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

        <Route path="/tin-tuc" element={<News />} />

        <Route path="/doanh-nghiep/danh-sach-doi-tac" element={<BusinessList />} />
        <Route path="/doanh-nghiep/danh-sach-doi-tac/chi-tiet-doi-tac" element={<CooperationInfo />} />
        <Route path="/doanh-nghiep/hoc-bong-doanh-nghiep" element={<BusinessScholarship />} />
        <Route path="/doanh-nghiep/hoc-bong-doanh-nghiep/chi-tiet-hoc-bong" element={<ScholarshipInfo />} />
        <Route path="/doanh-nghiep/chuong-trinh-hop-tac" element={<CooperateProgram />} />

        <Route path="/thong-bao" element={<Announcements />} />

        <Route path="/tuyen-dung/tuyen-dung-sinh-vien" element={<StudentRecruitment />} />
        <Route path="/tuyen-dung/tuyen-dung-giang-vien" element={<LecturerRecruitment />} />
      </Routes>
    </Router>
  );
}

export default App;
