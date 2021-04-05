import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,  HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError, finalize } from 'rxjs/operators';

import { TokenService } from '@core/auth/token.service';
import { NotificationService } from '@core/services/notification.service';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private router: Router, private notificationService: NotificationService, private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add server host
    const url = req.url;

    // Only intercept API url
    if (!url.includes('/api/')) {
      return next.handle(req);
    }

    // All APIs need JWT authorization
    const headers = {
      'Accept': 'application/json',
      //'Accept-Language': this.settings.language,
      'Authorization': `Bearer ${this.tokenService.get().token}`,
    };

    const newReq = req.clone({ url, setHeaders: headers, withCredentials: false });

    return next.handle(newReq).pipe(
      mergeMap((event: HttpEvent<any>) => this.handleOkReq(event)),
      catchError((error: HttpErrorResponse) => this.handleErrorReq(error))
    );
  }

  private goto(url: string) {
    setTimeout(() => this.router.navigateByUrl(url));
  }

  private handleOkReq(event: HttpEvent<any>): Observable<any> {
    return of(event);
  }

  private handleErrorReq(error: HttpErrorResponse): Observable<never> {
    switch (error.status) {
      case 401:
        this.goto(`/login`);
        break;
      case 403:
      case 404:
      case 500:
        this.goto(`/error/${error.status}`);
        break;
      default:
        console.error('ERROR', error);
        /* if (error instanceof HttpErrorResponse) {
          console.error('ERROR', error);
          this.notificationService.showError(error.error.message || `${error.status} ${error.statusText}`);
        } */
        break;
    }
    return throwError(error);
  }
}
