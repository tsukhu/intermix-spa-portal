import React from "react";
import "../styles/global.scss";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { getGlobalStore } from "@intermix/store";
import SideBar from "./components/side-bar";
import HeaderDesktop from "./components/header-desktop";
import HeaderMobile from "./components/header-mobile";
import { LoginForm } from "./components/login-form";

const Root = (props) => {
  // Setup the Store Hook
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [globalStore, setGlobalStore] = React.useState(getGlobalStore());

  const fetchMenu = async () => {
    return await (await fetch(props.menuApiUrl)).json();
  };

  // Load Routes and add them to the store
  const initMenu = (routes) => {
    fetchMenu().then((result) => {
      if (
        typeof result.menu !== "undefined" &&
        typeof result.menu.items !== "undefined"
      ) {
        result.menu.items.map((item) => {
          // check if there is a route existing then add it
          const route = routes.find((route) => route.path === item.path);
          if (typeof route !== "undefined") {
            globalStore.addMenuItem({
              ...item,
              path: route.path,
            });
          }
        });
      }
    });
  };

  React.useLayoutEffect(() => {
    globalStore.init();
    globalStore.subscribe(setGlobalStore);
    initMenu(props.routes);
  }, []);

  return (
    <BrowserRouter basename="/">
      {!loggedIn && <LoginForm onSuccess={() => setLoggedIn(true)} />}
      {loggedIn && (
        <>
          <div className="w-full flex h-screen overflow-y-hidden">
            <SideBar menu={globalStore.menu} />
            <div className="w-full flex flex-col h-screen overflow-y-hidden">
              <HeaderDesktop />
              <HeaderMobile menu={globalStore.menu} />
            </div>
          </div>

          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
        </>
      )}
    </BrowserRouter>
  );
};

export default Root;
