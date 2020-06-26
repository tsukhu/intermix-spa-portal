import React from 'react';
import { NavLink} from 'react-router-dom';
import { LogoSmallSVG } from './logo';

const HeaderMobile: React.FC<any> = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="w-full side-bar py-5 px-6 sm:hidden z-50">
      <div className="flex items-center justify-between">
        <NavLink
          to="/"
          className="flex text-white text-2xl font-semibold sentence hover:text-gray-300"
        >
          <LogoSmallSVG />
          Intermix
        </NavLink>
        {!open && (
          <button
            onClick={() => setOpen(!open)}
            className="text-white text-3xl focus:outline-none"
          >
            <i className="fas fa-bars"></i>
          </button>
        )}
        {open && (
          <button
            onClick={() => setOpen(!open)}
            className="text-white text-3xl focus:outline-none"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>

      {open && (
        <nav className="flex flex-col pt-4 ">
          <NavLink
            to="/dashboard"
            className="menu-item flex items-center text-white hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
          >
            <i className="fas fa-tachometer-alt mr-3"></i>
            Dashboard
          </NavLink>
          <NavLink
            to="/blank"
            className="menu-item flex items-center text-white opacity-75 hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
          >
            <i className="fas fa-sticky-note mr-3"></i>
            Blank Page
          </NavLink>
          <NavLink
            to="/tables"
            className="menu-item flex items-center text-white opacity-75 hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
          >
            <i className="fas fa-table mr-3"></i>
            Tables
          </NavLink>
          <NavLink
            to="/forms"
            className="menu-item flex items-center text-white opacity-75 hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
          >
            <i className="fas fa-align-left mr-3"></i>
            Forms
          </NavLink>
          <NavLink
            to="/tabs"
            className="menu-item flex items-center text-white opacity-75 hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
          >
            <i className="fas fa-tablet-alt mr-3"></i>
            Tabbed Content
          </NavLink>
          <NavLink
            to="/calendar"
            className="menu-item flex items-center text-white opacity-75 hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
          >
            <i className="fas fa-calendar mr-3"></i>
            Calendar
          </NavLink>
          <NavLink
            to="#"
            className="flex items-center text-white opacity-75 hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
          >
            <i className="fas fa-cogs mr-3"></i>
            Support
          </NavLink>
          <NavLink
            to="#"
            className="flex items-center text-white opacity-75 hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
          >
            <i className="fas fa-user mr-3"></i>
            My Account
          </NavLink>
          <NavLink
            to="#"
            className="flex items-center text-white opacity-75 hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
          >
            <i className="fas fa-sign-out-alt mr-3"></i>
            Sign Out
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default HeaderMobile;
