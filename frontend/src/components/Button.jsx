import React from "react";

const Button = ({ label }) => {
  return (
    <div>
      <button
        type="submit"
        className="w-full py-2 bg-black text-white font-bold rounded-md hover:bg-gray-800 transition-all duration-200"
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
