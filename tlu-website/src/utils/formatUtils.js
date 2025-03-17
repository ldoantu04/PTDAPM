/**
 * Format ngày tháng theo định dạng mong muốn
 * @param {Date} date - Đối tượng Date cần format
 * @param {String} format - Định dạng mong muốn (dd/MM/yyyy, HH:mm:ss, ...)
 * @returns {String} - Chuỗi ngày tháng đã được format
 */
export const formatDate = (date, format = 'dd/MM/yyyy') => {
  if (!date) return '';
  
  // Đảm bảo date là đối tượng Date
  const d = date instanceof Date ? date : new Date(date);
  
  // Xử lý lỗi Invalid Date
  if (isNaN(d.getTime())) return '';
  
  // Các thành phần thời gian
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const seconds = d.getSeconds().toString().padStart(2, '0');
  
  // Thay thế theo format
  return format
    .replace('dd', day)
    .replace('MM', month)
    .replace('yyyy', year)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};

/**
 * Tạo mô tả ngắn từ nội dung HTML
 * @param {String} htmlContent - Nội dung HTML
 * @param {Number} length - Độ dài mong muốn
 * @returns {String} - Chuỗi mô tả đã được xử lý
 */
export const createExcerpt = (htmlContent, length = 150) => {
  if (!htmlContent) return '';
  
  // Loại bỏ tất cả các thẻ HTML
  const tempElement = document.createElement('div');
  tempElement.innerHTML = htmlContent;
  const text = tempElement.textContent || tempElement.innerText || '';
  
  // Cắt ngắn theo độ dài
  if (text.length <= length) return text;
  
  // Tìm vị trí khoảng trắng cuối cùng trong phạm vi length
  let cutPoint = text.lastIndexOf(' ', length);
  if (cutPoint === -1) cutPoint = length;
  
  return text.substring(0, cutPoint) + '...';
};

/**
 * Chuyển đổi từ chuỗi slug sang tiêu đề
 * @param {String} slug - Chuỗi slug
 * @returns {String} - Chuỗi tiêu đề
 */
export const slugToTitle = (slug) => {
  if (!slug) return '';
  
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Lấy ID danh mục từ slug URL
 * @param {String} slug - Slug URL
 * @returns {String|null} - ID danh mục hoặc null nếu không có
 */
export const getCategoryIdFromSlug = (slug) => {
  const slugToIdMap = {
    'dai-hoc': '2',
    'thac-si': '3',
    'tien-si': '4',
    // Thêm các mapping khác nếu cần
  };
  
  return slugToIdMap[slug] || null;
};