import { Component } from '@angular/core';
import {
  singleSpaPropsSubject,
  SingleSpaProps,
} from 'src/single-spa/single-spa-props';

@Component({
  selector: 'calendar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'calendar';
  singleSpaProps$ = singleSpaPropsSubject.asObservable();
}
