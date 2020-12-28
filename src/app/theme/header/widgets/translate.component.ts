import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StartupService, SupportedLanguage } from '../../../core/bootstrap/startup.service';

@Component({
  selector: 'app-translate',
  template: `
    <button mat-icon-button class="universum-toolbar-button" [matMenuTriggerFor]="menu">
      <mat-icon>language</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      <button mat-menu-item *ngFor="let lang of langs | keyvalue;" (click)="useLanguage(lang.value['code'])">
        <span>{{ lang.value['label'] }}</span>
      </button>
    </mat-menu>
  `,
  styles: [],
})
export class TranslateComponent {
  langs : Array<SupportedLanguage>;

  constructor(private translate: TranslateService, private startupService : StartupService) {
    this.langs = this.startupService.getAllLanguages();
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.startupService.setCurrentLanguage(language);
  }
}
