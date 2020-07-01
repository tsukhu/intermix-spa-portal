import React from "react";

const LanguageSelector = () => {
  return (
    <div className="relative z-50 text-center align-middle mt-2 rounded">
      <select
        className="block appearance-none text-sm text-white w-full bg-gray-800 border border-gray-200  pt-2 pb-3 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-900 focus:text-gray-100 text-center align-middle"
        id="grid-state"
        defaultValue={"en"}
      >
        <option value="en">en</option>
        <option value="fr">fr</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSelector;
