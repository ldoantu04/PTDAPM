import React, { useState, useEffect, useRef } from "react";
import { Button, Card, Form, Input, message, Spin, Switch } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ImageUpload from "../../layouts/ImageUpload";
import TinyEditor from "../../layouts/TinyEditor";
import SimpleSelect from "../../layouts/SimpleSelect";
import NavBar from "../../layouts/NavBar";
import Toolbar from "../../layouts/Toolbar";

const { TextArea } = Input;

// API URL
const API_BASE_URL = "https://67d464bed2c7857431ed88c2.mockapi.io";

/**
 * Form tạo mới/chỉnh sửa bài viết
 */
function PostForm({ isEditing = false }) {
  // Hooks
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const editorRef = useRef(null);

  // States - Nhóm theo chức năng
  // UI States
  const [loading, setLoading] = useState({
    initial: isEditing,
    submitting: false,
    categories: true,
  });

  // Form Data States
  const [formData, setFormData] = useState({
    imageFile: null,
    imagePreview: null,
    editorContent: "",
    featured: false,
    postData: null, // Thêm trường này để lưu dữ liệu bài viết đầy đủ
  });

  // Category States
  const [categoryData, setCategoryData] = useState({
    all: [],
    parents: [],
    children: {},
    selectedParent: null,
  });

  // Tải danh mục khi component được mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Tải dữ liệu bài viết khi đang ở chế độ chỉnh sửa
  useEffect(() => {
    if (isEditing && id) {
      fetchPostData();
    }
  }, [isEditing, id]);

  // Cập nhật form khi danh mục và bài viết đã được tải
  useEffect(() => {
    if (formData.postData && !loading.categories && isEditing) {
      updateFormWithPostData();
    }
  }, [formData.postData, loading.categories, categoryData.all, isEditing]);

  /**
   * Tải danh sách danh mục
   */
  const fetchCategories = async () => {
    try {
      setLoading((prev) => ({ ...prev, categories: true }));

      const response = await axios.get(`${API_BASE_URL}/categories`);
      const categoriesData = response.data;

      // Phân loại danh mục
      const parents = categoriesData.filter((cat) => !cat.parentID);

      // Xây dựng map danh mục cha -> danh mục con
      const childrenMap = {};
      categoriesData
        .filter((cat) => cat.parentID)
        .forEach((cat) => {
          if (!childrenMap[cat.parentID]) {
            childrenMap[cat.parentID] = [];
          }
          childrenMap[cat.parentID].push(cat);
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

  /**
   * Tải dữ liệu bài viết
   */
  const fetchPostData = async () => {
    try {
      setLoading((prev) => ({ ...prev, initial: true }));

      const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
      const postData = response.data;

      // Kiểm tra dữ liệu trước khi cập nhật state
      if (postData) {
        setFormData((prev) => ({
          ...prev,
          postData: postData,
          imagePreview: postData.imageUrl || null,
          editorContent: postData.content || "",
          featured: postData.featured || false,
        }));
      }
    } catch (error) {
      console.error("Lỗi khi tải bài viết:", error);
      message.error("Không thể tải thông tin bài viết!");
      navigate("/admin/bai-viet");
    } finally {
      setLoading((prev) => ({ ...prev, initial: false }));
    }
  };

  /**
   * Cập nhật form với dữ liệu bài viết
   */
  const updateFormWithPostData = () => {
    try {
      const post = formData.postData;
      if (!post) return;

      // Thiết lập tiêu đề
      form.setFieldsValue({
        title: post.title || "",
        featured: post.featured || false,
      });

      // Xử lý danh mục
      const categoryId = post.categoryId;
      if (categoryId && categoryData.all.length > 0) {
        const category = categoryData.all.find((c) => c.id === categoryId);

        if (category) {
          if (category.parentID) {
            // Danh mục con
            setCategoryData((prev) => ({
              ...prev,
              selectedParent: category.parentID,
            }));

            // Thiết lập giá trị sau khi state đã cập nhật
            setTimeout(() => {
              form.setFieldsValue({
                parentCategoryId: category.parentID,
                categoryId: categoryId,
              });
            }, 0);
          } else {
            // Danh mục cha
            setCategoryData((prev) => ({
              ...prev,
              selectedParent: category.id,
            }));

            setTimeout(() => {
              form.setFieldsValue({
                parentCategoryId: category.id,
                categoryId: category.id,
              });
            }, 0);
          }
        }
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật form:", error);
    }
  };

  /**
   * Xử lý khi chọn danh mục cha
   */
  const handleParentCategoryChange = (value) => {
    try {
      setCategoryData((prev) => ({ ...prev, selectedParent: value }));

      // Kiểm tra xem danh mục cha này có danh mục con không
      const hasChildren = categoryData.children[value]?.length > 0;

      if (hasChildren) {
        // Nếu có danh mục con, reset trường categoryId để người dùng phải chọn lại
        form.setFieldsValue({ categoryId: undefined });
      } else {
        // Nếu không có danh mục con, tự động chọn danh mục cha làm danh mục của bài viết
        form.setFieldsValue({ categoryId: value });
      }
    } catch (error) {
      console.error("Lỗi khi thay đổi danh mục cha:", error);
    }
  };

  /**
   * Xử lý khi thay đổi ảnh đại diện
   */
  const handleImageChange = (file, preview) => {
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: preview,
    }));
  };

  /**
   * Xử lý khi thay đổi nội dung editor
   */
  const handleEditorChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      editorContent: content,
    }));
  };

  /**
   * Xử lý khi thay đổi trạng thái nổi bật
   */
  const handleFeaturedChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      featured: checked,
    }));
  };

  /**
   * Upload ảnh đại diện lên Cloudinary
   */
  const uploadFeatureImage = async () => {
    // Nếu đang chỉnh sửa và không thay đổi ảnh đại diện
    if (isEditing && !formData.imageFile && formData.imagePreview) {
      return formData.imagePreview;
    }

    if (!formData.imageFile) {
      throw new Error("Vui lòng chọn ảnh đại diện cho bài viết!");
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append("file", formData.imageFile);
      formDataObj.append("upload_preset", "Images");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/doquocviet/image/upload",
        formDataObj
      );

      return response.data.secure_url;
    } catch (error) {
      console.error("Lỗi khi upload ảnh đại diện:", error);
      throw new Error("Không thể tải lên ảnh đại diện. Vui lòng thử lại!");
    }
  };

  /**
   * Xử lý khi submit form
   */
  const handleSubmit = async (values) => {
    // Kiểm tra điều kiện bắt buộc
    if (!formData.imageFile && !formData.imagePreview) {
      message.warning("Vui lòng chọn ảnh đại diện cho bài viết!");
      return;
    }

    if (!formData.editorContent || formData.editorContent === "<p></p>") {
      message.warning("Vui lòng nhập nội dung bài viết!");
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, submitting: true }));
      message.loading({
        content: "Đang xử lý bài viết...",
        key: "postSubmit",
        duration: 0,
      });

      // 1. Upload ảnh đại diện
      const featureImageUrl = await uploadFeatureImage();

      // 2. Xử lý ảnh trong nội dung (nếu có)
      let processedContent = formData.editorContent;

      if (editorRef.current?.hasBase64Images) {
        const hasBase64Images = editorRef.current.hasBase64Images();

        if (hasBase64Images) {
          const imageCount = editorRef.current.countBase64Images();
          message.loading({
            content: `Đang xử lý ${imageCount} ảnh trong bài viết...`,
            key: "postSubmit",
            duration: 0,
          });

          processedContent = await editorRef.current.processContent();
        }
      }

      // 3. Chuẩn bị dữ liệu bài viết
      const currentDate = new Date().toISOString();
      const postPayload = {
        title: values.title,
        categoryId: values.categoryId,
        content: processedContent,
        imageUrl: featureImageUrl,
        featured: formData.featured,
        updatedAt: currentDate,
      };

      // Thêm trường createdAt nếu là bài viết mới
      if (!isEditing) {
        postPayload.createdAt = currentDate;
      }

      // 4. Gọi API để tạo mới hoặc cập nhật bài viết
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/posts/${id}`, postPayload);
        message.success({
          content: "Cập nhật bài viết thành công!",
          key: "postSubmit",
        });
      } else {
        await axios.post(`${API_BASE_URL}/posts`, postPayload);
        message.success({
          content: "Tạo bài viết mới thành công!",
          key: "postSubmit",
        });

        // Reset form sau khi tạo mới
        resetForm();
      }

      // 5. Điều hướng về trang danh sách bài viết
      navigate("/admin/bai-viet");
    } catch (error) {
      console.error("Lỗi khi xử lý bài viết:", error);
      message.error({
        content: error.message || "Có lỗi xảy ra khi xử lý bài viết!",
        key: "postSubmit",
      });
    } finally {
      setLoading((prev) => ({ ...prev, submitting: false }));
    }
  };

  /**
   * Reset form và trạng thái
   */
  const resetForm = () => {
    form.resetFields();
    setFormData({
      imageFile: null,
      imagePreview: null,
      editorContent: "",
      featured: false,
      postData: null,
    });
    setCategoryData((prev) => ({
      ...prev,
      selectedParent: null,
    }));
    if (editorRef.current && editorRef.current.setContent) {
      editorRef.current.setContent("");
    }
  };

  // Format options cho SimpleSelect
  const parentCategoryOptions = categoryData.parents.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  // Lấy danh mục con dựa trên danh mục cha đã chọn
  const getChildCategoryOptions = () => {
    if (!categoryData.selectedParent) return [];

    const children = categoryData.children[categoryData.selectedParent] || [];

    if (children.length === 0) {
      // Nếu không có danh mục con, hiển thị danh mục cha
      const parent = categoryData.parents.find(
        (cat) => cat.id === categoryData.selectedParent
      );
      return parent ? [{ value: parent.id, label: parent.name }] : [];
    }

    return children.map((child) => ({
      value: child.id,
      label: child.name,
    }));
  };

  // Kiểm tra xem danh mục đã chọn có danh mục con không
  const selectedParentHasChildren =
    categoryData.selectedParent &&
    categoryData.children[categoryData.selectedParent]?.length > 0;

  // Loading screen khi tải dữ liệu
  if (loading.initial) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <Toolbar />
      <main className="admin-main space-y-6">
        <div className="flex justify-between items-center h-11">
          <h1 className="text-3xl font-bold text-blue1">
            {isEditing ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
          </h1>
          <Link to="/admin/bai-viet">
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
            {/* Ảnh đại diện */}
            <div className="flex gap-x-12 max-h-[290px]">
              <div className="flex flex-col gap-y-2.5 w-full">
                <label className="font-medium">
                  Ảnh đại diện
                  <span className="text-gray-500 text-sm font-normal ml-2">
                    (khuyến nghị tỷ lệ 16:9)
                  </span>
                </label>

                <ImageUpload
                  onImageChange={handleImageChange}
                  initialImage={formData.imagePreview}
                />
              </div>
              <div className="flex flex-col gap-y-7 w-full h-fit">
                {/* Tiêu đề - đã đổi thành TextArea */}
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

                {/* Danh mục lớn */}
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

                {/* Danh mục con */}
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

            {/* Đánh dấu bài nổi bật */}
            <Form.Item
              label="Bài viết nổi bật"
              name="featured"
              valuePropName="checked"
            >
              <Switch
                checked={formData.featured}
                onChange={handleFeaturedChange}
              />
            </Form.Item>

            {/* TinyEditor */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">Nội dung bài viết</h3>
              <TinyEditor
                ref={editorRef}
                value={formData.editorContent}
                onChange={handleEditorChange}
                height={600}
                cloudName="doquocviet"
                uploadPreset="Images"
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
    </>
  );
}

export default PostForm;
