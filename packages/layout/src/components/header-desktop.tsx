import React from "react";
import SearchBox from "./search-box";
import LanguageSelector from "./language-selector";
import { useTranslation } from "react-i18next";
import {changeLanguage} from "@intermix/i18n";

const HeaderDesktop: React.FC<any> = () => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [openAlerts, setOpenAlerts] = React.useState(false);
  return (
    <header className="w-full items-center bg-white py-2 px-6 pb-1 hidden sm:flex sm:shadow-md">
      <div className="w-2/4 justify-end align-middle text-center items-center z-50">
        <SearchBox
          searchText={null}
          searchPlaceholder={t('Search')}
          onSearchTextChange={(text) => console.log(text)}
          onSearchSubmit={() => console.log("Add Search handler")}
        />
      </div>

      <div className="w-2/4 flex justify-end">
        <LanguageSelector currentLanguage={"en"} onLanguageChange={(e) => changeLanguage(e.target.value)}/>
        <div className="relative mr-2 z-50">
          <button
            onClick={() => {
              setOpen(false);
              setOpenAlerts(!openAlerts);
            }}
            className="z-10 w-12 h-12  text-2xl mr-1text-gray-800 rounded-full overflow-hidden focus:outline-none"
          >
            <i className="fas fa-bell"></i>
            <div
              className="bg-orange-500 rounded-full w-3 h-3 absolute"
              style={{ bottom: ".3rem", right: ".25rem" }}
            ></div>
          </button>
        </div>
        <div className="relative z-50">
          <button
            onClick={() => {
              setOpen(!open);
              setOpenAlerts(false);
            }}
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-400 hover:border-blue-400 focus:border-blue-300 focus:outline-none z-50"
          >
            <img
              className="rounded-full"
              alt="A"
              src="https://randomuser.me/api/portraits/women/75.jpg"
            />
          </button>
        </div>
        {!open && (
          <button className="h-full w-full fixed inset-0 cursor-default"></button>
        )}
        {openAlerts && (
          <div className="absolute w-40 bg-white rounded-lg shadow-lg py-2 mt-16 z-50">
            <div class="py-1">
              <a
                href="#"
                class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                role="menuitem"
              >
                <i className="fas fa-list mr-3"></i>
                Alert 1
              </a>
              <a
                href="#"
                class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                role="menuitem"
              >
                <i className="fas fa-list mr-3"></i>
                Alert 2
              </a>
            </div>
            <div class="border-t border-gray-100"></div>
            <div class="py-1">
              <a
                href="#"
                class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                role="menuitem"
              >
                <i className="fas fa-list mr-3"></i>
                Alert 3
              </a>
              <a
                href="#"
                class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                role="menuitem"
              >
                <i className="fas fa-list mr-3"></i>
                Alert 4
              </a>
            </div>
            <div class="border-t border-gray-100"></div>
            <div class="py-1">
              <a
                href="#"
                class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                role="menuitem"
              >
                <i className="fas fa-list mr-3"></i>
                Alert 4
              </a>
              <a
                href="#"
                class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                role="menuitem"
              >
                <i className="fas fa-list mr-3"></i>
                Alert 6
              </a>
            </div>
            <div class="border-t border-gray-100"></div>
            <div class="py-1">
              <a
                href="#"
                class="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                role="menuitem"
              >
                <i className="fas fa-list mr-3"></i>
                Alert 7
              </a>
            </div>
          </div>
        )}
        {open && (
          <div className="absolute w-40 bg-white rounded-lg shadow-lg py-2 mt-16 z-50 text-sm">
            <a
              href="#"
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
            >
              <i className="fas fa-user mr-3"></i>
              {t('Account')}
            </a>
            <div class="border-t border-gray-100"></div>
            <a
              href="#"
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
            >
              <i className="fas fa-cogs mr-3"></i>{t('Support')}
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
            >
              <i className="fas fa-sign-out-alt mr-3"></i>
              {t('Sign Out')}
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderDesktop;
