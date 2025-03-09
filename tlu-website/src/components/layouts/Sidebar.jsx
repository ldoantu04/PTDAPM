import { useState } from "react";

const Sidebar = ({ items }) => {
  const [selected, setSelected] = useState(items[0]);

  return (
    <div className="w-64 bg-white shadow-md p-4">
    <h2 className="text-2xl font-bold mb-6 border-b-[5px] border-[#E82323]">Tuyển sinh</h2>
      <ul className="mt-2">
        {items.map((item, index) => (
          <li
          key={index}
          onClick={() => setSelected(item)}
          className={`cursor-pointer px-4 py-2 flex items-center gap-2 ${
            selected === item ? "text-red-600 font-bold" : "text-gray-700"
          } hover:bg-gray-100`}
        >
          <img className={`${selected === item ? "text-red-600" : "text-gray-400"}`} src="/assets/side_bar/icon_navigater.png" alt="" />
          {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
