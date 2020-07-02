import React from "react";
import { NavLink } from "react-router-dom";
import { LogoSmallSVG } from "./logo";
import { useTranslation } from "react-i18next";

const HeaderMobile: React.FC<any> = ({ menu }) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  return (
    <header className="w-full side-bar py-2 px-6 sm:hidden z-50">
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
          {menu.items.map((item) => {
            return (
              <NavLink
                to={item.path}
                key={item.title}
                className="menu-item flex items-center text-white hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
              >
                <i className={`${item.iconClasses} mr-3`}></i>
                {t(`${item.title}`)}
              </NavLink>
            );
          })}
          <NavLink
            to="#"
            className="flex items-center text-white opacity-75 hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
          >
            <i className="fas fa-cogs mr-3"></i>
            {t('Support')}
          </NavLink>
          <NavLink
            to="#"
            className="flex items-center text-white opacity-75 hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
          >
            <i className="fas fa-user mr-3"></i>
            {t('Account')}
          </NavLink>
          <NavLink
            to="#"
            className="flex items-center text-white opacity-75 hover:bg-ocean-light hover:text-new-gray-darker active:text-new-gray-darker active:bg-ocean-light py-2 pl-4 nav-item"
          >
            <i className="fas fa-sign-out-alt mr-3"></i>
            {t('Sign Out')}
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default HeaderMobile;
