import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Card, Tag, Popconfirm, message, Spin } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
  StarFilled,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import axios from "axios";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import { backendUrl } from "../../../App";
// Thay đổi API_BASE_URL để sử dụng MongoDB

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState({});
  const [parentCategories, setParentCategories] = useState({});

  useEffect(() => {
    if (id) {
      fetchPostData();
    }
  }, [id]);

  const fetchPostData = async () => {
    try {
      setLoading(true);

      // Lấy danh sách danh mục
      const categoriesResponse = await axios.get(backendUrl + `/api/categories`);
      const catMap = {};
      const parentCatsMap = {};

      categoriesResponse.data.forEach((cat) => {
        catMap[cat._id] = cat.name;
        if (cat.parent_id) {
          parentCatsMap[cat._id] = cat.parent_id;
        }
      });

      setCategories(catMap);
      setParentCategories(parentCatsMap);

      // Lấy chi tiết bài viết
      const response = await axios.get(backendUrl + `/api/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error("Lỗi khi tải chi tiết bài viết:", error);
      message.error("Không thể tải thông tin chi tiết bài viết!");
      navigate("/tro-ly-khoa/bai-viet");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(backendUrl + `/api/posts/${id}`);
      message.success("Xóa bài viết thành công!");
      navigate("/tro-ly-khoa/bai-viet");
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error);
      message.error("Không thể xóa bài viết này!");
    }
  };

  // const toggleFeatured = async () => {
  //   if (!post) return;

  //   try {
  //     const updatedPost = { ...post, featured: !post.featured };
  //     await axios.put(`${API_BASE_URL}/posts/${id}`, updatedPost);

  //     setPost(updatedPost);

  //     message.success(
  //       `Bài viết đã được ${
  //         !post.featured ? "đánh dấu" : "bỏ đánh dấu"
  //       } nổi bật!`
  //     );
  //   } catch (error) {
  //     console.error("Lỗi khi cập nhật trạng thái nổi bật:", error);
  //     message.error("Không thể cập nhật trạng thái bài viết!");
  //   }
  // };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    // Định dạng ngày
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    // Định dạng giờ
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} | ${hours}:${minutes}:${seconds}`;
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <main className="admin-main">
          <div className="flex justify-center items-center h-64">
            <Spin size="large" tip="Đang tải dữ liệu..." />
          </div>
        </main>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <NavBar />
        <main className="admin-main">
          <div className="text-center py-10">
            <h2 className="text-xl font-medium text-red-500 mb-2">
              Không tìm thấy bài viết
            </h2>
            <p className="mb-4">Bài viết không tồn tại hoặc đã bị xóa</p>
            <Link to="/tro-ly-khoa/bai-viet">
              <Button type="primary">Quay lại danh sách</Button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <main className="admin-main space-y-13">
        <div className="flex justify-between items-center h-11">
          <h1 className="text-4xl font-bold text-blue1">Chi tiết bài viết</h1>
          <Link to="/tro-ly-khoa/bai-viet">
            <Button type="default" className="flex items-center gap-2">
              <ArrowLeftOutlined />
              <span>Quay lại</span>
            </Button>
          </Link>
        </div>

        {/* Layout mới với sidebar cố định bên trái */}
        <div className="flex gap-30">
          {/* Sidebar cố định với thông tin và ảnh - 1/4 màn hình */}
          <div className="w-1/4 sticky top-6 self-start flex flex-col gap-6">
            {/* Thông tin chung */}
            <Card
              className="shadow-sm"
              title={
                <div className="font-semibold text-lg">Thông tin chung</div>
              }
            >
              {/* Ảnh đại diện */}
              <div className="space-y-6">
                <div>
                  <h4>Ảnh đại diện</h4>
                  {post.thumbnail ? (
                    <div className="overflow-hidden rounded-md border border-gray-100 flex items-center justify-center">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="max-w-full object-contain"
                        style={{ maxHeight: "350px" }}
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-100 h-40 flex items-center justify-center text-gray-500 rounded">
                      Không có ảnh đại diện
                    </div>
                  )}
                </div>
                {/* Danh mục */}
                <div>
                  <h4>Danh mục</h4>
                  {(() => {
                    const categoryId = post.category_id;
                    const isChild = parentCategories[categoryId];

                    if (isChild && categories[parentCategories[categoryId]]) {
                      return (
                        <div className="flex items-center flex-wrap gap-1">
                          <Tag color="blue">
                            {categories[parentCategories[categoryId]]}
                          </Tag>
                          <span className="mx-1">›</span>
                          <Tag color="cyan">{categories[categoryId]}</Tag>
                        </div>
                      );
                    }

                    return (
                      <Tag color="blue">
                        {categories[categoryId] || "Không xác định"}
                      </Tag>
                    );
                  })()}
                </div>

                {/* Thời gian */}
                <div>
                  <h4>Ngày tạo</h4>
                  <p className="text-gray-600">{formatDate(post.created_at)}</p>
                </div>

                <div>
                  <h4>Cập nhật lần cuối</h4>
                  {post.updated_at && post.updated_at !== post.created_at ? (
                    <p className="text-gray-600">
                      {formatDate(post.updated_at)}
                    </p>
                  ) : (
                    <p className="text-gray-400">Chưa chỉnh sửa</p>
                  )}
                </div>

                {/* Trạng thái nổi bật */}
                {/* <div>
                  <h4>Trạng thái</h4>
                  <div className="flex items-center gap-2">
                    <Button
                      type="text"
                      icon={
                        post.featured ? (
                          <StarFilled style={{ color: "#faad14" }} />
                        ) : (
                          <StarOutlined />
                        )
                      }
                      onClick={toggleFeatured}
                    >
                      {post.featured ? "Nổi bật" : "Thường"}
                    </Button>
                  </div>
                </div> */}

                {/* Hành động */}
                <div className="flex flex-col gap-3 mt-5 pt-4 border-t border-gray2">
                  <Link
                    to={`/tro-ly-khoa/bai-viet/chinh-sua/${id}`}
                    className="block"
                  >
                    <Button type="primary" icon={<EditOutlined />} block>
                      Chỉnh sửa bài viết
                    </Button>
                  </Link>

                  <Popconfirm
                    title="Xóa bài viết"
                    description="Bạn có chắc chắn muốn xóa bài viết này không?"
                    onConfirm={handleDelete}
                    okText="Xóa"
                    cancelText="Hủy"
                    okButtonProps={{ danger: true }}
                  >
                    <Button danger icon={<DeleteOutlined />} block>
                      Xóa bài viết
                    </Button>
                  </Popconfirm>
                  <Link to="/tro-ly-khoa/bai-viet" className="block">
                    <Button
                      type="default"
                      className="flex items-center gap-2"
                      block
                    >
                      <ArrowLeftOutlined />
                      <span>Quay lại</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          {/* Phần hiển thị nội dung bài viết bên phải - 3/4 màn hình */}
          <div className="w-3/4">
            <div className="mb-10">
              <h1 className="text-3xl font-bold mb-5 text-blue1">
                {post.title}
              </h1>

              {/* Thêm thông tin thời gian cập nhật dưới tiêu đề */}
              <div className="text-sm text-gray3 flex items-center gap-1">
                {post.updated_at && post.updated_at !== post.created_at ? (
                  <span>{formatDate(post.updated_at)}</span>
                ) : (
                  <span>{formatDate(post.created_at)}</span>
                )}
              </div>
            </div>

            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: post.detail || "<p>Không có nội dung</p>",
                }}
                className="prose max-w-none"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PostDetail;
