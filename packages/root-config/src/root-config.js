import { registerApplication, start } from "single-spa";
import * as isActive from "./activity-functions";

registerApplication(
  "@intermix/layout",
  () => System.import("@intermix/layout"),
  isActive.layout
);

registerApplication(
  "@intermix/dashboard",
  () => System.import("@intermix/dashboard"),
  isActive.dashboard
);

// Hide or show app loader
function configureLoadingEl(show) {
  const htmlId = `single-spa-application:__MAIN-APP-LOADER__`;
  let domElement = document.getElementById(htmlId);
  domElement.style.display = show ? 'block' : 'none';
}

System.import('@intermix/styleguide').then(() => {
  configureLoadingEl(false);
  start();
});


