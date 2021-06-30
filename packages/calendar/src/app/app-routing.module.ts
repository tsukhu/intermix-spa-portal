import { NgModule } from '@angular/core';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { ContactForm } from './contact-form.component';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

const routes: Routes = [
  { path: 'calendar/form', component: ContactForm },
  { path: '**', component: EmptyRouteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
})
export class AppRoutingModule {}
