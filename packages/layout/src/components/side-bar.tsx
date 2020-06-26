import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogoSmallSVG } from './logo';

const SideBar: React.FC<any> = () => {
  return (
    <aside className="relative bg-new-gray h-screen w-64 hidden sm:block shadow-xl side-bar z-50">
      <div className="p-6 text-center align-center">
        <NavLink
          to="/"
          className="text-white  text-3xl font-semibold sentance hover:text-gray-300 inline-flex"
        >
          <LogoSmallSVG />
          Intermix
        </NavLink>
      </div>
      <nav className="text-white text-base font-semibold pt-3">
        <NavLink
          to="/dashboard"
          className="menu-item flex items-center text-white py-4 pl-6 active:text-new-gray-darker active:bg-ocean-light hover:bg-ocean-light hover:text-new-gray-darker hover:opacity-75"
        >
          <i className="fas fa-tachometer-alt mr-3"></i>
          Dashboard
        </NavLink>
        <NavLink
          to="/blank"
          className="menu-item flex items-center active:bg-ocean-light active:text-new-gray-darker text-white py-4 pl-6 hover:bg-ocean-light hover:text-new-gray-darker hover:opacity-75"
        >
          <i className="fas fa-sticky-note mr-3"></i>
          Blank Page
        </NavLink>
        <NavLink
          to="/tables"
          className="menu-item flex items-center active:bg-ocean-light active:text-new-gray-darker text-white py-4 pl-6 hover:bg-ocean-light hover:text-new-gray-darker hover:opacity-75"
        >
          <i className="fas fa-table mr-3"></i>
          Tables
        </NavLink>
        <NavLink
          to="/forms"
          className="flex items-center active:bg-ocean-light active:text-new-gray-darker text-white py-4 pl-6 hover:bg-ocean-light hover:text-new-gray-darker hover:opacity-75"
        >
          <i className="fas fa-align-left mr-3"></i>
          Forms
        </NavLink>
        <NavLink
          to="/tabs"
          className="menu-item flex items-center active:bg-ocean-light active:text-new-gray-darker text-white py-4 pl-6 hover:bg-ocean-light hover:text-new-gray-darker hover:opacity-75"
        >
          <i className="fas fa-tablet-alt mr-3"></i>
          Tabbed Content
        </NavLink>
        <NavLink
          to="/calendar"
          className="menu-item flex items-center active:bg-ocean-light active:text-new-gray-darker text-white py-4 pl-6 hover:bg-ocean-light hover:opacity-75 hover:text-new-gray-darker"
        >
          <i className="fas fa-calendar mr-3"></i>
          Calendar
        </NavLink>
      </nav>
    </aside>
  );
};
export default SideBar;
