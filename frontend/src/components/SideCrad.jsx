import React, { useContext } from "react";
import { ThemeContext } from "../utils/ThemeContext";

const SideCrad = ({ name, desc, Icon, value }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`
      ${theme === "Light" ? "bg-white/90" : "bg-slate-900"} 
      rounded-2xl p-5 mb-6 cursor-pointer
      shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1
      transition-transform duration-300 transform
      md:p-6
    `}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-linear-to-tr from-purple-100 to-purple-50 p-2 rounded-lg flex items-center justify-center">
          <Icon className="text-purple-600" size={20} />
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold">
          {name}
        </p>
      </div>
      <p className="text-lg font-bold text-purple-600">{desc}</p>
      <p className="text-4xl font-semibold justify-center text-center items-center text-indigo-600">
        {value}
      </p>
    </div>
  );
};

export default SideCrad;
