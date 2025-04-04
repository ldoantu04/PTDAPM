import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, message, Tag, Tooltip, Space, Popconfirm, Card } from "antd";
import {
  PlusOutlined,
  EyeFilled,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";
import axios from "axios";
import NavBar from "../../layouts/NavBar";
import CustomTable from "../../layouts/CustomTable";
import Footer from "../../layouts/Footer";
import { backendUrl } from "../../../App";
// Thay đổi API_BASE_URL để sử dụng MongoDB

function PostList() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState({});
  const [parentCategories, setParentCategories] = useState({});
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu khi component được render
  useEffect(() => {
    fetchData();
  }, []);

  // Lấy dữ liệu bài viết và danh mục
  const fetchData = async () => {
    setLoading(true);
    try {
      // Lấy danh sách danh mục
      const categoriesResponse = await axios.get(backendUrl + `/api/categories`);

      // Xử lý danh mục cha-con
      const catMap = {};
      const parentCatsMap = {};

      // Lưu ý: Đã thay đổi id thành _id, parentId thành parent_id để phù hợp với MongoDB
      categoriesResponse.data.forEach(({ _id, name, parent_id }) => {
        catMap[_id] = name;
        if (parent_id) parentCatsMap[_id] = parent_id;
      });

      setCategories(catMap);
      setParentCategories(parentCatsMap);

      // Lấy danh sách bài viết
      const postsResponse = await axios.get(backendUrl + `/api/posts`);

      // Sắp xếp bài viết theo thứ tự mới nhất trước (dựa vào created_at)
      const sortedPosts = [...postsResponse.data].sort((a, b) => {
        // Ưu tiên sử dụng updated_at nếu có, nếu không thì dùng created_at
        const dateA = new Date(a.updated_at || a.created_at);
        const dateB = new Date(b.updated_at || b.created_at);
        return dateB - dateA; // Sắp xếp giảm dần (mới nhất trước)
      });

      setPosts(sortedPosts);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
      message.error("Không thể tải dữ liệu bài viết!");
    } finally {
      setLoading(false);
    }
  };

  // Xóa bài viết
  const handleDelete = async (id) => {
    try {
      await axios.delete(backendUrl + `/api/posts/${id}`);
      message.success("Xóa bài viết thành công!");
      fetchData(); // Tải lại dữ liệu
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error);
      message.error("Không thể xóa bài viết này!");
    }
  };

  // Xóa nhiều bài viết cùng lúc
  const handleBulkDelete = async (selectedIds) => {
    try {
      message.loading({ content: "Đang xóa bài viết...", key: "bulkDelete" });

      // Lặp qua và xóa từng bài viết
      await Promise.all(
        selectedIds.map((id) => axios.delete(backendUrl + `/api/posts/${id}`))
      );

      message.success({
        content: `Đã xóa ${selectedIds.length} bài viết thành công!`,
        key: "bulkDelete",
      });

      fetchData(); // Tải lại dữ liệu
    } catch (error) {
      console.error("Lỗi khi xóa nhiều bài viết:", error);
      message.error({
        content: "Không thể xóa một số bài viết. Vui lòng thử lại!",
        key: "bulkDelete",
      });
    }
  };

  // Định dạng ngày tháng
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: "STT",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Ảnh",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail) => (
        <img
          src={thumbnail || "https://via.placeholder.com/80x45?text=No+Image"}
          alt="Thumbnail"
          style={{
            width: "112px",
            height: "63px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      ),
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div>
          <Tooltip title={text} mouseEnterDelay={0.5}>
            <div
              className="font-medium line-clamp-3"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxHeight: "4.5em", // Khoảng 3 dòng với line-height 1.5
              }}
            >
              {text}
            </div>
          </Tooltip>
        </div>
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "category_id", // Thay đổi từ categoryId thành category_id
      key: "category_id",
      render: (category_id) => {
        // Kiểm tra xem danh mục có phải là con không
        const isChild = parentCategories[category_id];

        if (isChild && categories[parentCategories[category_id]]) {
          // Nếu là danh mục con, hiển thị cả danh mục cha và con
          return (
            <div className="flex items-center flex-wrap gap-1">
              <Tag color="blue">
                {categories[parentCategories[category_id]]}
              </Tag>
              <span className="mx-1">›</span>
              <Tag color="cyan">{categories[category_id]}</Tag>
            </div>
          );
        }

        // Danh mục không có cha hoặc không xác định
        return (
          <Tag color="blue">{categories[category_id] || "Không xác định"}</Tag>
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at", // Thay đổi từ createdAt thành created_at
      key: "created_at",
      width: 150,
      render: (date) => formatDate(date),
    },
    {
      title: "Cập nhật",
      dataIndex: "updated_at", // Thay đổi từ updatedAt thành updated_at
      key: "updated_at",
      width: 150,
      render: (date, record) => {
        // Nếu ngày cập nhật giống ngày tạo, hiển thị "Chưa chỉnh sửa"
        if (!date || date === record.created_at) {
          return <span className="text-gray-400">Chưa chỉnh sửa</span>;
        }
        return formatDate(date);
      },
    },
    {
      title: "Hành động",
      align: "center",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="px-5">
          <Tooltip title="Chi tiết">
            <Link to={`/tro-ly-khoa/bai-viet/chi-tiet/${record._id}`}>
              {" "}
              {/* Thay đổi từ id thành _id */}
              <EyeFilled className="btn-icon !text-blue1 " />
            </Link>
          </Tooltip>

          <Tooltip title="Chỉnh sửa">
            <Link to={`/tro-ly-khoa/bai-viet/chinh-sua/${record._id}`}>
              {" "}
              {/* Thay đổi từ id thành _id */}
              <EditFilled className="btn-icon !text-orange1" />
            </Link>
          </Tooltip>

          <Tooltip title="Xóa bài viết">
            <Popconfirm
              title="Xóa bài viết"
              description="Bạn có chắc chắn muốn xóa bài viết này không?"
              onConfirm={() => handleDelete(record._id)} // Thay đổi từ id thành _id
              okText="Xóa"
              cancelText="Hủy"
              okButtonProps={{ danger: true }}
            >
              <DeleteFilled className="btn-icon !text-red2" />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <NavBar />
      <main className="admin-main space-y-13">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-blue1">Danh sách bài viết</h1>
          <Link to="/tro-ly-khoa/bai-viet/them-moi">
            <button className="btn bg-green1">
              <PlusOutlined className="mr-2" />
              Thêm bài viết mới
            </button>
          </Link>
        </div>

        {/* Danh sách bài viết */}
        <Card variant="borderless" className="shadow-sm">
          <CustomTable
            columns={columns}
            data={posts}
            loading={loading}
            rowKey="_id"
            pagination={{
              pageSize: 10,
              showTotal: (total) => `Tổng số: ${total} bài viết`,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50", "100"],
            }}
            handleBulkDelete={handleBulkDelete}
            handleRefresh={fetchData}
            emptyText="Chưa có bài viết nào"
            hideSearchBar={true} // Ẩn thanh tìm kiếm
          />
        </Card>
      </main>
      <Footer />
    </>
  );
}

export default PostList;
