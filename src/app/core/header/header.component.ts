import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'universum-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideMenu = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public onProfile() {}

  public logout() {}

}
