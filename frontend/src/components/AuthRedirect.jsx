import React from "react";
import { Link } from "react-router-dom";

const AuthRedirect = ({ text, label }) => {
  return (
    <div>
      <div className="flex justify-center gap-2 mt-4">
        <p className="text-gray-700 text-sm">{text}</p>
        <Link
          className="text-black text-sm font-semibold hover:underline"
          to={`/${label.toLowerCase()}`}
        >
          {label}
        </Link>
      </div>
    </div>
  );
};

export default AuthRedirect;
