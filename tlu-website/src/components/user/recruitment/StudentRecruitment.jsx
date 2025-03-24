import React, { useState, useEffect } from "react";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import HighlightHeader from "../../layouts/HighlightHeader";
import ArticleMainPage from "../../layouts/ArticleMainPage";
import Sidebar from "../../layouts/Sidebar";
import SmallNavBar from "../../layouts/SmallNavBar";
import axios from "axios";
import { backendUrl } from "../../../App";

function StudentRecruitment() {
  const [internships, setInternships] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState({
    internships: true,
    jobs: true
  });
  const [error, setError] = useState({
    internships: null,
    jobs: null
  });

  useEffect(() => {
    const fetchRecruitmentPosts = async () => {
      try {
        setLoading({ internships: true, jobs: true });
        // Tìm danh mục "Tuyển dụng" hoặc "Thông báo"
        const categoriesResponse = await axios.get(`${backendUrl}/api/categories`);
        const recruitmentCategory = categoriesResponse.data.find(
          cat => cat.name.toLowerCase().includes("tuyển dụng") || 
                cat.name.toLowerCase().includes("tuyen dung") ||
                cat.name.toLowerCase().includes("recruitment") ||
                cat.name.toLowerCase().includes("thông báo") ||
                cat.name.toLowerCase().includes("thong bao")
        );

        if (!recruitmentCategory) {
          setError({
            internships: "Không tìm thấy danh mục tuyển dụng",
            jobs: "Không tìm thấy danh mục tuyển dụng"
          });
          setLoading({ internships: false, jobs: false });
          return;
        }

        // Lấy tất cả bài viết từ danh mục
        const postsResponse = await axios.get(
          `${backendUrl}/api/posts/category/${recruitmentCategory._id}`
        );
        
        // Phân loại bài viết thành thực tập và việc làm dựa vào tiêu đề
        const allPosts = postsResponse.data;
        const internshipPosts = allPosts.filter(post => 
          post.title.toLowerCase().includes("thực tập") || 
          post.title.toLowerCase().includes("thuc tap") ||
          post.title.toLowerCase().includes("intern")
        );
        
        const jobPosts = allPosts.filter(post => 
          post.title.toLowerCase().includes("tuyển dụng") || 
          post.title.toLowerCase().includes("việc làm") ||
          post.title.toLowerCase().includes("tuyen dung") ||
          post.title.toLowerCase().includes("viec lam") ||
          post.title.toLowerCase().includes("job") ||
          !post.title.toLowerCase().includes("thực tập") // Bài viết không có từ khóa thực tập
        );

        setInternships(internshipPosts);
        setJobs(jobPosts);
        setError({
          internships: internshipPosts.length === 0 ? "Chưa có thông tin thực tập" : null,
          jobs: jobPosts.length === 0 ? "Chưa có thông tin việc làm" : null
        });
      } catch (err) {
        console.error("Lỗi khi tải thông tin tuyển dụng:", err);
        setError({
          internships: "Không thể tải thông tin thực tập",
          jobs: "Không thể tải thông tin việc làm"
        });
      } finally {
        setLoading({ internships: false, jobs: false });
      }
    };

    fetchRecruitmentPosts();
  }, []);

  const sidebarData = [
    { label: "Tuyển dụng sinh viên", link: "/tuyen-dung/tuyen-dung-sinh-vien", marker: true },
    { label: "Tuyển dụng giảng viên", link: "/tuyen-dung/tuyen-dung-giang-vien" },
  ];

  const navigationLinks = [
    { label: "Trang chủ", href: "/" },
    { label: "Tuyển dụng", href: "/tuyen-dung" },
    { label: "Tuyển dụng sinh viên", href: "/tuyen-dung/tuyen-dung-sinh-vien" },
  ];

  return (
    <div>
      <NavBar />

      <main>
        <SmallNavBar navigationLinks={navigationLinks} />

        <div className="flex gap-x-30">
          <div className="w-1/4">
            <Sidebar title="Tuyển dụng" items={sidebarData} />
          </div>

          <div className="w-3/4 flex flex-col gap-y-10">
            <div>
              <HighlightHeader title="THỰC TẬP" />
              {loading.internships ? (
                <div className="flex justify-center items-center py-20">
                  <p>Đang tải thông tin thực tập...</p>
                </div>
              ) : error.internships ? (
                <div className="flex justify-center items-center py-20">
                  <p className="text-red-500">{error.internships}</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-5">
                  {internships.map((post) => (
                    <ArticleMainPage 
                      key={post._id}
                      title={post.title}
                      thumbnail={post.thumbnail}
                      link={`/tuyen-dung/thuc-tap/${post._id}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <HighlightHeader title="VIỆC LÀM" />
              {loading.jobs ? (
                <div className="flex justify-center items-center py-20">
                  <p>Đang tải thông tin việc làm...</p>
                </div>
              ) : error.jobs ? (
                <div className="flex justify-center items-center py-20">
                  <p className="text-red-500">{error.jobs}</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-5">
                  {jobs.map((post) => (
                    <ArticleMainPage 
                      key={post._id}
                      title={post.title}
                      thumbnail={post.thumbnail}
                      link={`/tuyen-dung/viec-lam/${post._id}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default StudentRecruitment;