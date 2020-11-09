import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import { APP_KEYS } from "./envConstants";
import i18nPromise from "./i18n";

const fetchRoutes = async () => {
  return await (await fetch(APP_KEYS.routesApiUrl)).json();
};

// Hide or show app loader
const configureLoadingEl = (show) => {
  const htmlId = `single-spa-application:__MAIN-APP-LOADER__`;
  let domElement = document.getElementById(htmlId);
  domElement.style.display = show ? "block" : "none";
};

fetchRoutes().then((result) => {
  const routes = constructRoutes(result);
  // console.log(result);
  const applications = constructApplications({
    routes,
    loadApp({ name }) {
      if (name.endsWith("projects")) {
        return loadWithoutAmd(name);
      } else {
        return System.import(name);
      }
    },
  });

  const layoutEngine = constructLayoutEngine({ routes, applications });

  applications.forEach((app) => {
    registerApplication({
      ...app,
      customProps: (name, location) => ({
        ...app.customProps(name, location),
        jwttoken: "test",
        menuApiUrl: APP_KEYS.menuApiUrl,
        routes:
          name === "@intermix/layout" &&
          typeof result.routes !== undefined &&
          result.routes.length === 1
            ? result.routes[0].routes
            : undefined,
      }),
    });
  });

  System.import("@intermix/styleguide").then(() => {
    configureLoadingEl(false);
    layoutEngine.activate();
    i18nPromise.then(start).catch((err) => {
      console.error(`Failed to initialize i18next translations`, err);
    });
  });
});

// A lot of angularjs libs are compiled to UMD, and if you don't process them with webpack
// the UMD calls to window.define() can be problematic.
function loadWithoutAmd(name) {
  return Promise.resolve().then(() => {
    let globalDefine = window.define;
    delete window.define;
    return System.import(name).then((module) => {
      window.define = globalDefine;
      return module;
    });
  });
}
