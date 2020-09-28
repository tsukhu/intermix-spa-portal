import React from "react";
import { Link } from "react-router-dom";

export const BackSection: React.FC<any> = () => {
  return (
    <Link
      to="/workflow"
      className="m-4 py-2 px-2 w-8 border-blue-500 border text-blue-500 rounded  inline-flex items-center transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none"
    >
      <i className="fas fa-chevron-left"></i>
    </Link>
  );
};
