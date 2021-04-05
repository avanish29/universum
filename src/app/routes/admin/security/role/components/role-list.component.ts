import { Component, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

import { AddRoleDialog } from './role-add-dialog.component';
import { RoleDataService } from '../services/role.service';
import { Role } from '../models/role.model';
import { ConfirmDialogService } from '@shared/components/confirm-dialog/confirm-dialog.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'role-list',
    templateUrl: '../pages/role-list.component.html',
    providers: [RoleDataService]
})
export class RoleListComponent implements AfterViewInit {
    query: string = "name:abc";
    displayedColumns: string[] = ['select', 'editaction', 'created', 'name', 'description', 'isSystem'];
    data: Role[] = [];
    selection = new SelectionModel<Role>(true, []);
  
    resultsLength = 0;
    isLoadingResults = true;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private remoteSrv: RoleDataService, private cdr: ChangeDetectorRef, private dialog: MatDialog, private dialogService: ConfirmDialogService) { }

    ngAfterViewInit() {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        this.loadRoles();
    }

    loadRoles(): void {
        merge(this.sort.sortChange, this.paginator.page).pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;
                return this.remoteSrv!.getAllRoles(this.query, this.sort.active, this.sort.direction, this.paginator.pageIndex,  this.paginator.pageSize);
            }),
            map(data => {
                // Flip flag to show that loading has finished.
                this.isLoadingResults = false;
                this.resultsLength = data.totalItems;
                return data.contents;
            }),
            catchError(() => {
                this.isLoadingResults = false;
                return observableOf([]);
            })
        ).subscribe(data => this.data = data);
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
            if(!row.isSystem) {
                this.selection.select(row)
            }
        });
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Role): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} role ${row.name}`;
    }

    openAddDialog() {
        const dialogRef = this.dialog.open(AddRoleDialog, { width: '500px'});
    
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
          if(result === 'SUCCESS') {
            this.loadRoles();
          }
        });
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
                this.remoteSrv.deleteRoles(this.selection.selected.map(function(element) {return element.id;})).subscribe(
                    response => {
                        this.isLoadingResults = false;
                        this.selection.clear();
                        this.loadRoles();
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