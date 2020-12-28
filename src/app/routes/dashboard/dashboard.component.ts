import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { DashboardService } from './dashboard.srevice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardService],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private dashboardSrv: DashboardService, private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngAfterViewInit() {}

  ngOnDestroy() {}  
}
