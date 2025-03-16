import React, { useState, useEffect } from "react";
import { Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// Hàm chuyển file ảnh sang Base64
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImageUpload = ({ onImageChange, initialImage = null }) => {
  // const [messageApi, contextHolder] = message.useMessage();
  const [fileList, setFileList] = useState([]);

  // Khởi tạo fileList từ initialImage
  useEffect(() => {
    if (initialImage) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: initialImage,
          thumbUrl: initialImage,
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [initialImage]);

  // Xử lý khi upload file
  const handleChange = async ({ file, fileList: newFileList }) => {
    // Cập nhật danh sách file
    setFileList(newFileList);

    // Xử lý khi file được tải lên hoàn tất
    if (file.status === "done" && file.originFileObj) {
      try {
        const preview = await getBase64(file.originFileObj);
        onImageChange?.(file.originFileObj, preview);
      } catch (error) {
        console.error("Error generating preview:", error);
      }
    }
    // Xử lý khi file bị xóa
    else if (file.status === "removed") {
      onImageChange?.(null, null);
    }
  };

  // Kiểm tra định dạng file
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      messageApi.error("Chỉ được phép upload file ảnh!");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  // Tùy chỉnh request upload
  const customRequest = ({ onSuccess }) => {
    setTimeout(() => onSuccess("ok"), 800);
  };

  return (
    <div className="flex-grow w-full min-h-0">
      {/* {contextHolder} */}

      <Upload
        listType="picture-card"
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={customRequest}
        maxCount={1}
        accept="image/*"
        showUploadList={{
          showPreviewIcon: false,
          showRemoveIcon: true,
          showDownloadIcon: false,
        }}
        className="!w-full !h-full"
      >
        {fileList.length >= 1 ? null : (
          <div className="flex flex-col items-center justify-center">
            <PlusOutlined />
            <div className="mt-2">Tải lên</div>
          </div>
        )}
      </Upload>

      {/* Style tối giản */}
      <style jsx global>{`
        /* ✅ Đảm bảo khung upload full size */
        .ant-upload-list-picture-card,
        .ant-upload.ant-upload-select,
        .ant-upload-list-picture-card-container,
        .ant-upload-list-item-container {
          width: 100% !important;
          height: 100% !important;
        }

        // /* ✅ Làm ảnh lấp đầy khung upload */
        // .ant-upload-list-picture-card .ant-upload-list-item {
        //   width: 100% !important;
        //   height: 100% !important;
        //   overflow: hidden;
        // }

        // /* ✅ Ảnh trong danh sách không bị bóp méo */
        // .ant-upload-list-item img {
        //   width: 100% !important;
        //   height: 100% !important;
        //   object-fit: cover !important; /* Lấp đầy khung mà không bị méo */
        //   aspect-ratio: auto !important; /* Hủy bỏ tỷ lệ gốc */
        //   max-width: none !important;
        //   max-height: none !important;
        // }
      `}</style>
    </div>
  );
};

export default ImageUpload;
