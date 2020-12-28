import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { SettingsService, TokenService, MenuService } from '@core';

@Component({
  selector: 'app-user',
  template: `
    <button mat-button class="universum-toolbar-button universum-avatar-button" href="javascript:void(0)" [matMenuTriggerFor]="menu">
      <img class="universum-avatar" src="assets/images/avatar.jpg" width="32" alt="avatar" />
      <span class="universum-username" fxHide.lt-sm>Avanish</span>
    </button>

    <mat-menu #menu="matMenu">
      <button routerLink="/profile/overview" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>profile</span>
      </button>
      <button routerLink="/profile/settings" mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>settings</span>
      </button>
      <button mat-menu-item (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        <span>logout</span>
      </button>
    </mat-menu>
  `,
})
export class UserComponent {
  constructor( private router: Router) {}

  logout() {
    //this.token.clear();
    //this.settings.removeUser();
    //this.menu.reset();
    this.router.navigateByUrl('/auth/login');
  }
}
