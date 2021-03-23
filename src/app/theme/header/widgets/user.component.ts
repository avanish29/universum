import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService, TokenService } from '@core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  template: `
    <button mat-button class="universum-toolbar-button universum-avatar-button" href="javascript:void(0)" [matMenuTriggerFor]="menu">
      <img class="universum-avatar" src="assets/images/avatar.jpg" width="32" alt="avatar" />      
      <span class="universum-username" fxHide.lt-sm>{{ fullName }}</span>
    </button>

    <mat-menu #menu="matMenu">
      <!-- <button routerLink="/profile/overview" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>profile</span>
      </button>
      <button routerLink="/profile/settings" mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>settings</span>
      </button> -->
      <button mat-menu-item (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        <span>logout</span>
      </button>
    </mat-menu>
  `,
})
export class UserComponent {
  fullName: String = "";
  intials: String = "";
  
  constructor( private router: Router, private token: TokenService, private menu: MenuService) {
    this.fullName = this.token.get().firstName + ' ' + this.token.get().lastName;
    this.intials = this.fullName.split(' ').map(name => name[0]).join('').toUpperCase();
  }

  logout() {
    this.token.clear();
    //this.settings.removeUser();
    this.menu.reset();
    this.router.navigateByUrl('/login');
  }
}
