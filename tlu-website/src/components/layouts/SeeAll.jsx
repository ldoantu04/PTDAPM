import React from "react";
import { Link } from "react-router-dom";

function SeeAll({ link }) {
  const handleClick = () => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang
  };

  return (
    <Link
      to={link}
      onClick={handleClick}
      className="flex items-center text-[#E82323] text-[13px] cursor-pointer hover:underline pt-2.5 pb-2.5 transition-all duration-500 ease-out -mt-10"
    >
      <p>&gt;&gt;&nbsp;</p>
      <p>Xem tất cả</p>
    </Link>
  );
}

export default SeeAll;
