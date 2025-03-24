import React, { useState, useEffect } from "react";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import HighlightHeader from "../../layouts/HighlightHeader";
import ArticleMainPage from "../../layouts/ArticleMainPage";
import Sidebar from "../../layouts/Sidebar";
import SmallNavBar from "../../layouts/SmallNavBar";
import axios from "axios";
import { backendUrl } from "../../../App";

function BusinessScholarship() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setLoading(true);
        // Tìm danh mục "Học bổng doanh nghiệp" với cách tìm linh hoạt hơn
        const categoriesResponse = await axios.get(`${backendUrl}/api/categories`);
        
        // Tìm kiếm với nhiều khả năng hơn (không phân biệt hoa thường)
        const scholarshipCategory = categoriesResponse.data.find(
          cat => cat.name.toLowerCase().includes("học bổng") ||
                cat.name.toLowerCase().includes("hoc bong") ||
                cat.name.toLowerCase().includes("scholarship")
        );

        if (!scholarshipCategory) {
          // Nếu không tìm thấy danh mục cụ thể, thử lấy danh mục "Doanh nghiệp" chung
          const businessCategory = categoriesResponse.data.find(
            cat => cat.name.toLowerCase().includes("doanh nghiệp") ||
                  cat.name.toLowerCase().includes("business") ||
                  cat.name.toLowerCase().includes("đối tác")
          );

          if (businessCategory) {
            // Lấy tất cả bài viết về doanh nghiệp và lọc theo tiêu đề chứa "học bổng"
            const postsResponse = await axios.get(
              `${backendUrl}/api/posts/category/${businessCategory._id}`
            );
            
            const filteredPosts = postsResponse.data.filter(post => 
              post.title.toLowerCase().includes("học bổng") || 
              post.title.toLowerCase().includes("scholarship")
            );
            
            setScholarships(filteredPosts);
            setError(null);
            setLoading(false);
            return;
          } else {
            setError("Không tìm thấy danh mục học bổng doanh nghiệp");
            setLoading(false);
            return;
          }
        }

        // Lấy bài viết từ danh mục học bổng đã tìm thấy
        const postsResponse = await axios.get(
          `${backendUrl}/api/posts/category/${scholarshipCategory._id}`
        );
        
        setScholarships(postsResponse.data);
        setError(null);
      } catch (err) {
        console.error("Lỗi khi tải danh sách học bổng:", err);
        setError("Không thể tải danh sách học bổng doanh nghiệp");
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  const sidebarData = [
    { label: "Danh sách đối tác", link: "/doanh-nghiep/danh-sach-doi-tac" },
    { label: "Chương trình hợp tác", link: "/doanh-nghiep/chuong-trinh-hop-tac" },
    { label: "Học bổng doanh nghiệp", link: "/doanh-nghiep/hoc-bong-doanh-nghiep", marker: true },
  ];

  const navigationLinks = [
    { label: "Trang chủ", href: "/" },
    { label: "Doanh nghiệp", href: "/doanh-nghiep" },
    { label: "Học bổng doanh nghiệp", href: "/doanh-nghiep/hoc-bong-doanh-nghiep" },
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
            <HighlightHeader title="HỌC BỔNG DOANH NGHIỆP" />
            
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <p>Đang tải danh sách học bổng...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center py-20">
                <p className="text-red-500">{error}</p>
              </div>
            ) : scholarships.length === 0 ? (
              <div className="flex justify-center items-center py-20">
                <p>Chưa có thông tin học bổng nào</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-5">
                {scholarships.map((scholarship) => (
                  <ArticleMainPage 
                    key={scholarship._id}
                    title={scholarship.title}
                    thumbnail={scholarship.thumbnail}
                    link={`/doanh-nghiep/hoc-bong-doanh-nghiep/chi-tiet/${scholarship._id}`}
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

export default BusinessScholarship;