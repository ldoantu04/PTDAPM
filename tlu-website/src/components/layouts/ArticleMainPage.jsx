import React from 'react';
import { Link } from 'react-router-dom';

function ArticleMainPage({ title, link, thumbnail }) {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="overflow-hidden h-48">
        <Link to={link || "#"}>
          <img
            src={thumbnail || "/assets/article_image_sample.png"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-110 hover:opacity-80"
          />
        </Link>
      </div>

      <div>
        <Link to={link || "#"}>
          <p className="font-semibold text-[#192F59] text-base hover:underline transition-all duration-500 ease-out">
            {title}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default ArticleMainPage;