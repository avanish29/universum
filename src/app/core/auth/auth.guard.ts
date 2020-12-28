import { Injectable, Inject, Optional } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { StartupService } from '@core/bootstrap/startup.service';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  LOGIN_URL : string = '/auth/';

  private gotoLogin(url?: string) {
    setTimeout(() => {
      if (/^https?:\/\//g.test(url!)) {
        this.document.location.href = url as string;
      } else {
        this.router.navigateByUrl(url);
      }
    });
  }

  private checkJWT(model: any, offset?: number): boolean {
    return !!model?.token;
  }

  private process(): boolean {
    let redirectURL : string = this.LOGIN_URL + this.startupService.getSystemLoginType();
    const res = true;
    if (!res) {
      this.gotoLogin(redirectURL);
    }
    return res;
  }

  constructor( private router: Router, @Optional() @Inject(DOCUMENT) private document: any, private startupService : StartupService ) {}

  // lazy loading
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.process();
  }
  // route
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.process();
  }
  // all children route
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.process();
  }
}
