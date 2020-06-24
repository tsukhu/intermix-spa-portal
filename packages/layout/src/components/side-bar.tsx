import React from 'react';
import { LogoSmallSVG } from './logo';

const SideBar: React.FC<any> = () => {
  return (
    <aside className="relative bg-new-gray h-screen w-64 hidden sm:block shadow-xl side-bar z-50">
      <div className="p-6 text-center align-center">
        <a
          href="index.html"
          className="text-white  text-3xl font-semibold sentance hover:text-gray-300 inline-flex"
        >
          <LogoSmallSVG />
          Intermix
        </a>
      </div>
      <nav className="text-white text-base font-semibold pt-3">
        <a
          href="index.html"
          className="flex items-center text-white  py-4 pl-6 hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light"
        >
          <i className="fas fa-tachometer-alt mr-3"></i>
          Dashboard
        </a>
        <a
          href="blank.html"
          className="flex items-center active:bg-ocean-light active:text-new-gray-darker text-white py-4 pl-6 hover:bg-ocean-light hover:text-new-gray-darker"
        >
          <i className="fas fa-sticky-note mr-3"></i>
          Blank Page
        </a>
        <a
          href="tables.html"
          className="flex items-center active:bg-ocean-light active:text-new-gray-darker text-white py-4 pl-6 hover:bg-ocean-light hover:text-new-gray-darker"
        >
          <i className="fas fa-table mr-3"></i>
          Tables
        </a>
        <a
          href="forms.html"
          className="flex items-center active:bg-ocean-light active:text-new-gray-darker text-white py-4 pl-6 hover:bg-ocean-light hover:text-new-gray-darker"
        >
          <i className="fas fa-align-left mr-3"></i>
          Forms
        </a>
        <a
          href="tabs.html"
          className="flex items-center active:bg-ocean-light active:text-new-gray-darker text-white py-4 pl-6 hover:bg-ocean-light hover:text-new-gray-darker"
        >
          <i className="fas fa-tablet-alt mr-3"></i>
          Tabbed Content
        </a>
        <a
          href="calendar.html"
          className="flex items-center active:bg-ocean-light active:text-new-gray-darker text-white py-4 pl-6 hover:bg-ocean-light hover:text-new-gray-darker"
        >
          <i className="fas fa-calendar mr-3"></i>
          Calendar
        </a>
      </nav>
    </aside>
  );
};
export default SideBar;
