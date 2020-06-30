import { Component, OnInit, Input } from '@angular/core';
import {
  singleSpaPropsSubject,
  SingleSpaProps
} from 'src/single-spa/single-spa-props';
import { Observable, Subject, observable } from 'rxjs';
import { getGlobalStore } from '@intermix/store';

@Component({
  selector: 'calendar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'calendar';
  singleSpaProps$ = singleSpaPropsSubject.asObservable();
  store = getGlobalStore();
  @Input() menu: any;

  ngOnInit(): void {
    this.store.subscribe(data => {
      this.menu = data;
      console.log(data);
      return data;
    });
    //    const store = getGlobalStore();
    //   store.subscribe(data => console.log(data));
  }
}
