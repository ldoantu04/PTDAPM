import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Spin, message } from "antd";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import SmallNavBar from "../../layouts/SmallNavBar";
import Sidebar from "../../layouts/Sidebar";
import { backendUrl } from "../../../App";

function AdmissionPost() {
  const { id } = useParams(); // Lấy ID bài viết từ URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  // Danh sách menu tuyển sinh
  const menuItems = [
    { label: "Tuyển sinh Đại học", link: "/tuyen-sinh/dai-hoc" },
    { label: "Tuyển sinh Thạc sĩ", link: "/tuyen-sinh/thac-si" },
    { label: "Tuyển sinh Tiến sĩ", link: "/tuyen-sinh/tien-si" },
  ];

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendUrl}/api/posts/${id}`);
        setPost(response.data);
        
        // Lấy danh sách danh mục để hiển thị breadcrumb
        const categoriesResponse = await axios.get(`${backendUrl}/api/categories`);
        setCategories(categoriesResponse.data);
        
        setError(null);
      } catch (err) {
        console.error("Lỗi khi tải bài viết:", err);
        setError("Không thể tải bài viết");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  // Tạo breadcrumb dựa trên thông tin bài viết và danh mục
  const getBreadcrumbLinks = () => {
    const links = [
      { label: "Trang chủ", href: "/" },
      { label: "Tuyển sinh", href: "/tuyen-sinh" },
    ];
    
    if (post && categories.length > 0) {
      // Tìm danh mục của bài viết
      const category = categories.find(cat => cat._id === post.category_id);
      if (category) {
        // Nếu là danh mục con
        if (category.parent_id) {
          const parentCategory = categories.find(cat => cat._id === category.parent_id);
          if (parentCategory) {
            // Xác định loại tuyển sinh để thêm vào breadcrumb
            let type = "";
            if (parentCategory.name.includes("Đại học")) type = "dai-hoc";
            else if (parentCategory.name.includes("Thạc sĩ")) type = "thac-si";
            else if (parentCategory.name.includes("Tiến sĩ")) type = "tien-si";
            
            links.push({ 
              label: parentCategory.name, 
              href: `/tuyen-sinh/${type}`
            });
          }
          
          links.push({ 
            label: category.name, 
            href: `/tuyen-sinh/${category._id}` 
          });
        } else {
          // Nếu là danh mục chính
          let type = "";
          if (category.name.includes("Đại học")) type = "dai-hoc";
          else if (category.name.includes("Thạc sĩ")) type = "thac-si";
          else if (category.name.includes("Tiến sĩ")) type = "tien-si";
          
          links.push({ 
            label: category.name, 
            href: `/tuyen-sinh/${type}`
          });
        }
      }
    }
    
    // Thêm tiêu đề bài viết vào breadcrumb
    if (post) {
      links.push({ label: post.title, href: "" });
    }
    
    return links;
  };

  // Định dạng ngày tháng
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="mt-[120px] flex justify-center items-center min-h-[50vh]">
          <Spin size="large" tip="Đang tải bài viết..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="mt-[120px] flex justify-center items-center flex-col min-h-[50vh]">
          <p className="text-red-500 text-lg">{error}</p>
          <Link to="/tuyen-sinh" className="mt-4 text-blue-500 hover:underline">
            Quay lại trang tuyển sinh
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="mt-[120px] flex justify-center items-center flex-col min-h-[50vh]">
          <p className="text-gray-500 text-lg">Không tìm thấy bài viết</p>
          <Link to="/tuyen-sinh" className="mt-4 text-blue-500 hover:underline">
            Quay lại trang tuyển sinh
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <NavBar />

      <main>
        <SmallNavBar navigationLinks={getBreadcrumbLinks()} />

        <div className="flex gap-x-30">
          <div className="w-1/4">
            <Sidebar title="Tuyển sinh" items={menuItems} />
          </div>

          <div className="w-3/4 pb-20">
            {/* Tiêu đề bài viết */}
            <h1 className="text-[#192E58] font-bold text-3xl">
              {post.title}
            </h1>
            
            {/* Ngày đăng/cập nhật */}
            <p className="text-[#000000] opacity-60 text-sm pt-3 mb-6">
              Cập nhật: {formatDate(post.updated_at)}
            </p>
            
            {/* Nội dung bài viết */}
            <div className="post-content prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.detail }} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AdmissionPost;