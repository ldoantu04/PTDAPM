export function useCategoryData({
    baseUrl = "https://67d464bed2c7857431ed88c2.mockapi.io/",
    categoryMap = {},
    singlePostCategories = [],
  }) {
    const [posts, setPosts] = useState([]);
    const [singlePost, setSinglePost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    
    // Không cần state featuredPosts nữa
    
    // Trạng thái phân trang
    const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 10,
      total: 0,
    });
    
    // Xác định categoryId từ URL khi component mount
    useEffect(() => {
      const pathSegments = location.pathname.split("/").filter(Boolean);
      if (pathSegments.length >= 2) {
        const categorySlug = pathSegments[1]; // lấy phần thứ 2 của URL
        setCategoryId(getCategoryIdFromSlug(categorySlug, categoryMap));
      } else {
        setCategoryId(null);
      }
      
      // Reset trang về 1 khi đổi danh mục
      setPagination(prev => ({ ...prev, current: 1 }));
    }, [location.pathname, categoryMap]);
    
    // Kiểm tra xem có phải là danh mục đặc biệt chỉ có 1 bài viết không
    const isSinglePostCategory = useCallback(() => {
      return singlePostCategories.includes(categoryId);
    }, [categoryId, singlePostCategories]);
    
    // Fetch dữ liệu
    useEffect(() => {
      if (isSinglePostCategory()) {
        fetchSinglePost();
      } else {
        fetchPosts();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId, pagination.current, isSinglePostCategory]);
    
    // Loại bỏ fetchFeaturedPosts và tất cả các tham chiếu đến nó
  
    // Còn lại giữ nguyên
    
    return {
      posts,
      // Không trả về featuredPosts nữa
      singlePost,
      loading,
      error,
      pagination,
      categoryId,
      isSinglePostCategory,
      changeCategory,
      handlePageChange
    };
  }