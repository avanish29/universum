import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AdminRoleDataService } from './admin-role.service';

@Component({
    selector: 'admin-security-roles',
    templateUrl: './admin-role.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AdminRoleDataService]
})
export class AdminRoleComponent implements OnInit {
    constructor(private remoteSrv: AdminRoleDataService, private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        //this.getData();
    }
}