import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  template: `
    <div *ngIf="messages?.length > 0">
      <button mat-icon-button class="universum-toolbar-button" [matMenuTriggerFor]="menu">
        <mat-icon>notifications</mat-icon>
        <span class="badge bg-red-500">{{ messages?.length }}</span>
      </button>

      <mat-menu #menu="matMenu">
        <mat-nav-list>
          <mat-list-item *ngFor="let message of messages">
            <a matLine href="#">{{ message }}</a>
            <button mat-icon-button>
              <mat-icon>info</mat-icon>
            </button>
          </mat-list-item>
        </mat-nav-list>
      </mat-menu>
    </div>
  `,
})
export class NotificationComponent {
  messages: String[] = [];
}
