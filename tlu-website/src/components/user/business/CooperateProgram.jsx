import React, { useState, useEffect } from "react";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import HighlightHeader from "../../layouts/HighlightHeader";
import ArticleOther from "../../layouts/ArticleOther";
import Sidebar from "../../layouts/Sidebar";
import SmallNavBar from "../../layouts/SmallNavBar";
import axios from "axios";
import { backendUrl } from "../../../App";

function CooperateProgram() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        // Tìm danh mục "Chương trình hợp tác"
        const categoriesResponse = await axios.get(`${backendUrl}/api/categories`);
        const programCategory = categoriesResponse.data.find(
          cat => cat.name.toLowerCase().includes("chương trình hợp tác") || 
                cat.name.toLowerCase().includes("chuong trinh hop tac") ||
                cat.name.toLowerCase().includes("cooperation")
        );

        if (!programCategory) {
          // Nếu không tìm thấy danh mục cụ thể, thử lấy danh mục "Doanh nghiệp" chung
          const businessCategory = categoriesResponse.data.find(
            cat => cat.name.toLowerCase().includes("doanh nghiệp") ||
                  cat.name.toLowerCase().includes("business") ||
                  cat.name.toLowerCase().includes("đối tác")
          );

          if (businessCategory) {
            // Lấy tất cả bài viết về doanh nghiệp và lọc theo tiêu đề chứa "hợp tác"
            const postsResponse = await axios.get(
              `${backendUrl}/api/posts/category/${businessCategory._id}`
            );
            
            const filteredPosts = postsResponse.data.filter(post => 
              post.title.toLowerCase().includes("hợp tác") || 
              post.title.toLowerCase().includes("hop tac") ||
              post.title.toLowerCase().includes("cooperation")
            );
            
            setPrograms(filteredPosts);
            setError(null);
            setLoading(false);
            return;
          } else {
            setError("Không tìm thấy danh mục chương trình hợp tác");
            setLoading(false);
            return;
          }
        }

        // Lấy bài viết từ danh mục hợp tác đã tìm thấy
        const postsResponse = await axios.get(
          `${backendUrl}/api/posts/category/${programCategory._id}`
        );
        
        setPrograms(postsResponse.data);
        setError(null);
      } catch (err) {
        console.error("Lỗi khi tải danh sách chương trình hợp tác:", err);
        setError("Không thể tải danh sách chương trình hợp tác");
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const sidebarData = [
    { label: "Danh sách đối tác", link: "/doanh-nghiep/danh-sach-doi-tac" },
    { label: "Chương trình hợp tác", link: "/doanh-nghiep/chuong-trinh-hop-tac", marker: true },
    { label: "Học bổng doanh nghiệp", link: "/doanh-nghiep/hoc-bong-doanh-nghiep" },
  ];

  const navigationLinks = [
    { label: "Trang chủ", href: "/" },
    { label: "Doanh nghiệp", href: "/doanh-nghiep" },
    { label: "Chương trình hợp tác", href: "/doanh-nghiep/chuong-trinh-hop-tac" },
  ];
  
  return (
    <div>
      <NavBar />

      <main>
        <SmallNavBar navigationLinks={navigationLinks} />

        <div className="flex gap-x-30">
          <div className="w-1/4">
            <Sidebar title="Doanh nghiệp" items={sidebarData} />
          </div>

          <div className="w-3/4">
            <HighlightHeader title="CHƯƠNG TRÌNH HỢP TÁC" />
            
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <p>Đang tải danh sách chương trình hợp tác...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center py-20">
                <p className="text-red-500">{error}</p>
              </div>
            ) : programs.length === 0 ? (
              <div className="flex justify-center items-center py-20">
                <p>Chưa có chương trình hợp tác nào</p>
              </div>
            ) : (
              <div className="flex flex-col gap-y-5">
                {programs.map((program) => (
                  <ArticleOther 
                    key={program._id}
                    title={program.title}
                    imageUrl={program.thumbnail}
                    date={program.updated_at || program.created_at}
                    excerpt={program.description || program.detail?.substring(0, 200)}
                    link={`/doanh-nghiep/chuong-trinh-hop-tac/chi-tiet/${program._id}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CooperateProgram;