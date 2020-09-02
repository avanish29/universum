import { Component, ViewEncapsulation, OnInit, Optional, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AppDirectionality } from './../../shared/services/directionality.service';
import { StartupService, SupportedLanguage } from './../../core/bootstrap/startup.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AuthLayoutComponent implements OnInit {
  langChangeUnsubscribe$: Subject<boolean> = new Subject();  
  settings = this.startupService.getSettings();
  selectedLanguage : SupportedLanguage = this.startupService.getCurrentLanguage();

  constructor(private startupService : StartupService,
    @Optional() @Inject(DOCUMENT) private document: Document,
    @Inject(Directionality) public dir: AppDirectionality) {
      this.dir.value = this.selectedLanguage.dir === 'ltr' ? 'ltr' : 'rtl';
      this.document.body.dir = this.dir.value;
    }

  ngOnInit() {
    this.startupService.getLangChangeObs()
      .pipe(takeUntil(this.langChangeUnsubscribe$))
        .subscribe(currentLang => {
          if(currentLang) {
            this.selectedLanguage = currentLang;
            this.dir.value = this.selectedLanguage.dir === 'ltr' ? 'ltr' : 'rtl';
            this.document.body.dir = this.dir.value;
          }
        });
    this.selectedLanguage = this.startupService.getCurrentLanguage();
  }

  ngOnDestroy() {
    this.langChangeUnsubscribe$.next(true);
    this.langChangeUnsubscribe$.complete();
  }

}
