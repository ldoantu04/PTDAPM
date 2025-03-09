import React from "react";

function SmallNavBar({ navigationLinks }) {
  return (
    <div className="mx-auto p-6">
      <div className="text-base mb-4 flex items-center space-x-5">
        {navigationLinks.map((link, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-[#AB9B9B]">&gt;</span>}
            {index === navigationLinks.length - 1 ? (
              <span className="text-[#E82323] cursor-default">{link.label}</span>
            ) : link.href ? (
              <a href={link.href} className="text-[#AB9B9B] hover:text-[#E82323] transition-all duration-500 ease-out">
                {link.label}
              </a>
            ) : (
              <span className="text-[#AB9B9B] cursor-default">{link.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default SmallNavBar;