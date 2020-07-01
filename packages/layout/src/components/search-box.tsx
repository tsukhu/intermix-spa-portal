import * as React from "react";

export interface SearchBoxProps {
  searchText: string;
  onSearchTextChange: (value) => any;
  onSearchSubmit: (ev) => any;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  searchText,
  onSearchSubmit,
  onSearchTextChange
}) => {
  return (
    <div className="flex flex-1 justify-center md:justify-start text-white px-2">
      <span className="relative w-full">
        <form onSubmit={onSearchSubmit}>
          <input
            type="search"
            placeholder="Search"
            className="w-full bg-gray-800 text-sm text-white transition border border-transparent focus:outline-none focus:border-gray-700 rounded py-1 px-2 pl-10 appearance-none leading-normal"
            onChange={onSearchTextChange}
            value={searchText}
          />
          <div
            className="absolute search-icon"
            style={{ top: ".5rem", left: ".8rem" }}
          >
            <svg
              className="fill-current pointer-events-none text-white w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
            </svg>
          </div>
        </form>
      </span>
    </div>
  );
};
