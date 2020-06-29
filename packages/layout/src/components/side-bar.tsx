import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogoSmallSVG } from './logo';

const SideBar: React.FC<any> = ({ menu }) => {
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
        {menu.items.map(item => {
          return (
            <NavLink
              to={item.path}
              key={item.title}
              className="menu-item flex items-center text-white py-4 pl-6 active:text-new-gray-darker active:bg-ocean-light hover:bg-ocean-light hover:text-new-gray-darker hover:opacity-75"
            >
              <i className={`${item.iconClasses} mr-3`}></i>
              {item.title}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
export default SideBar;
