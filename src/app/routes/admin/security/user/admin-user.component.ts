import { Component, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminUserDataService } from './admin-user.service';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

export interface GithubApi {
    items: GithubIssue[];
    total_count: number;
}

export interface GithubIssue {
    created_at: string;
    number: string;
    state: string;
    title: string;
}

@Component({
    selector: 'admin-security-users',
    templateUrl: './admin-user.component.html',
    styleUrls: ['./admin-user.component.scss'],
    //changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AdminUserDataService]
})
export class AdminUserComponent implements AfterViewInit {
    // TODO remove this. This is just to test material data grid.
    displayedColumns: string[] = ['created', 'state', 'number', 'title', 'actions'];
    data: GithubIssue[] = [];
  
    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private remoteSrv: AdminUserDataService, private cdr: ChangeDetectorRef) { }

    ngAfterViewInit() {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    return this.remoteSrv!.getRepoIssues(
                        this.sort.active, this.sort.direction, this.paginator.pageIndex,  this.paginator.pageSize);
                }),
                map(data => {
                    // Flip flag to show that loading has finished.
                    this.isLoadingResults = false;
                    this.isRateLimitReached = false;
                    this.resultsLength = data.total_count;

                    return data.items;
                }),
                catchError(() => {
                    this.isLoadingResults = false;
                    // Catch if the GitHub API has reached its rate limit. Return empty data.
                    this.isRateLimitReached = true;
                    return observableOf([]);
                })
            ).subscribe(data => this.data = data);
    }    
}