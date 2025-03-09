import React from 'react';
import { Link } from 'react-router-dom';

function ArticleMainPage({ title, time, link }) {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="overflow-hidden">
        <Link to={link}>
          <img
            src="/assets/article_image_sample.png"
            alt=""
            className="object-cover transition-transform duration-300 ease-out hover:scale-125 hover:opacity-70"
          />
        </Link>
      </div>

      <div className="flex flex-row space-x-2 items-center text-sm opacity-60">
        <p>{ time }</p>
      </div>

      <div>
        <Link to={link}>
          <p className="font-semibold text-[#192F59] text-base hover:underline transition-all duration-500 ease-out">
            { title }
          </p>
        </Link>
      </div>
    </div>
  );
}

export default ArticleMainPage;