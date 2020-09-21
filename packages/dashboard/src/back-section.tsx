import React from "react";
import { Link } from "react-router-dom";

export const BackSection: React.FC<any> = () => {
  return (
    <Link
      to="/workflow"
      className="m-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
    >
      <i className="fas fa-chevron-left"></i>
      <span className="pl-4">Tasks</span>
    </Link>
  );
};
