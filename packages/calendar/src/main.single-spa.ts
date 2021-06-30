import { enableProdMode, NgZone, ɵNoopNgZone } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {
  singleSpaAngular,
  getSingleSpaExtraProviders
} from 'single-spa-angular';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

if (environment.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngular({
  bootstrapFunction: singleSpaProps => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(
      AppModule
    );
  },
  template: '<calendar-root />',
  Router,
  NgZone: NgZone
});

/* const contactForm = singleSpaAngular({
  bootstrapFunction: singleSpaProps => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(
      ContactFormModule
    );
  },
  template: '<contact-form />',
  Router,
  NgZone: NgZone
});

export const angularParcelConfig = {
  bootstrap: contactForm.bootstrap,
  mount: contactForm.mount,
  unmount: contactForm.unmount
}; */

/*singleSpaAngular({
  bootstrapFunction: singleSpaProps => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(
      ContactFormModule
    );
  },
  template: '<contact-form />',
  NgZone: NgZone,
});*/
export const angularParcelConfig = lifecycles;
export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
