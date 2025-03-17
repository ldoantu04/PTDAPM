import { Link } from "react-router-dom";

const Sidebar = ({ title, items }) => {
  return (
    <div className="bg-white space-y-4">
      <h2 className="text-2xl text-[#192E58] font-bold pb-2 border-b-3 border-red1">
        {title}
      </h2>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className={`border-b-2 border-gray2 cursor-pointer py-2.5 flex items-center gap-2 hover:text-red1 ${
              item.marker ? "text-red1" : "text-gray-700"
            }`}
          >
            <img src="/assets/side_bar/icon_navigater.png" alt="" />
            <Link to={item.link} className="w-full">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
