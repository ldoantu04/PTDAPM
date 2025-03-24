import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";
import HighlightHeader from "../layouts/HighlightHeader";
import ArticleOther from "../layouts/ArticleOther";
import Sidebar from "../layouts/Sidebar";
import SmallNavBar from "../layouts/SmallNavBar";
import { backendUrl } from "../../App";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      // Tìm danh mục "Thông báo"
      const categoriesResponse = await axios.get(`${backendUrl}/api/categories`);
      const announcementCategory = categoriesResponse.data.find(
        cat => cat.name.toLowerCase().includes("thông báo") || 
              cat.name.toLowerCase().includes("thong bao") ||
              cat.name.toLowerCase().includes("announcement")
      );

      if (!announcementCategory) {
        setError("Không tìm thấy danh mục thông báo");
        setLoading(false);
        return;
      }

      // Lấy bài viết từ danh mục thông báo
      const postsResponse = await axios.get(
        `${backendUrl}/api/posts/category/${announcementCategory._id}`
      );
      
      setAnnouncements(postsResponse.data);
      setError(null);
    } catch (err) {
      console.error("Lỗi khi tải danh sách thông báo:", err);
      setError("Không thể tải danh sách thông báo");
    } finally {
      setLoading(false);
    }
  };

  const sidebarData = [
    { label: "Thông báo chung", link: "" },
    { label: "Thông báo Đại học", link: "" },
    { label: "Thông báo Sau Đại học", link: "" },
  ];

  const sampleData = {
    navigationLinks: [
      { label: "Trang chủ", href: "/" },
      { label: "Thông báo", href: "" },
    ],
  };

  return (
    <>
      <NavBar />

      <main>
        <SmallNavBar navigationLinks={sampleData.navigationLinks} />
        <div className="flex gap-x-30">
          <div className="w-1/4">
            <Sidebar title="Thông báo" items={sidebarData} />
          </div>

          <div className="w-3/4">
            <HighlightHeader title="THÔNG BÁO" />
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <p>Đang tải danh sách thông báo...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center py-20">
                <p className="text-red-500">{error}</p>
              </div>
            ) : announcements.length === 0 ? (
              <div className="flex justify-center items-center py-20">
                <p>Chưa có thông báo nào</p>
              </div>
            ) : (
              <div className="flex flex-col gap-y-5">
                {announcements.map((announcement) => (
                  <ArticleOther 
                    key={announcement._id}
                    title={announcement.title}
                    imageUrl={announcement.thumbnail}
                    // date={announcement.updated_at || announcement.created_at}
                    // excerpt={announcement.description || announcement.detail?.substring(0, 200)}
                    // link={`/thong-bao/chi-tiet/${announcement._id}`}
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

export default Announcements;