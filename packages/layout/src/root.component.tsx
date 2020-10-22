import React from "react";
import "../styles/global.scss";
import { navigateToUrl } from "single-spa";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { getGlobalStore, Role, Task } from "@intermix/store";
import SideBar from "./components/side-bar";
import HeaderDesktop from "./components/header-desktop";
import HeaderMobile from "./components/header-mobile";

export const UNAUTH_USER = {
  authenticated: false,
  role: Role.User,
  name: "guest",
  authToken: "",
};
export const NAMESPACE = "intermix-spa-portal";
export const saveToLS = (
  name: string,
  scope: string,
  key: string,
  value: {}
) => {
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

export const isLoggedIn = ({ authenticated, name }) => {
  return authenticated && name.length > 0;
};

const Root = (props) => {
  // Setup the Store Hook
  const store = getGlobalStore();
  const [globalStore, setGlobalStore] = React.useState(store);

  const fetchMenu = async () => {
    return await (await fetch(props.menuApiUrl)).json();
  };

  const fetchTasks = async () => {
    return await (await fetch(`${props.wfApiUrl}/user/tasks`)).json();
  };

  const initTasks = async () => {
    fetchTasks().then((result) => {
      if (typeof result !== "undefined") {
        store.setTasks(result);
      }
    });
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
    if (typeof globalStore.tasksUpdated !== "undefined" && globalStore.tasksUpdated) {
      store.setTasksUpdated(false);
      initTasks();
    }
  },[globalStore.tasksUpdated])

  React.useEffect(() => {
    globalStore.subscribe(setGlobalStore);
    const user = getFromLS(NAMESPACE, "userInfo", "user") || UNAUTH_USER;
    globalStore.setUser(user);
    initMenu(props.routes);
  }, []);

  React.useEffect(() => {
    if (typeof globalStore.user !== "undefined") {
      console.log(globalStore.user);
      saveToLS(NAMESPACE, "userInfo", "user", globalStore.user);
    }
  }, [globalStore]);

  const handleLogout = () => {
    store.setUser(UNAUTH_USER);
    saveToLS(NAMESPACE, "userInfo", "user", UNAUTH_USER);
  };

  return (
    <BrowserRouter basename="/">
      {typeof globalStore.user === "undefined" && <div>Loading ...</div>}
      {typeof globalStore.user !== "undefined" &&
        !isLoggedIn(globalStore.user) &&
        navigateToUrl("/login")}
      {typeof globalStore.user !== "undefined" && isLoggedIn(globalStore.user) && (
        <>
          <div className="w-full flex h-screen overflow-y-hidden">
            <SideBar menu={globalStore.menu} />
            <div className="w-full flex flex-col h-screen overflow-y-hidden">
              <HeaderDesktop onLogout={() => handleLogout()} tasks={globalStore.tasks} />
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
