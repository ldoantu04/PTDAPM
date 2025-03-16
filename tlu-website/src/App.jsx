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
import InformationTechnology from "./components/user/training/university/InformationTechnology";
import ResearchPublication from "./components/user/research/ResearchPublication";
import ScientificResearchTopic from "./components/user/research/ScientificResearchTopic";
import ResearchGroups from "./components/user/research/ResearchGroups";
import ApplicationDeployment from "./components/user/research/ApplicationDeployment";
import ReseachStudent from "./components/user/research/ReseachStudent";

import Overview from "./components/admin/Overview";
import PostList from "./components/admin/PostList";
import PostForm from "./components/admin/PostForm";
import PostDetail from "./components/admin/PostDetail";


import SoftwareEngineer from "./components/user/training/university/SoftwareEngineer";
import InformationSystem from "./components/user/training/university/InformationSystem";
import ArtificialIntelligence from "./components/user/training/university/ArtificialIntelligence";
import NetworkSecurity from "./components/user/training/university/NetworkSecurity";
import PostManager from "./components/trolykhoa/PostManager";
import AccountManager from "./components/admin/AccountManager"; 
import DisplayEmployee from './components/admin/EmployeeManager/DisplayEmployee';
import AddEmployee from './components/admin/EmployeeManager/AddEmployee';
import EditEmployee from './components/admin/EmployeeManager/EditEmployee';
import DetailEmployee from './components/admin/EmployeeManager/DetailEmployee';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <Router>
      <ToastContainer /> 
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

        <Route path="/dao-tao/dao-tao-dai-hoc/nganh-cong-nghe-thong-tin" element={<InformationTechnology />} />
        <Route path="/dao-tao/dao-tao-dai-hoc/nganh-ky-thuat-phan-mem" element={<SoftwareEngineer />} />
        <Route path="/dao-tao/dao-tao-dai-hoc/nganh-he-thong-thong-tin" element={<InformationSystem />} />
        <Route path="/dao-tao/dao-tao-dai-hoc/nganh-tri-tue-nhan-tao" element={<ArtificialIntelligence />} />
        <Route path="/dao-tao/dao-tao-dai-hoc/nganh-an-ninh-mang" element={<NetworkSecurity />} />

        <Route path="/nghien-cuu/cong-bo-khoa-hoc" element={<ResearchPublication />} />
        <Route path="/nghien-cuu/de-tai-nckh" element={<ScientificResearchTopic />} />
        <Route path="/nghien-cuu/cac-nhom-nghien-cuu" element={<ResearchGroups />} />
        <Route path="/nghien-cuu/trien-khai-ung-dung" element={<ApplicationDeployment />} />
        <Route path="/nghien-cuu/sinh-vien-nckh" element={<ReseachStudent />} />

        
        <Route path="/admin/tong-quan" element={<Overview />} />
        <Route path="/admin/bai-viet" element={<PostList />} />
        <Route path="/admin/bai-viet/them-moi" element={<PostForm />} />
        <Route path="/admin/bai-viet/chinh-sua/:id" element={<PostForm isEditing={true} />} />
        <Route path="/admin/bai-viet/chi-tiet/:id" element={<PostDetail />} />



        <Route path="/trolykhoa/quan-ly-bai-viet" element={<PostManager />} />

        <Route path="/admin/tai-khoan" element={<AccountManager />} />
        <Route path="/admin/nhan-su" element={<DisplayEmployee />} />
        <Route path="/admin/nhan-su/them" element={<AddEmployee />} />
        <Route path="/admin/nhan-su/sua/:id" element={<EditEmployee />} />
        <Route path="/admin/nhan-su/chi-tiet/:id" element={<DetailEmployee />} />

      </Routes>
    </Router>
  );
}

export default App;
