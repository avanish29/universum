import { Component, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { merge, of as observableOf } from 'rxjs';
import { catchError, finalize, map, startWith, switchMap } from 'rxjs/operators';

import { UserDataService } from '../services/user.service';
import { ApplicationUserModel } from '../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmDialogService } from '@shared/components/confirm-dialog/confirm-dialog.service';

@Component({
    selector: 'user-list',
    templateUrl: '../pages/list-user.component.html',
    providers: [UserDataService]
})
export class UserListComponent implements AfterViewInit {
    query: string = "";
    displayedColumns: string[] = ['select', 'created', 'lastUpdate', 'username', 'firstName', 'lastName', 'emailAddress', 'failedLoginAttempts', 'lastLoginFailureTime', 'lastSuccessfulLoginTime'];
    data: ApplicationUserModel[] = [];
    selection = new SelectionModel<ApplicationUserModel>(true, []);

    resultsLength = 0;
    isLoadingResults = true;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private remoteSrv: UserDataService, private cdr: ChangeDetectorRef, private dialog: MatDialog, private dialogService: ConfirmDialogService) { }

    ngAfterViewInit() {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        this.loadUsers();
    }

    loadUsers(): void {
        merge(this.sort.sortChange, this.paginator.page).pipe(
            startWith({}),
            switchMap(
                () => {
                    this.isLoadingResults = true;
                    return this.remoteSrv!.getAllUsers(this.query, this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
                }
            ),
            map(
                response => {
                    this.isLoadingResults = false;
                    this.resultsLength = response.totalItems;
                    return response.contents;
                }
            ),
            catchError(
                () => {
                    this.isLoadingResults = false;
                    return observableOf([]);
                }
            )
        ).subscribe(response => this.data = response);
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ? this.selection.clear() : this.data.forEach(row => {
            //if(!row.isSystem) {
            this.selection.select(row)
            //}
        });
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: ApplicationUserModel): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} role ${row.id}`;
    }

    onDeleteAction() {
        const options = {
            title: 'Delete?',
            message: 'Are you sure you want to delete the selected items ?',
            cancelText: 'CANCEL',
            confirmText: 'YES, DELETE'
        };

        this.dialogService.open(options);

        this.dialogService.confirmed().subscribe(confirmed => {
            if (confirmed) {
                this.isLoadingResults = true;
                this.remoteSrv.deleteUsers(this.selection.selected.map(function (element) { return element.id; })).subscribe(
                    response => {
                        this.isLoadingResults = false;
                        this.selection.clear();
                        this.loadUsers();
                    },
                    (errorResp: HttpErrorResponse) => {
                        console.log(errorResp);
                        this.isLoadingResults = false;
                    },
                    () => {
                        console.log("Request Completed.")
                    }
                );
            }
        });
    }
}