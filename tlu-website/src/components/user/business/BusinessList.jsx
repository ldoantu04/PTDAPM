import React, { useState, useEffect } from "react";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import SmallNavBar from "../../layouts/SmallNavBar";
import Sidebar from "../../layouts/Sidebar";
import HighlightHeader from "../../layouts/HighlightHeader";
import ArticleMainPage from "../../layouts/ArticleMainPage";
import axios from "axios";
import { backendUrl } from "../../../App";

function BusinessList() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        // Tìm danh mục "Đối tác doanh nghiệp"
        const categoriesResponse = await axios.get(`${backendUrl}/api/categories`);
        const partnerCategory = categoriesResponse.data.find(
          cat => cat.name === "Đối tác doanh nghiệp" || cat.name.includes("đối tác")
        );

        if (!partnerCategory) {
          setError("Không tìm thấy danh mục đối tác doanh nghiệp");
          setLoading(false);
          return;
        }

        // Lấy bài viết từ danh mục đối tác
        const postsResponse = await axios.get(
          `${backendUrl}/api/posts/category/${partnerCategory._id}`
        );
        
        setPartners(postsResponse.data);
        setError(null);
      } catch (err) {
        console.error("Lỗi khi tải danh sách đối tác:", err);
        setError("Không thể tải danh sách đối tác");
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const sidebarData = [
    { label: "Danh sách đối tác", link: "/doanh-nghiep/danh-sach-doi-tac", marker: true },
    { label: "Chương trình hợp tác", link: "/doanh-nghiep/chuong-trinh-hop-tac" },
    { label: "Học bổng doanh nghiệp", link: "/doanh-nghiep/hoc-bong-doanh-nghiep" },
  ];

  const navigationLinks = [
    { label: "Trang chủ", href: "/" },
    { label: "Doanh nghiệp", href: "/doanh-nghiep" },
    { label: "Danh sách đối tác", href: "/doanh-nghiep/danh-sach-doi-tac" },
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
            <HighlightHeader title="DANH SÁCH ĐỐI TÁC" />
            
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <p>Đang tải danh sách đối tác...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center py-20">
                <p className="text-red-500">{error}</p>
              </div>
            ) : partners.length === 0 ? (
              <div className="flex justify-center items-center py-20">
                <p>Chưa có đối tác nào</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-5">
                {partners.map((partner) => (
                  <ArticleMainPage 
                    key={partner._id}
                    title={partner.title}
                    thumbnail={partner.thumbnail}
                    link={`/doanh-nghiep/danh-sach-doi-tac/chi-tiet/${partner._id}`}
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

export default BusinessList;