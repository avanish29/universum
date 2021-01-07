import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BrowseDynamicPagesDataService } from './browse-dynamic-pages.service';
import {merge, Observable, of as observableOf, Subscription} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

const PAGE_TITLE : string = 'pages.${pageName}.browse.title';
const PAGE_SUBTITLE : string = 'pages.${pageName}.browse.subtitle';
const PAGE_HELPTEXT : string = 'pages.${pageName}.browse.helptext';

@Component({
    selector: 'browse-dynamic-pages',
    templateUrl: './browse-dynamic-pages.component.html',
    styleUrls: ['./browse-dynamic-pages.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [BrowseDynamicPagesDataService]
})
export class BrowseDynamicPagesComponent implements OnInit {    
    public pageName : string;
    public resultsLength : number = 0;
    public isLoadingResults : boolean = true;

    private dataSubscription: Subscription | null;
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private remoteSrv: BrowseDynamicPagesDataService, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute) { }
    
    ngOnInit() {    
        this.initDynamicData();    
        this.dataSubscription = this.activatedRoute.params.subscribe(( data ) => {
            var newPageName = this.activatedRoute.snapshot.params.pageName;
            if(newPageName !== this.pageName) {
                this.initDynamicData();
                this.cdr.detectChanges();
            }
        });
    }

    public getPageTitle(): string {
        return PAGE_TITLE.replace("${pageName}", this.pageName);
    }

    public getPageSubtitle(): string {
        return PAGE_SUBTITLE.replace("${pageName}", this.pageName);
    }

    public getPageHelptext(): string {
        return PAGE_HELPTEXT.replace("${pageName}", this.pageName);
    }
    
    private initDynamicData() : void {
        this.pageName = this.activatedRoute.snapshot.paramMap.get('pageName');
    }
}