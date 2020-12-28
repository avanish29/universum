import { Component, OnInit, OnDestroy, ViewChild, HostBinding, ElementRef, Inject, Optional, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Directionality } from '@angular/cdk/bidi';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';

import { StartupService, SupportedLanguage, SystemSetting } from '../../core';
import { AppDirectionality } from '../../shared/services/directionality.service';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

const MOBILE_MEDIAQUERY = 'screen and (max-width: 599px)';
const TABLET_MEDIAQUERY = 'screen and (min-width: 600px) and (max-width: 959px)';
const MONITOR_MEDIAQUERY = 'screen and (min-width: 960px)';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;
  @ViewChild('content', { static: true }) content: MatSidenavContent;

  langChangeUnsubscribe$: Subject<boolean> = new Subject();  
  selectedLanguage : SupportedLanguage = this.startupService.getCurrentLanguage();
  settings = this.startupService.getSettings();

  private layoutChangesSubscription: Subscription;

  private isMobileScreen = false;
  get isOver(): boolean {
    return this.isMobileScreen;
  }

  private contentWidthFix = true;
  @HostBinding('class.universum-content-width-fix') get isContentWidthFix() {
    return (
      this.contentWidthFix && this.settings.menuPosition === 'side' && this.settings.sidenavOpened && !this.isOver
    );
  }

  private collapsedWidthFix = true;
  @HostBinding('class.universum-sidenav-collapsed-fix') get isCollapsedWidthFix() {
    return (
      this.collapsedWidthFix && (this.settings.menuPosition === 'top' || (this.settings.sidenavOpened && this.isOver))
    );
  }

  constructor(private router: Router, private breakpointObserver: BreakpointObserver, private overlay: OverlayContainer,
    private element: ElementRef, private startupService: StartupService, @Optional() @Inject(DOCUMENT) private document: Document,
    @Inject(Directionality) public dir: AppDirectionality ) {
      this.dir.value = this.selectedLanguage.dir === 'ltr' ? 'ltr' : 'rtl';
      this.document.body.dir = this.dir.value;

    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_MEDIAQUERY, TABLET_MEDIAQUERY, MONITOR_MEDIAQUERY])
      .subscribe(state => {
        // SidenavOpened must be reset true when layout changes
        this.settings.sidenavOpened = true;

        this.isMobileScreen = state.breakpoints[MOBILE_MEDIAQUERY];
        this.settings.sidenavCollapsed = state.breakpoints[TABLET_MEDIAQUERY];
        this.contentWidthFix = state.breakpoints[MONITOR_MEDIAQUERY];
      });

    // TODO: Scroll top to container
    //this.router.events.subscribe(evt => {
    //  if (evt instanceof NavigationEnd) {
     //   this.content.scrollTo({ top: 0 });
     // }
    //});
  }

  ngOnInit() {
    setTimeout(() => (this.contentWidthFix = this.collapsedWidthFix = false));
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
    this.layoutChangesSubscription.unsubscribe();
  }

  toggleCollapsed() {
    this.settings.sidenavCollapsed = !this.settings.sidenavCollapsed;
    this.resetCollapsedState();
  }

  resetCollapsedState(timer = 400) {
    // TODO: Trigger when transition end
    //setTimeout(() => {
    //  this.settings.setNavState('collapsed', this.settings.sidenavCollapsed);
   // }, timer);
  }

  sidenavCloseStart() {
    this.contentWidthFix = false;
  }

  sidenavOpenedChange(isOpened: boolean) {
    this.settings.sidenavOpened = isOpened;
    //this.settings.setNavState('opened', isOpened);

    this.collapsedWidthFix = !this.isOver;
    this.resetCollapsedState();
  }
}
