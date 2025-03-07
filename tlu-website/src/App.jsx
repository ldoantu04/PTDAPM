import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/user/Main";
import Login from "./components/user/Login";
import FacultyOverview from "./components/user/FacultyOverview";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gioi-thieu/tong-quan-ve-khoa" element={<FacultyOverview />} />
      </Routes>
    </Router>
  );
}

export default App;
