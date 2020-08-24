import { PreloaderService } from '@core';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'universum-ui';

  constructor(private preloader: PreloaderService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.preloader.hide();
  }
}
