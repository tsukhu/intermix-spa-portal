import React from "react";
import "../styles/global.scss";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { getGlobalStore, Role } from "@intermix/store";
import SideBar from "./components/side-bar";
import HeaderDesktop from "./components/header-desktop";
import HeaderMobile from "./components/header-mobile";
import { LoginForm } from "./components/login-form";

export const UNAUTH_USER = { authenticated: true, role: Role.User, name: "guest", authToken: "" };
export const NAMESPACE= "intermix-spa-portal"
export const saveToLS = (name: string,scope: string, key: string, value: {}) => {
  if (window.localStorage) {
    window.localStorage.setItem(
      `${name}_${scope}`,
      JSON.stringify({
        [key]: value,
      })
    );
  }
};

export const getFromLS = (name: string, scope: any, key: any) => {
  let ls: any = {};
  if (window.localStorage) {
    try {
      ls = JSON.parse(window.localStorage.getItem(`${name}_${scope}`)!) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
};

export const isLoggedIn = ({ authenticated, name}) => {
  return (authenticated && name.length > 0)
}

const store = getGlobalStore();
const Root = (props) => {
  // Setup the Store Hook
  const [loggedIn, setLoggedIn] = React.useState(null);
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
    const user = getFromLS(NAMESPACE, 'userInfo', 'user') || UNAUTH_USER;
    initMenu(props.routes);
    store.setUser(user);
    setLoggedIn(isLoggedIn(user))
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
      saveToLS(NAMESPACE, 'userInfo', 'user', user);
      store.setUser(user);
    } else {
      user = { ...user, role: Role.User };
      saveToLS(NAMESPACE, 'userInfo', 'user', user);
      store.setUser(user);
    }
    setLoggedIn(isLoggedIn(user));
  };

  const handleLogout = () => {
    store.setUser(UNAUTH_USER);
    saveToLS(NAMESPACE, 'userInfo', 'user', UNAUTH_USER);
    setLoggedIn(false);
  };

  return (
    <BrowserRouter basename="/">
      {loggedIn === null && <div>Loading ...</div>}
      {loggedIn !== null && !loggedIn && <LoginForm onSuccess={(data) => handleLogin(data)} />}
      {loggedIn !== null && loggedIn && (
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
