import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getGlobalStore } from "@intermix/store";
import { LogoSmallSVG } from "./logo";

const store = getGlobalStore();
const SideBar: React.FC<any> = ({ menu }) => {
  const { t } = useTranslation();
  return (
    <aside className="relative bg-new-gray h-screen w-64 hidden sm:block shadow-xl side-bar z-50">
      <div className="p-4 text-center align-center">
        <NavLink
          to="/"
          className="text-white  text-2xl font-semibold sentance hover:text-gray-300 inline-flex"
        >
          <LogoSmallSVG />
          Intermix
        </NavLink>
      </div>
      <nav className="text-white text-base font-semibold pt-3">
        {menu.items
          .filter((m) => store.hasPermission(m.path))
          .map((item) => {
            return (
              <NavLink
                to={item.path}
                key={item.title}
                className="menu-item flex items-center text-white py-4 pl-6 active:text-new-gray-darker active:bg-ocean-light hover:bg-ocean-light hover:text-new-gray-darker hover:opacity-75"
              >
                <i className={`${item.iconClasses} mr-3`}></i>
                {t(`${item.title}`)}
              </NavLink>
            );
          })}
      </nav>
    </aside>
  );
};
export default SideBar;
