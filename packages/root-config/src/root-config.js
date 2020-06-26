import { registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from 'single-spa-layout';

const data = {
  loaders: {
    appLoader: `<div class="showbox">
    <div class="loader">
      <svg class="circular" viewBox="25 25 50 50">
        <circle
          class="path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke-width="2"
          stroke-miterlimit="10"
        />
      </svg>
    </div>
  </div>`,
  },
};
const routes = constructRoutes(
  document.querySelector('#single-spa-layout'),
  data
);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});

// Hide or show app loader
function configureLoadingEl(show) {
  const htmlId = `single-spa-application:__MAIN-APP-LOADER__`;
  let domElement = document.getElementById(htmlId);
  domElement.style.display = show ? 'block' : 'none';
}

const layoutEngine = constructLayoutEngine({ routes, applications });
applications.forEach(registerApplication);
start();

System.import('@intermix/styleguide').then(() => {
  configureLoadingEl(false);
  layoutEngine.activate();
  start();
});
