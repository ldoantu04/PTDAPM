import { Link } from "react-router-dom";

const Sidebar = ({ title, items }) => {
  return (
    <div className="w-96 bg-white p-4">
      <h2 className="text-2xl text-[#192E58] font-bold mb-6 pb-2 border-b-2 border-[#E82323]">
        {title}
      </h2>
      <ul className="mt-2 space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className={`border-b-2 border-[#D9D9D9] cursor-pointer py-2 flex items-center gap-2 hover:text-[#C10629] ${
              item.marker ? "text-[#C10629]" : "text-gray-700"
            }`}
          >
            <img className="text-gray-400" src="/assets/side_bar/icon_navigater.png" alt="" />
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
