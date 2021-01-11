import { Component, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminRoleDataService } from './admin-role.service';
import { Role } from './admin-role.model';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'admin-security-roles',
    templateUrl: './admin-role.component.html',
    providers: [AdminRoleDataService]
})
export class AdminRoleComponent implements AfterViewInit {
    query: string = "name:abc";
    displayedColumns: string[] = ['select', 'editaction', 'id', 'created', 'name', 'description', 'isSystem'];
    data: Role[] = [];
    selection = new SelectionModel<Role>(true, []);
  
    resultsLength = 0;
    isLoadingResults = true;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private remoteSrv: AdminRoleDataService, private cdr: ChangeDetectorRef) { }

    ngAfterViewInit() {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        this.loadRoles();
    }

    loadRoles(): void {
        merge(this.sort.sortChange, this.paginator.page).pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;
                return this.remoteSrv!.getData(this.query, this.sort.active, this.sort.direction, this.paginator.pageIndex,  this.paginator.pageSize);
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
        this.isAllSelected() ? this.selection.clear() : this.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Role): string {
        if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} role ${row.name}`;
    }
}  