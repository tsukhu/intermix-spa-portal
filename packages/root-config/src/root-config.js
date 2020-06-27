import { registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from 'single-spa-layout';

import { APP_KEYS } from './envConstants';
// Remotely access layout configuration
const REMOTE_LAYOUT = true;

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

const routesJSON = {
  routes: [
    {
      type: 'route',
      path: '/',
      routes: [
        { type: 'application', name: '@intermix/layout' },
        {
          type: 'route',
          path: 'dashboard',
          routes: [
            {
              type: 'application',
              name: '@intermix/dashboard',
              loader: data.loaders.appLoader,
            },
          ],
        },
        {
          type: 'route',
          routes: [{ type: 'application', name: '@intermix/notfound' }],
          default: true,
        },
      ],
    },
  ],
};

const fetchRoutes = async () => {
  return await (await fetch(APP_KEYS.routesApiUrl)).json();
};

// Hide or show app loader
function configureLoadingEl(show) {
  const htmlId = `single-spa-application:__MAIN-APP-LOADER__`;
  let domElement = document.getElementById(htmlId);
  domElement.style.display = show ? 'block' : 'none';
}

if (REMOTE_LAYOUT) {
  fetchRoutes().then(result => {
    const routes = constructRoutes(result);
    const applications = constructApplications({
      routes,
      loadApp({ name }) {
        return System.import(name);
      },
    });

    const layoutEngine = constructLayoutEngine({ routes, applications });

    applications.forEach(app => {
      registerApplication({
        ...app,
        customProps: (name, location) => ({
          ...app.customProps(name, location),
          jwttoken: 'test',
        }),
      });
    });

    System.import('@intermix/styleguide').then(() => {
      configureLoadingEl(false);
      layoutEngine.activate();
      start();
    });
  });
} else {
  const routes = constructRoutes(routesJSON);
  const applications = constructApplications({
    routes,
    loadApp({ name }) {
      return System.import(name);
    },
  });

  const layoutEngine = constructLayoutEngine({ routes, applications });
  applications.forEach(registerApplication);

  System.import('@intermix/styleguide').then(() => {
    configureLoadingEl(false);
    layoutEngine.activate();
    start();
  });
}
