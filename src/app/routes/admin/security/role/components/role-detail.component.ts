import { Component, OnInit } from '@angular/core';

import { RoleDataService } from '../services/role.service';
import { Role } from '../models/role.model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'role-detail',
    templateUrl: '../pages/role-detail.component.html',
    providers: [RoleDataService]
})
export class RoleDetailComponent implements OnInit {
    roleFormGroup: FormGroup;
    model: Role;
    loading : boolean = false;

    constructor(private formBuilder: FormBuilder, private remoteSrv: RoleDataService, private route: ActivatedRoute){
        this.roleFormGroup = this.formBuilder.group({
            name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]([a-zA-Z0-9_]*[a-zA-Z0-9])?$/), Validators.maxLength(255), Validators.minLength(5)]],
            description: ['', [Validators.maxLength(255)]],
        });
    }

    ngOnInit() {
        this.loadRole();
    }

    saveRole(): void {
        console.log("Save requested.");
    }

    private loadRole(): void {
        this.remoteSrv.getRole(this.route.snapshot.params.roleId).subscribe(
            response => {
                this.model = response;
                this.initForm();
            },
            error => console.log(error),
            () => console.log("Request Completed.")
        );
    }

    private initForm(): void {
        const keys = Object.keys(this.roleFormGroup.controls);
        keys.forEach(key => {
            this.roleFormGroup.controls[key].setValue(this.model[key]);
        });
    }
}