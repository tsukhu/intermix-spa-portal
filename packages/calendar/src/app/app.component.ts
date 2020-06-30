import { Component, OnInit, Input } from '@angular/core';
import {
  singleSpaPropsSubject,
  SingleSpaProps
} from 'src/single-spa/single-spa-props';
import { getGlobalStore } from '@intermix/store';

@Component({
  selector: 'calendar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'calendar';
  singleSpaProps$ = singleSpaPropsSubject.asObservable();
  menu: any;

  constructor() {
    // getGlobalStore().subscribe(data => this.menu =  Object.assign({},data));
  }

  ngOnInit(): void {
    this.menu = getGlobalStore().observable;
    // TODO : The global store is initialized a bit later in the layout
  //  setTimeout(() => (this.menu = getGlobalStore().observable), 500);
  }
}
