import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filter, map, take } from 'rxjs/operators';
import { FormDialogComponent } from './form.dialog.component';
import { FormDialogData } from './form-dialog.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationStart, Router } from '@angular/router';

@Injectable()
export class FormDialogService implements OnDestroy {
    dialogRef: MatDialogRef<FormDialogComponent>;
    dialogSubmitSubscription: Subscription;

    constructor(private router: Router, private dialog: MatDialog) { 
        this.router.events.pipe(
            filter(event => event instanceof NavigationStart)
        ).subscribe((event: NavigationStart) => {
            this.close();
        });
    }

    public open(options: FormDialogData): Observable<any> {
        const formData = JSON.parse(JSON.stringify(options));
        this.dialogRef = this.dialog.open(FormDialogComponent, {
            data: formData
        });

        this.dialogRef.afterClosed().subscribe(result => {
            this.dialogSubmitSubscription.unsubscribe();
        });

        return this.subscribeEvent();
    }

    public onSuccess(): void {
        this.close();
    }

    public onError(error: Error): Observable<any> {
        let message: string;
        if (error instanceof HttpErrorResponse) {
            message = error.error.message || `${error.status} ${error.statusText}`;
        } else {
            message = error.message ? error.message : error.toString();
        }
        this.dialogRef.componentInstance.showErrorMsg(message);
        return this.subscribeEvent();
    }

    private close() {
        if(this.dialogRef) {
            this.dialogRef.close();
        }
    }

    private subscribeEvent(): Observable<any> {
        return new Observable(observer => {
            this.dialogSubmitSubscription = this.dialogRef.componentInstance.submitClicked.subscribe(result => {
                observer.next(result);
                this.dialogSubmitSubscription.unsubscribe();
            })
        });
    }

    ngOnDestroy() {
        if(this.dialogRef) this.dialogRef.componentInstance.submitClicked.unsubscribe;
    }
}