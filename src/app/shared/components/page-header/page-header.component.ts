import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-header',
  host: {
    class: 'universum-page-header',
  },
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageHeaderComponent implements OnInit {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() nav: string[] = [];
  @Input() showBreadCrumb = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.nav = Array.isArray(this.nav) ? this.nav : [];

    if (this.nav.length === 0) {
      this.genBreadcrumb();
    }

    this.title = this.title || this.nav[this.nav.length - 1];
  }

  genBreadcrumb() {
    const states = this.router.url.slice(1).split('/');
    this.nav.unshift('home');
  }
}
