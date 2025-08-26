import React from "react";
import logo from "../assets/logo.png";
import capture from "../assets/Icon/capture-svgrepo-com.svg";
import language from "../assets/Icon/language-svgrepo-com.svg";
import bell from "../assets/Icon/bell.svg";

const Header = () => {
  return (
    <header className="flex justify-between items-center text-white p-3 bg-[#0B0B0B] w-full">
      <img src={logo} alt="Sager" className="max-w-[10%]" />
      <nav className="flex items-center text-white gap-2.5 h-full">
        <img src={capture} alt="capture" />
        <img src={language} alt="language" />
        <div className="relative">
          <img src={bell} alt="bell" className="relative" />
          <div className="absolute top-0 left-3 flex items-center justify-center w-4 h-4 bg-red-500 text-white rounded-full text-[10px]">
            1
          </div>
        </div>
        <div className="border-l border-gray-300 pl-2">
          <p>
            Hello, <strong>Mohammad Omar</strong>
          </p>
          <p className="text-gray-500">Technical Support</p>
        </div>
      </nav>
    </header>
  );
};

export default Header;
