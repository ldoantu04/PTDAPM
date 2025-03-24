import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../layouts/NavBar';
import Footer from '../../layouts/Footer';
import Sidebar from '../../layouts/Sidebar';
import SmallNavBar from '../../layouts/SmallNavBar';
import HighlightHeader from '../../layouts/HighlightHeader';
import ArticleOther from '../../layouts/ArticleOther';
import { backendUrl } from '../../../App';

function ReseachStudent() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentResearchProjects = async () => {
      try {
        setLoading(true);
        // Tìm danh mục "Sinh viên nghiên cứu khoa học"
        const categoriesResponse = await axios.get(`${backendUrl}/api/categories`);
        const researchCategory = categoriesResponse.data.find(
          cat => cat.name.toLowerCase().includes("sinh viên nghiên cứu") || 
                cat.name.toLowerCase().includes("sinh vien nghien cuu") ||
                cat.name.toLowerCase().includes("sv nckh") ||
                cat.name.toLowerCase().includes("student research")
        );

        if (!researchCategory) {
          // Nếu không tìm thấy danh mục cụ thể, thử lấy danh mục "Nghiên cứu" chung
          const generalResearchCategory = categoriesResponse.data.find(
            cat => cat.name.toLowerCase().includes("nghiên cứu") ||
                  cat.name.toLowerCase().includes("nghien cuu") ||
                  cat.name.toLowerCase().includes("research")
          );

          if (generalResearchCategory) {
            // Lấy tất cả bài viết về nghiên cứu và lọc theo tiêu đề chứa "sinh viên"
            const postsResponse = await axios.get(
              `${backendUrl}/api/posts/category/${generalResearchCategory._id}`
            );
            
            const filteredPosts = postsResponse.data.filter(post => 
              post.title.toLowerCase().includes("sinh viên") || 
              post.title.toLowerCase().includes("sv") ||
              post.title.toLowerCase().includes("student") ||
              post.detail?.toLowerCase().includes("sinh viên nghiên cứu")
            );
            
            setProjects(filteredPosts);
            setError(null);
            setLoading(false);
            return;
          } else {
            setError("Không tìm thấy danh mục sinh viên NCKH");
            setLoading(false);
            return;
          }
        }

        // Lấy bài viết từ danh mục sinh viên NCKH đã tìm thấy
        const postsResponse = await axios.get(
          `${backendUrl}/api/posts/category/${researchCategory._id}`
        );
        
        setProjects(postsResponse.data);
        setError(null);
      } catch (err) {
        console.error("Lỗi khi tải danh sách sinh viên NCKH:", err);
        setError("Không thể tải danh sách sinh viên NCKH");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentResearchProjects();
  }, []);

  const sidebarData = [
    { label: "Công bố khoa học", link: "/nghien-cuu/cong-bo-khoa-hoc" },
    { label: "Đề tài NCKH", link: "/nghien-cuu/de-tai-nckh" },
    { label: "Các nhóm nghiên cứu", link: "/nghien-cuu/cac-nhom-nghien-cuu" },
    { label: "Triển khai ứng dụng", link: "/nghien-cuu/trien-khai-ung-dung" },
    { label: "Sinh viên NCKH", link: "/nghien-cuu/sinh-vien-nckh", marker: true },
  ];

  const navigationLinks = [
    { label: "Trang chủ", href: "/" },
    { label: "Nghiên cứu", href: "/nghien-cuu" },
    { label: "Sinh viên NCKH", href: "/nghien-cuu/sinh-vien-nckh" },
  ];
  
  return (
    <div>
      <NavBar />

      <div>
        <div className="px-55 mx-auto mb-10 mt-30">
          <SmallNavBar navigationLinks={navigationLinks} />

          <div className="flex gap-x-30">
            <div>
              <Sidebar title="Nghiên cứu" items={sidebarData} />
            </div>

            <div className="pr-10 w-3/4">
              <HighlightHeader title="SINH VIÊN NCKH" />
              
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <p>Đang tải danh sách sinh viên NCKH...</p>
                </div>
              ) : error ? (
                <div className="flex justify-center items-center py-20">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : projects.length === 0 ? (
                <div className="flex justify-center items-center py-20">
                  <p>Chưa có thông tin về sinh viên NCKH</p>
                </div>
              ) : (
                <div className="flex flex-col gap-y-5">
                  {projects.map((project) => (
                    <ArticleOther 
                      key={project._id}
                      title={project.title}
                      imageUrl={project.thumbnail}
                      date={project.updated_at || project.created_at}
                      excerpt={project.description || project.detail?.substring(0, 200).replace(/<\/?[^>]+(>|$)/g, "")}
                      link={`/nghien-cuu/sinh-vien-nckh/chi-tiet/${project._id}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ReseachStudent;