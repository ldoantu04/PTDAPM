import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from "react";
import { message } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

/**
 * TinyEditor - Trình soạn thảo văn bản TinyMCE với tính năng upload ảnh
 * @version 2.0.0
 */
const TinyEditor = forwardRef((props, ref) => {
  // Constants - Các hằng số cho định dạng
  const EDITOR_PADDING = "20px"; // Giảm padding để phù hợp hơn
  const DEFAULT_IMAGE_WIDTH = "600px"; // Chiều rộng cố định cho ảnh ban đầu
  const IMAGE_MARGIN = "16px auto";
  const BASE_FONT = "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  const BASE_FONT_SIZE = "14px";

  const {
    value = "",
    onChange,
    height = 500,
    cloudName = "doquocviet",
    uploadPreset = "Images",
    apiKey = "8f59litzpf0jmru0kx3uhorl2kywsf1ed0qpjsf6vby493fw",
  } = props;

  // Refs và State
  const editorRef = useRef(null);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  // Cập nhật giá trị khi prop thay đổi
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Xử lý khi editor được khởi tạo
  const handleEditorInit = (evt, editor) => {
    editorRef.current = editor;
    setIsEditorReady(true);
  };

  // Xử lý khi nội dung thay đổi
  const handleEditorChange = (content) => {
    setInternalValue(content);
    if (onChange) onChange(content);
  };

  /**
   * Chuẩn hóa nội dung trước khi lưu
   */
  const normalizeContent = (content) => {
    if (!content) return content;
    
    // Loại bỏ các dòng trống thừa giữa các phần tử
    let normalized = content.replace(/<p>\s*<\/p>/g, '');
    
    // Đảm bảo font chữ đã được áp dụng cho mọi văn bản
    normalized = normalized.replace(/<p>/g, `<p style="font-family: ${BASE_FONT}; font-size: ${BASE_FONT_SIZE};">`);
    
    return normalized;
  };

  /**
   * Format all images in the editor to have consistent styles
   */
  const formatAllImages = () => {
    if (!editorRef.current) return;
    
    const editor = editorRef.current;
    const images = editor.dom.select('img');
    
    images.forEach(img => {
      // Chỉ đặt width cố định nếu chưa có width chỉ định
      if (!img.style.width || img.style.width === '100%') {
        img.style.display = "block";
        img.style.margin = IMAGE_MARGIN;
        img.style.width = DEFAULT_IMAGE_WIDTH;
        img.style.height = "auto";
      }
      
      // Đảm bảo ảnh nằm trong p riêng biệt và căn giữa
      const parent = img.parentNode;
      if (parent.nodeName !== "P" || parent.childNodes.length > 1) {
        const p = editor.dom.create("p");
        p.style.textAlign = "center";
        parent.insertBefore(p, img);
        p.appendChild(img);
      }
      if (parent.nodeName === "P") {
        parent.style.textAlign = "center";
        
        // Đảm bảo không có khoảng trắng, thẻ br hoặc nội dung khác trong thẻ p chứa ảnh
        if (parent.childNodes.length > 1) {
          Array.from(parent.childNodes).forEach(node => {
            if (node !== img) parent.removeChild(node);
          });
        }
      }
    });
  };

  /**
   * Tìm ảnh base64 trong nội dung
   */
  const findBase64Images = (content) => {
    if (!content) return [];
    const regex = /<img[^>]+src="(data:image\/[^"]+)"[^>]*>/g;
    const images = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      images.push({
        fullTag: match[0],
        base64: match[1],
      });
    }
    return images;
  };

  /**
   * Đếm số lượng ảnh base64 trong nội dung
   */
  const countBase64Images = (content) => {
    return findBase64Images(content).length;
  };

  /**
   * Upload ảnh lên Cloudinary
   */
  const uploadToCloudinary = async (base64) => {
    try {
      const formData = new FormData();
      formData.append("file", base64);
      formData.append("upload_preset", uploadPreset);
      
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      
      return response.data.secure_url;
    } catch (error) {
      console.error("Lỗi upload ảnh:", error);
      return null;
    }
  };

  /**
   * Handler xử lý hình ảnh cho TinyMCE
   */
  const handleImageUpload = (blobInfo, progress) => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = () => {
          progress(100);
          resolve(reader.result);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blobInfo.blob());
      } catch (error) {
        reject(error);
      }
    });
  };

  /**
   * Xử lý và upload các ảnh base64 trong nội dung
   */
  const processImages = async (content) => {
    const base64Images = findBase64Images(content);
    if (base64Images.length === 0) return normalizeContent(content);

    const hideLoading = message.loading(`Đang xử lý ${base64Images.length} ảnh...`, 0);

    try {
      let processedContent = content;
      let uploadedCount = 0;
      let failedCount = 0;

      for (const img of base64Images) {
        try {
          const cloudinaryUrl = await uploadToCloudinary(img.base64);
          
          if (cloudinaryUrl) {
            // Trích xuất style từ ảnh cũ (nếu có)
            const styleMatch = img.fullTag.match(/style="([^"]*)"/);
            let styleAttr = '';
            
            // Nếu có style và có width được chỉ định
            if (styleMatch && styleMatch[1].includes('width')) {
              // Giữ nguyên style của ảnh đã được resize
              styleAttr = styleMatch[0];
            } else {
              // Sử dụng style mặc định cho ảnh mới
              styleAttr = `style="display: block; margin: ${IMAGE_MARGIN}; width: ${DEFAULT_IMAGE_WIDTH}; height: auto;"`;
            }
            
            // Thay thế ảnh base64 bằng URL Cloudinary với định dạng phù hợp
            processedContent = processedContent.replace(
              img.fullTag,
              `<p style="text-align: center;"><img src="${cloudinaryUrl}" ${styleAttr} /></p>`
            );
            uploadedCount++;
          } else {
            failedCount++;
          }
        } catch (error) {
          console.error("Error processing image:", error);
          failedCount++;
        }
      }

      hideLoading();
      
      if (uploadedCount > 0) {
        message.success(`Đã tải lên ${uploadedCount} ảnh thành công`);
      }
      if (failedCount > 0) {
        message.error(`${failedCount} ảnh không thể tải lên`);
      }

      return normalizeContent(processedContent);
    } catch (error) {
      hideLoading();
      message.error("Đã xảy ra lỗi khi xử lý ảnh");
      console.error("Processing error:", error);
      return normalizeContent(content);
    }
  };

  // Expose các phương thức cho component cha
  useImperativeHandle(ref, () => ({
    getContent: () => {
      const content = editorRef.current?.getContent() || internalValue;
      return normalizeContent(content);
    },
    
    setContent: (content) => {
      if (editorRef.current) {
        editorRef.current.setContent(content);
        setInternalValue(content);
        
        // Format ảnh sau khi đã set content
        setTimeout(() => formatAllImages(), 100);
      }
    },
    
    processContent: async () => {
      const content = editorRef.current?.getContent() || internalValue;
      return await processImages(content);
    },
    
    hasBase64Images: () => {
      const content = editorRef.current?.getContent() || internalValue;
      return findBase64Images(content).length > 0;
    },
    
    countBase64Images: () => {
      const content = editorRef.current?.getContent() || internalValue;
      return countBase64Images(content);
    },
    
    formatAllImages: () => {
      formatAllImages();
      return editorRef.current?.getContent() || internalValue;
    },
    
    getEditor: () => editorRef.current
  }));

  return (
    <Editor
      apiKey={apiKey}
      onInit={handleEditorInit}
      value={internalValue}
      onEditorChange={handleEditorChange}
      init={{
        height,
        resize: false,
        menubar: true,
        plugins: [
          "advlist", "autolink", "link", "image", "lists", "charmap",
          "preview", "anchor", "searchreplace", "visualblocks",
          "code", "fullscreen", "media", "table", "wordcount"
        ],
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline | " +
          "link image media table | align | numlist bullist | code fullscreen",
        content_style: `
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
          
          body { 
            font-family: ${BASE_FONT}; 
            font-size: ${BASE_FONT_SIZE}; 
            padding: 0 ${EDITOR_PADDING}; 
            max-width: 100%; 
            margin: 0 auto;
            line-height: 1.6;
          }
          
          p {
            font-family: ${BASE_FONT};
            font-size: ${BASE_FONT_SIZE};
            margin: 0 0 1em 0; /* Giảm margin để tránh quá nhiều khoảng cách */
          }
          
          img {
            display: block;
            margin: ${IMAGE_MARGIN};
            max-width: 100%;
            height: auto;
            box-sizing: border-box;
          }
          
          p:has(> img:only-child) {
            text-align: center;
          }
          
          h1, h2, h3, h4, h5, h6 {
            font-family: ${BASE_FONT};
          }
          
          h1 { font-size: 24px; }
          h2 { font-size: 20px; }
          h3 { font-size: 18px; }
          h4 { font-size: 16px; }
          h5 { font-size: 14px; }
          h6 { font-size: 12px; }
        `,
        font_formats: 
          'Montserrat=Montserrat, sans-serif;' +
          'Andale Mono=andale mono, monospace;' +
          'Arial=arial, helvetica, sans-serif;' +
          'Times New Roman=times new roman, times, serif;' +
          'Verdana=verdana, geneva, sans-serif',
        font_size_formats: "8px 10px 12px 14px 16px 18px 20px 24px 36px", // Đơn vị px thay vì pt
        formats: {
          // Định nghĩa format cho chữ
          fontsize_14px: { inline: 'span', styles: { 'font-size': '14px' } }
        },
        image_dimensions: true,
        image_default_attributes: {
          style: `display: block; margin: ${IMAGE_MARGIN}; width: ${DEFAULT_IMAGE_WIDTH}; height: auto;`
        },
        paste_data_images: true,
        automatic_uploads: false,
        images_upload_handler: handleImageUpload,
        convert_urls: false,
        relative_urls: false,
        browser_spellcheck: true,
        paste_remove_spans: false, // Giữ lại các span để duy trì định dạng font
        paste_retain_style_properties: "all",
        
        // Giữ định dạng khi dán
        paste_preprocess: function(plugin, args) {
          // Giữ nguyên định dạng khi copy/paste
        },
        
        // Đảm bảo không có dòng trống thừa khi paste
        paste_postprocess: function(plugin, args) {
          args.node.innerHTML = args.node.innerHTML.replace(/<p>\s*<\/p>/g, '');
        },
        
        // Advanced handling for images
        extended_valid_elements: 'img[src|alt|title|width|height|style]',
        object_resizing: 'img',
        resize_img_proportional: true,
        
        // Handler for image upload button in the toolbar
        file_picker_callback: function(callback, value, meta) {
          if (meta.filetype === 'image') {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            
            input.onchange = function() {
              const file = this.files[0];
              const reader = new FileReader();
              
              reader.onload = function() {
                callback(reader.result, {
                  alt: file.name
                });
                
                // Format image after insertion
                setTimeout(() => {
                  formatAllImages();
                }, 100);
              };
              
              reader.readAsDataURL(file);
            };
            
            input.click();
          }
        },
        
        setup: (editor) => {
          // Thiết lập font mặc định là Montserrat
          editor.on('init', () => {
            // Đăng ký định dạng font mặc định
            editor.formatter.register('defaultFont', {
              block: 'p',
              styles: { 
                'font-family': BASE_FONT,
                'font-size': BASE_FONT_SIZE
              }
            });
            
            // Áp dụng font mặc định cho toàn bộ nội dung
            editor.formatter.apply('defaultFont');
            
            // Format all initial images
            formatAllImages();
            
            // Thêm CSS để đảm bảo khung resize liền với ảnh
            editor.dom.addStyle(`
              img { 
                border: 1px solid transparent;
              }
              img:hover { 
                border: 1px dashed #1677ff;
              }
              img.mce-selected {
                outline: none !important;
                border: 1px dashed #1677ff;
              }
              .mce-content-body .mce-resizehandle {
                background: #1677ff;
                border: 1px solid #fff;
                width: 7px;
                height: 7px;
              }
              .mce-content-body p {
                margin: 0 0 1em 0;
              }
            `);
          });
          
          // Áp dụng định dạng mặc định mỗi khi focus vào editor
          editor.on('focus', () => {
            editor.formatter.apply('defaultFont');
          });
          
          // Áp dụng định dạng mặc định cho văn bản mới
          editor.on('beforeSetContent', (e) => {
            if (!e.content.startsWith('<')) {
              e.content = '<p style="font-family: ' + BASE_FONT + '; font-size: ' + BASE_FONT_SIZE + ';">' + e.content + '</p>';
            }
          });
          
          // Xử lý khi NodeChange để đảm bảo ảnh luôn được căn giữa và văn bản có định dạng đúng
          editor.on('NodeChange', (e) => {
            if (e.element.nodeName === 'IMG') {
              // Đảm bảo ảnh nằm trong p riêng biệt và căn giữa
              const parent = e.element.parentNode;
              if (parent.nodeName !== 'P' || parent.childNodes.length > 1) {
                const p = editor.dom.create('p');
                p.style.textAlign = 'center';
                parent.insertBefore(p, e.element);
                p.appendChild(e.element);
              }
              if (parent.nodeName === 'P') {
                parent.style.textAlign = 'center';
              }
            } else if (e.element.nodeName === 'P') {
              // Đảm bảo các đoạn văn có định dạng font đúng
              if (!e.element.style.fontFamily) {
                e.element.style.fontFamily = BASE_FONT;
                e.element.style.fontSize = BASE_FONT_SIZE;
              }
            }
          });
          
          // Xử lý khi ảnh được resize
          editor.on('ObjectResized', (e) => {
            if (e.target.nodeName === 'IMG') {
              // Lấy kích thước mới
              const width = e.width;
              const height = e.height;
              
              // Áp dụng kích thước mới vào style 
              e.target.style.width = width + 'px';
              e.target.style.height = height + 'px';
              
              // Đảm bảo ảnh vẫn được căn giữa
              const parent = e.target.parentNode;
              if (parent.nodeName === 'P') {
                parent.style.textAlign = 'center';
              }
              
              // Đồng bộ kích thước với thuộc tính data-mce-style
              const newStyle = `width: ${width}px; height: ${height}px; display: block; margin: ${IMAGE_MARGIN};`;
              e.target.setAttribute('data-mce-style', newStyle);
            }
          });
          
          // Loại bỏ các thẻ p rỗng và dòng trống thừa khi dán nội dung
          editor.on('PastePostProcess', (e) => {
            // Loại bỏ các thẻ p rỗng
            const emptyParagraphs = editor.dom.select('p:empty', e.node);
            emptyParagraphs.forEach(p => {
              editor.dom.remove(p);
            });
            
            const images = editor.dom.select('img', e.node);
            if (images.length > 0) {
              images.forEach(img => {
                // Đặt style cho ảnh
                img.style.display = "block";
                img.style.margin = IMAGE_MARGIN;
                img.style.width = DEFAULT_IMAGE_WIDTH; // Sử dụng kích thước mặc định
                img.style.height = "auto";
                
                // Đảm bảo ảnh nằm trong p riêng biệt và căn giữa
                const parent = img.parentNode;
                if (parent.nodeName !== 'P' || parent.childNodes.length > 1) {
                  const p = editor.dom.create('p');
                  p.style.textAlign = 'center';
                  parent.insertBefore(p, img);
                  p.appendChild(img);
                }
                if (parent.nodeName === 'P') {
                  parent.style.textAlign = 'center';
                  
                  // Loại bỏ tất cả nội dung khác trong p
                  Array.from(parent.childNodes).forEach(node => {
                    if (node !== img) {
                      editor.dom.remove(node);
                    }
                  });
                }
              });
            }
            
            // Đảm bảo tất cả văn bản có định dạng font đúng
            const paragraphs = editor.dom.select('p', e.node);
            paragraphs.forEach(p => {
              if (!p.style.fontFamily) {
                p.style.fontFamily = BASE_FONT;
                p.style.fontSize = BASE_FONT_SIZE;
              }
            });
          });
          
          // Xử lý riêng cho việc dán ảnh trực tiếp
          editor.on('paste', (e) => {
            if (e.clipboardData && e.clipboardData.items) {
              const items = e.clipboardData.items;
              
              for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                  // Đăng ký callback để định dạng ảnh sau khi được chèn
                  setTimeout(() => formatAllImages(), 100);
                  break;
                }
              }
            }
          });
          
          // Xử lý khi insert content
          editor.on('SetContent', (e) => {
            if (e.content && e.content.includes('<img')) {
              formatAllImages();
            }
            
            // Áp dụng font mặc định nếu là nội dung mới
            setTimeout(() => {
              const paragraphs = editor.dom.select('p:not([style*="font-family"])');
              paragraphs.forEach(p => {
                p.style.fontFamily = BASE_FONT;
                p.style.fontSize = BASE_FONT_SIZE;
              });
            }, 0);
          });
          
          // Xử lý khi blur để loại bỏ dòng trống thừa
          editor.on('blur', () => {
            const content = editor.getContent();
            const cleanContent = content.replace(/<p>\s*<\/p>/g, '');
            
            if (content !== cleanContent) {
              editor.setContent(cleanContent);
            }
          });
        }
      }}
    />
  );
});

export default TinyEditor;