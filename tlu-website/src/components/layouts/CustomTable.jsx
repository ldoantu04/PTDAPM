import React, { useState } from "react";
import { Table, Button, Input, Popconfirm, Space, Modal } from "antd";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";

/**
 * Component bảng dữ liệu tùy chỉnh với các tính năng:
 * - Tìm kiếm
 * - Xóa hàng đã chọn
 * - Tải lại dữ liệu
 */
function CustomTable({
  columns = [],
  data = [],
  loading = false,
  pagination = { pageSize: 10 },
  rowKey = "id",
  handleBulkDelete,
  handleRefresh,
  searchPlaceholder = "Tìm kiếm...",
  emptyText = "Không có dữ liệu",
  hideSearchBar = false,
}) {
  // State lưu các hàng đã chọn
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  
  // Thiết lập rowSelection cho Table
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      console.log("Selected Row Keys:", newSelectedRowKeys); // Log để debug
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };
  
  // Xử lý tìm kiếm 
  const handleSearch = (value) => {
    // Thực hiện tìm kiếm
  };
  
  // Xử lý xóa hàng đã chọn
  const deleteSelectedRows = async () => {
    if (selectedRowKeys.length === 0) {
      return;
    }
    
    try {
      setConfirmLoading(true);
      
      // Log để debug
      console.log("Xóa các hàng có ID:", selectedRowKeys);
      
      // Gọi hàm xóa từ props
      await handleBulkDelete(selectedRowKeys);
      
      // Reset state sau khi xóa xong
      setSelectedRowKeys([]);
    } catch (error) {
      console.error("Lỗi khi xóa hàng đã chọn:", error);
    } finally {
      setConfirmLoading(false);
    }
  };
  
  // Xử lý khi click nút tải lại
  const onRefresh = () => {
    setSelectedRowKeys([]);  // Reset selected rows when refreshing
    handleRefresh && handleRefresh();
  };
  
  return (
    <div>
      {/* Thanh công cụ */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Nút tải lại */}
          <Button
            onClick={onRefresh}
            icon={<ReloadOutlined />}
            title="Tải lại dữ liệu"
          >
            Tải lại
          </Button>
          
          {/* Nút xóa hàng loạt */}
          <Popconfirm
            title="Xóa các mục đã chọn"
            description={`Bạn có chắc chắn muốn xóa ${selectedRowKeys.length} mục đã chọn không?`}
            onConfirm={deleteSelectedRows}
            okText="Xóa"
            cancelText="Hủy"
            okButtonProps={{ 
              danger: true,
              loading: confirmLoading
            }}
            disabled={selectedRowKeys.length === 0}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              disabled={selectedRowKeys.length === 0}
              loading={confirmLoading}
            >
              Xóa ({selectedRowKeys.length})
            </Button>
          </Popconfirm>
        </div>
        
        {/* Thanh tìm kiếm */}
        {!hideSearchBar && (
          <Input.Search
            placeholder={searchPlaceholder}
            onSearch={handleSearch}
            style={{ width: 300 }}
            allowClear
          />
        )}
      </div>
      
      {/* Hiển thị số lượng đã chọn */}
      {selectedRowKeys.length > 0 && (
        <div className="mb-2 text-blue-600">
          Đã chọn {selectedRowKeys.length} mục
        </div>
      )}
      
      {/* Bảng */}
      <Table
        rowSelection={{
          ...rowSelection,
          selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
          ],
        }}
        columns={columns}
        dataSource={data}
        rowKey={rowKey}
        loading={loading}
        pagination={pagination}
        locale={{ emptyText }}
      />
    </div>
  );
}

export default CustomTable;