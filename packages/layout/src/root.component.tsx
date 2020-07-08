import React from "react";
import "../styles/global.scss";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { getGlobalStore, Role } from "@intermix/store";
import SideBar from "./components/side-bar";
import HeaderDesktop from "./components/header-desktop";
import HeaderMobile from "./components/header-mobile";
import { LoginForm } from "./components/login-form";

const store = getGlobalStore();
const Root = (props) => {
  // Setup the Store Hook
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [globalStore, setGlobalStore] = React.useState(store);

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
        if (result.menu.home) {
          store.setHomePagePath(result.menu.home);
        }
        result.menu.items.map((item) => {
          // check if there is a route existing then add it
          const route = routes.find((route) => route.path === item.path);
          if (typeof route !== "undefined") {
            store.addMenuItem({
              ...item,
              path: route.path,
            });
          }
        });
      }
    });
  };

  React.useEffect(() => {
    globalStore.subscribe(setGlobalStore);
    initMenu(props.routes);
  }, []);

  const handleLogin = ({ username, _ }) => {
    // Dummy for admin user test
    // ideally call an auth service to handle this
    let user = {
      role: '',
      name: username,
      authToken: "token_1",
      authenticated: true,
    };
    if (username.toLowerCase().includes("admin")) {
      user = { ...user, role: Role.Admin };
      store.setUser(user);
    } else {
      user = { ...user, role: Role.User };
      store.setUser(user);
    }
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <BrowserRouter basename="/">
      {!loggedIn && <LoginForm onSuccess={(data) => handleLogin(data)} />}
      {loggedIn && (
        <>
          <div className="w-full flex h-screen overflow-y-hidden">
            <SideBar menu={globalStore.menu} />
            <div className="w-full flex flex-col h-screen overflow-y-hidden">
              <HeaderDesktop onLogout={() => handleLogout()} />
              <HeaderMobile
                menu={globalStore.menu}
                onLogout={() => handleLogout()}
              />
            </div>
          </div>

          <Route exact path="/">
            <Redirect to={globalStore.menu.home} />
          </Route>
        </>
      )}
    </BrowserRouter>
  );
};

export default Root;
