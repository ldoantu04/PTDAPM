const Sidebar = ({ title, items }) => {
  return (
    <div className="w-[400px] bg-white p-4">
      <h2 className="text-2xl text-[#192E58] font-bold mb-6 pb-2 border-b-[2px] border-[#E82323]">{ title }</h2>
      <ul className="mt-2 space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="border-b-2 border-[#D9D9D9] cursor-pointer py-2 flex items-center gap-2 text-gray-700 hover:text-[#E82323]"
          >
            <img className="text-gray-400" src="/assets/side_bar/icon_navigater.png" alt="" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
