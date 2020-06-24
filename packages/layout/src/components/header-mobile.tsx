import React from 'react';
import { LogoSmallSVG } from './logo';

const HeaderMobile: React.FC<any> = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="w-full side-bar py-5 px-6 sm:hidden z-50">
      <div className="flex items-center justify-between">
        <a
          href="index.html"
          className="flex text-white text-2xl font-semibold sentence hover:text-gray-300"
        >
          <LogoSmallSVG />
          Intermix
        </a>
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
          <a
            href="index.html"
            className="flex items-center text-white hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
          >
            <i className="fas fa-tachometer-alt mr-3"></i>
            Dashboard
          </a>
          <a
            href="blank.html"
            className="flex items-center text-white opacity-75 hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
          >
            <i className="fas fa-sticky-note mr-3"></i>
            Blank Page
          </a>
          <a
            href="tables.html"
            className="flex items-center text-white opacity-75 hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
          >
            <i className="fas fa-table mr-3"></i>
            Tables
          </a>
          <a
            href="forms.html"
            className="flex items-center text-white opacity-75 hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
          >
            <i className="fas fa-align-left mr-3"></i>
            Forms
          </a>
          <a
            href="tabs.html"
            className="flex items-center text-white opacity-75 hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
          >
            <i className="fas fa-tablet-alt mr-3"></i>
            Tabbed Content
          </a>
          <a
            href="calendar.html"
            className="flex items-center text-white opacity-75 hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
          >
            <i className="fas fa-calendar mr-3"></i>
            Calendar
          </a>
          <a
            href="#"
            className="flex items-center text-white opacity-75 hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
          >
            <i className="fas fa-cogs mr-3"></i>
            Support
          </a>
          <a
            href="#"
            className="flex items-center text-white opacity-75 hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
          >
            <i className="fas fa-user mr-3"></i>
            My Account
          </a>
          <a
            href="#"
            className="flex items-center text-white opacity-75 hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
          >
            <i className="fas fa-sign-out-alt mr-3"></i>
            Sign Out
          </a>
        </nav>
      )}
    </header>
  );
};

export default HeaderMobile;
