import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatUtils"; // Giả sử bạn có utility function này

function ArticleOther({ title, imageUrl, date, excerpt, link }) {
  // Format ngày tháng từ timestamp (nếu cần)
  const formattedDate = date
    ? formatDate(new Date(date), "dd/MM/yyyy | HH:mm:ss")
    : "";

  return (
    <div className="flex flex-row gap-10 h-52">
      <div className="overflow-hidden w-1/3 h-full flex-shrink-0">
          <Link to={link || "#"}>
          <img
            src={imageUrl || "/assets/article_image_sample.png"}
            alt={title || "Article"}
            className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-110 hover:opacity-80"
          />
          </Link>
      </div>

      <div className="flex flex-col gap-y-2.5 w-2/3">
        <div>
          <Link to={link || "#"}>
            <h3 className="font-semibold text-blue1 text-xl hover:underline transition-all duration-300 ease-out line-clamp-2">
              {title || "Tiêu đề bài viết"}
            </h3>
            </Link>
        </div>

        {/* {date && (
          <span className="w-fit text-xs text-gray3 border-b border-gray2 pb-2">
            {formattedDate}
          </span>
        )}

        {excerpt && (
          <div>
            <p className="text-blue1 text-sm line-clamp-4">
              {excerpt}
            </p>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default ArticleOther;