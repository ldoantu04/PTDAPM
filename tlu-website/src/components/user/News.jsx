import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";
import HighlightHeader from "../layouts/HighlightHeader";
import ArticleOther from "../layouts/ArticleOther";
import Sidebar from "../layouts/Sidebar";
import SmallNavBar from "../layouts/SmallNavBar";
import { backendUrl } from "../../App";

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Tìm danh mục "Tin tức"
        const categoriesResponse = await axios.get(`${backendUrl}/api/categories`);
        const newsCategory = categoriesResponse.data.find(
          cat => cat.name.toLowerCase().includes("tin tức") || 
                cat.name.toLowerCase().includes("tin tuc") ||
                cat.name.toLowerCase().includes("news")
        );

        if (!newsCategory) {
          // Nếu không tìm thấy danh mục cụ thể, thử tìm các danh mục liên quan
          const relatedCategory = categoriesResponse.data.find(
            cat => cat.name.toLowerCase().includes("thông tin") ||
                  cat.name.toLowerCase().includes("thông báo") ||
                  cat.name.toLowerCase().includes("information")
          );

          if (relatedCategory) {
            // Lấy tất cả bài viết từ danh mục liên quan
            const postsResponse = await axios.get(
              `${backendUrl}/api/posts/category/${relatedCategory._id}`
            );
            
            // Lọc bài viết có tiêu đề hoặc nội dung liên quan đến tin tức
            const filteredPosts = postsResponse.data.filter(post => 
              post.title.toLowerCase().includes("tin") || 
              post.title.toLowerCase().includes("news") ||
              post.description?.toLowerCase().includes("tin tức")
            );
            
            setNews(filteredPosts);
            setError(null);
            setLoading(false);
            return;
          } else {
            setError("Không tìm thấy danh mục tin tức");
            setLoading(false);
            return;
          }
        }

        // Lấy bài viết từ danh mục tin tức đã tìm thấy
        const postsResponse = await axios.get(
          `${backendUrl}/api/posts/category/${newsCategory._id}`
        );
        
        setNews(postsResponse.data);
        setError(null);
      } catch (err) {
        console.error("Lỗi khi tải danh sách tin tức:", err);
        setError("Không thể tải danh sách tin tức");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const sidebarData = [
    { label: "Tin tức chung", link: "" },
    { label: "Tin đào tạo", link: "" },
    { label: "Tin KHCN & HTQT", link: "" },
    { label: "Tin công tác sinh viên", link: "" },
  ];

  const sampleData = {
    navigationLinks: [
      { label: "Trang chủ", href: "/" },
      { label: "Tin tức", href: "" },
    ],
  };

  return (
    <>
      <NavBar />

      <main>
        <SmallNavBar navigationLinks={sampleData.navigationLinks} />

        <div className="flex gap-x-30">
          <div className="w-1/4">
            <Sidebar title="Tin tức" items={sidebarData} />
          </div>

          <div className="w-3/4">
            <HighlightHeader title="TIN TỨC" />
            
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <p>Đang tải danh sách tin tức...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center py-20">
                <p className="text-red-500">{error}</p>
              </div>
            ) : news.length === 0 ? (
              <div className="flex justify-center items-center py-20">
                <p>Chưa có tin tức nào</p>
              </div>
            ) : (
              <div className="flex flex-col gap-y-5">
                {news.map((item) => (
                  <ArticleOther 
                    key={item._id}
                    title={item.title}
                    imageUrl={item.thumbnail}
                    date={item.updated_at || item.created_at}
                    excerpt={item.description || item.detail?.substring(0, 200)}
                    link={`/tin-tuc/chi-tiet/${item._id}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default News;