import React from "react";
import { Pagination, Spin } from "antd";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import SmallNavBar from "./SmallNavBar";
import HighlightHeader from "./HighlightHeader";
import ArticleOther from "./ArticleOther";

/**
 * Layout component tái sử dụng cho các trang hiển thị danh mục bài viết
 */
function CategoryLayout({
  posts = [],
  loading = false,
  error = null,
  pagination = {},
  handlePageChange,
  menuItems = [],
  navigationLinks = [],
  title = "",
  sidebarTitle = "",
  baseUrl = "/bai-viet/",
  extraSidebar = null,
}) {
  return (
    <>
      <NavBar />
      <main>
        <SmallNavBar navigationLinks={navigationLinks} />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-30">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <Sidebar title={sidebarTitle} items={menuItems} />
            {extraSidebar}
          </div>

          {/* Nội dung chính */}
          <div className="lg:w-3/4">
            <HighlightHeader title={title} />

            {error && (
              <div className="text-center py-10 text-red-500">{error}</div>
            )}

            {loading ? (
              <div className="text-center py-10">
                <Spin size="large" />
              </div>
            ) : (
              <>
                {posts && posts.length > 0 ? (
                  <div className="flex flex-col gap-y-12">
                    {posts.map((post) => (
                      <ArticleOther
                        key={post.id}
                        title={post.title}
                        imageUrl={post.thumbnail}
                        date={post.createdAt}
                        excerpt={post.excerpt || post.description}
                        link={`${baseUrl}${post.id}`}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    Không có bài viết nào.
                  </div>
                )}

                {/* Phân trang */}
                {pagination && pagination.total > 0 && (
                  <div className="flex justify-center mt-10">
                    <Pagination
                      current={pagination.current || 1}
                      total={pagination.total || 0}
                      pageSize={pagination.pageSize || 10}
                      onChange={handlePageChange}
                      showSizeChanger={false}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default CategoryLayout;