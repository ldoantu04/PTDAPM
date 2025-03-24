import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Card, Switch } from "antd";
import axios from "axios";
import TinyEditor from "../../layouts/TinyEditor";
import NavBar from "../../layouts/NavBar";
import Footer from "../../layouts/Footer";
import ImageUpload from "../../layouts/ImageUpload";
import SimpleSelect from "../../layouts/SimpleSelect";
import { backendUrl } from "../../../App";
const { TextArea } = Input;
// Thay đổi API_BASE_URL từ mockapi thành MongoDB

function PostForm({ isEditing = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const editorRef = useRef(null);

  // States
  const [formData, setFormData] = useState({
    postData: null,
    editorContent: "",
    imagePreview: null,
    featureImageFile: null,
  });

  const [categoryData, setCategoryData] = useState({
    all: [],
    parents: [],
    children: {},
    selectedParent: null,
  });

  const [loading, setLoading] = useState({
    post: false,
    categories: false,
    submitting: false,
  });

  useEffect(() => {
    // Đầu tiên, tải danh mục
    fetchCategories();

    // Nếu đang chỉnh sửa, tải dữ liệu bài viết
    if (isEditing && id) {
      fetchPostData(id);
    }
  }, [isEditing, id]);

  // Cập nhật form khi dữ liệu bài viết và danh mục đã tải xong
  useEffect(() => {
    if (formData.postData && categoryData.all.length > 0) {
      updateFormWithPostData();
    }
  }, [formData.postData, categoryData.all]);

  // Tải dữ liệu bài viết cần chỉnh sửa
  const fetchPostData = async (postId) => {
    try {
      setLoading((prev) => ({ ...prev, post: true }));

      // Thay đổi để sử dụng MongoDB API
      const response = await axios.get(backendUrl + `/api/posts/${postId}`);
      const postData = response.data;

      // Cập nhật state với dữ liệu bài viết
      setFormData((prev) => ({
        ...prev,
        postData: postData,
        imagePreview: postData.thumbnail || null,
        // Thay đổi từ content thành detail để phù hợp với MongoDB schema
        editorContent: postData.detail || "",
      }));
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu bài viết:", error);
      message.error("Không thể tải dữ liệu bài viết!");
    } finally {
      setLoading((prev) => ({ ...prev, post: false }));
    }
  };

  // Tải danh sách danh mục
  const fetchCategories = async () => {
    try {
      setLoading((prev) => ({ ...prev, categories: true }));

      // Thay đổi để sử dụng MongoDB API
      const response = await axios.get(backendUrl + `/api/categories`);
      const categoriesData = response.data;

      // Phân loại danh mục - thay đổi parentId thành parent_id để phù hợp với MongoDB schema
      const parents = categoriesData.filter((cat) => !cat.parent_id);

      // Xây dựng map danh mục cha -> danh mục con
      const childrenMap = {};
      categoriesData
        .filter((cat) => cat.parent_id)
        .forEach((cat) => {
          if (!childrenMap[cat.parent_id]) {
            childrenMap[cat.parent_id] = [];
          }
          childrenMap[cat.parent_id].push(cat);
        });

      setCategoryData({
        all: categoriesData,
        parents: parents,
        children: childrenMap,
        selectedParent: null,
      });
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
      message.error("Không thể tải danh sách danh mục!");
    } finally {
      setLoading((prev) => ({ ...prev, categories: false }));
    }
  };

  // Cập nhật form với dữ liệu bài viết
  const updateFormWithPostData = () => {
    try {
      const post = formData.postData;
      if (!post) return;

      // Thiết lập tiêu đề và các trường khác
      form.setFieldsValue({
        title: post.title || "",
      });

      // Xử lý danh mục - thay đổi categoryId thành category_id để phù hợp với MongoDB schema
      const categoryId = post.category_id;
      if (categoryId && categoryData.all.length > 0) {
        // Tìm danh mục theo _id thay vì id
        const category = categoryData.all.find((c) => c._id === categoryId);

        if (category) {
          if (category.parent_id) {
            // Danh mục con
            setCategoryData((prev) => ({
              ...prev,
              selectedParent: category.parent_id,
            }));

            // Thiết lập giá trị sau khi state đã cập nhật
            setTimeout(() => {
              form.setFieldsValue({
                parentCategoryId: category.parent_id,
                categoryId: categoryId,
              });
            }, 0);
          } else {
            // Danh mục cha
            setCategoryData((prev) => ({
              ...prev,
              selectedParent: category._id,
            }));

            setTimeout(() => {
              form.setFieldsValue({
                parentCategoryId: category._id,
                categoryId: category._id,
              });
            }, 0);
          }
        }
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật form:", error);
    }
  };

  // Xử lý khi chọn danh mục cha
  const handleParentCategoryChange = (value) => {
    setCategoryData((prev) => ({ ...prev, selectedParent: value }));

    // Nếu danh mục cha không có con, tự động chọn nó làm danh mục chi tiết
    if (
      !categoryData.children[value] ||
      categoryData.children[value].length === 0
    ) {
      form.setFieldsValue({ categoryId: value });
    } else {
      // Nếu có danh mục con, reset trường categoryId
      form.setFieldsValue({ categoryId: undefined });
    }
  };

  // Tạo options cho select danh mục cha
  const parentCategoryOptions = categoryData.parents.map((cat) => ({
    // Thay đổi id thành _id để phù hợp với MongoDB
    value: cat._id,
    label: cat.name,
  }));

  // Tạo options cho select danh mục con
  const getChildCategoryOptions = () => {
    const parentId = categoryData.selectedParent;
    if (!parentId) return [];

    // Nếu danh mục cha không có con, trả về danh mục cha đó
    if (
      !categoryData.children[parentId] ||
      categoryData.children[parentId].length === 0
    ) {
      // Thay đổi id thành _id để phù hợp với MongoDB
      const parent = categoryData.all.find((cat) => cat._id === parentId);
      return parent
        ? [{ value: parent._id, label: `Sử dụng "${parent.name}"` }]
        : [];
    }

    // Trả về danh sách các danh mục con
    return categoryData.children[parentId].map((cat) => ({
      // Thay đổi id thành _id để phù hợp với MongoDB
      value: cat._id,
      label: cat.name,
    }));
  };

  // Kiểm tra danh mục cha đã chọn có con không
  const selectedParentHasChildren =
    categoryData.selectedParent &&
    categoryData.children[categoryData.selectedParent] &&
    categoryData.children[categoryData.selectedParent].length > 0;

  // Xử lý khi nội dung editor thay đổi
  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, editorContent: content }));
  };

  // Xử lý khi chọn ảnh đại diện
  const handleImageChange = (file, url) => {
    setFormData((prev) => ({
      ...prev,
      featureImageFile: file,
      imagePreview: url,
    }));
  };

  // Upload ảnh đại diện lên Cloudinary
  const uploadFeatureImage = async () => {
    if (!formData.featureImageFile && !formData.imagePreview) {
      return null;
    }

    // Nếu không có file mới và đang chỉnh sửa, giữ nguyên ảnh cũ
    if (!formData.featureImageFile && formData.imagePreview && isEditing) {
      return formData.imagePreview;
    }

    // Nếu không có file mới, trả về null
    if (!formData.featureImageFile) {
      return null;
    }

    try {
      // Tạo FormData để upload lên Cloudinary
      const formDataObj = new FormData();
      formDataObj.append("file", formData.featureImageFile);
      formDataObj.append("upload_preset", "Images");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/doquocviet/image/upload",
        formDataObj
      );

      return response.data.secure_url;
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
      message.error("Không thể upload ảnh đại diện!");
      return null;
    }
  };

  // Xử lý khi submit form
  const handleSubmit = async (values) => {
    setLoading((prev) => ({ ...prev, submitting: true }));
    try {
      // Lấy nội dung từ editor
      const content = editorRef.current?.getContent();
      if (!content || content.trim() === "") {
        message.error("Vui lòng nhập nội dung bài viết!");
        setLoading((prev) => ({ ...prev, submitting: false }));
        return;
      }

      // Xử lý ảnh đại diện (nếu có)
      const featureImageUrl = await uploadFeatureImage();

      // Chuẩn bị mô tả (description) từ nội dung
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = content;
      const plainText = tempDiv.textContent || tempDiv.innerText || "";
      const description = plainText.substring(0, 200); // Lấy 200 ký tự đầu tiên

      // Tạo clean HTML content để lưu
      const processedContent = content;

      // Lấy thời gian hiện tại
      const currentDate = new Date();

      // Tạo payload để gửi lên server - thay đổi để phù hợp với MongoDB schema
      const postPayload = {
        title: values.title,
        category_id: values.categoryId,
        detail: processedContent, // Thay đổi từ content thành detail
        description: description,
        thumbnail: featureImageUrl,
        updated_at: currentDate, // Thay đổi từ updatedAt thành updated_at
        account_id: "67d44e69aaa3d0006967b524", // Thêm account_id (có thể lấy từ session hoặc giá trị mặc định)
      };

      // Nếu là bài viết mới, thêm created_at
      if (!isEditing) {
        postPayload.created_at = currentDate; // Thay đổi từ createdAt thành created_at
      }

      // Gửi request lên server
      if (isEditing) {
        // Cập nhật bài viết
        await axios.put(backendUrl + `/api/posts/${id}`, postPayload);
        message.success("Cập nhật bài viết thành công!");
      } else {
        // Tạo bài viết mới
        await axios.post(backendUrl + `/api/posts`, postPayload);
        message.success("Tạo bài viết mới thành công!");
        form.resetFields();
        setFormData({
          postData: null,
          editorContent: "",
          imagePreview: null,
          featureImageFile: null,
        });
      }

      // Chuyển hướng về trang danh sách bài viết
      navigate("/tro-ly-khoa/bai-viet");
    } catch (error) {
      console.error("Lỗi khi lưu bài viết:", error);
      message.error("Không thể lưu bài viết!");
    } finally {
      setLoading((prev) => ({ ...prev, submitting: false }));
    }
  };

  return (
    <>
      <NavBar />
      <main className="admin-main space-y-6">
        <div className="flex justify-between items-center h-11">
          <h1 className="text-4xl font-bold text-blue1">
            {isEditing ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
          </h1>
          <Link to="/tro-ly-khoa/bai-viet">
            <Button type="default" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="stroke-current"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M20 12H4m0 0l6-6m-6 6l6 6"
                />
              </svg>
              <span>Quay lại</span>
            </Button>
          </Link>
        </div>

        <Card variant="borderless" className="shadow-sm">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
            className="space-y-4"
          >
            <div className="flex gap-x-12 max-h-[290px]">
              <div className="flex flex-col w-full">
                <h4>
                  Ảnh đại diện
                  <span className="text-gray-500 text-sm font-normal ml-2">
                    (khuyến nghị tỷ lệ 16:9)
                  </span>
                </h4>

                <ImageUpload
                  onImageChange={handleImageChange}
                  initialImage={formData.imagePreview}
                />
              </div>
              <div className="flex flex-col gap-y-7 w-full h-fit">
                <Form.Item
                  label={
                    <span>
                      Tiêu đề bài viết
                      <span className="text-red-500"> *</span>
                    </span>
                  }
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tiêu đề bài viết!",
                    },
                    { max: 300, message: "Tiêu đề không quá 300 từ!" },
                  ]}
                  className="!mb-0"
                >
                  <TextArea
                    rows={3}
                    placeholder="Nhập tiêu đề bài viết"
                    showCount
                    maxLength={300}
                  />
                </Form.Item>

                <Form.Item
                  label="Danh mục lớn"
                  name="parentCategoryId"
                  rules={[
                    { required: true, message: "Vui lòng chọn danh mục lớn!" },
                  ]}
                  className="!mb-0"
                >
                  <SimpleSelect
                    options={parentCategoryOptions}
                    placeholder={
                      loading.categories
                        ? "Đang tải danh mục..."
                        : "Chọn danh mục lớn"
                    }
                    onChange={handleParentCategoryChange}
                    loading={loading.categories}
                    disabled={loading.categories}
                  />
                </Form.Item>

                <Form.Item
                  label="Danh mục chi tiết"
                  name="categoryId"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn danh mục chi tiết!",
                    },
                  ]}
                  className="!mb-0"
                >
                  <SimpleSelect
                    options={getChildCategoryOptions()}
                    placeholder={
                      !categoryData.selectedParent
                        ? "Vui lòng chọn danh mục lớn trước"
                        : selectedParentHasChildren
                        ? "Chọn danh mục chi tiết"
                        : "Sử dụng danh mục lớn này"
                    }
                    disabled={
                      !categoryData.selectedParent || loading.categories
                    }
                    loading={loading.categories}
                  />
                </Form.Item>
              </div>
            </div>

            {/* TinyEditor */}
            <div className="mb-6">
              <h4>Nội dung bài viết</h4>
              <TinyEditor
                ref={editorRef}
                value={formData.editorContent}
                onChange={handleEditorChange}
                height={600}
                cloudName={import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}
                uploadPreset={import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}
                apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              />
            </div>

            {/* Submit Button */}
            <Form.Item className="flex justify-end">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading.submitting}
                className="px-8 py-2 h-auto"
              >
                {isEditing ? "Cập nhật bài viết" : "Đăng bài viết"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </main>
      <Footer />
    </>
  );
}

export default PostForm;
