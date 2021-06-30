import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactForm } from './contact-form.component';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

@NgModule({
  declarations: [AppComponent, EmptyRouteComponent, ContactForm],
  imports: [BrowserModule, AppRoutingModule,  FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
