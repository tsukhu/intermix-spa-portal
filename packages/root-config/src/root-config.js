import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import { APP_KEYS } from "./envConstants";

System.import("i18next").then((module) => {
  const i18n = module.default;
  System.import("react-i18next").then((m2) => {
    const { initReactI18next } = m2;
    i18n
      .use(initReactI18next) // passes i18n down to react-i18next
      .init({
        resources: {
          en: {
            translation: {
              "Welcome to React": "Welcome to React and react-i18next",
            },
          },
        },
        lng: "en",
        fallbackLng: "en",

        interpolation: {
          escapeValue: false,
        },
      });
  });
});

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
  console.log(result);
  const applications = constructApplications({
    routes,
    loadApp({ name }) {
      return System.import(name);
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
    start();
  });
});
