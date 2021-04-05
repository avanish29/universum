import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { NotificationService } from '../services/notification.service'

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) {}

     handleError(error: Error): void {
        let message: string;
        if (error instanceof HttpErrorResponse) {
            console.error('ERROR', error);
            message = error.error.message || `${error.status} ${error.statusText}`;
        } else {
            message = this.getErrorMessage(error);
        }
        this.injector.get(NotificationService).showError(message);
    }

    getErrorMessage(error: Error): string {    
        return error.message ? error.message : error.toString();
    }

    getHttpErrorMessage(error: HttpErrorResponse): string {
        return navigator.onLine ? error.message : 'No Internet Connection';
    }
}