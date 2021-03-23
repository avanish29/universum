import { HttpErrorResponse } from '@angular/common/http';
import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Role } from '../models/role.model';
import { RoleDataService } from '../services/role.service';

@Component({
    selector: 'add-role-dialog',
    templateUrl: '../pages/role-add-dialog.component.html',
    providers: [RoleDataService]
})
export class AddRoleDialog {
    addRoleFormGroup: FormGroup;
    model = {} as Role;
    errorMsg: String = "";
    loading: boolean = false;

    constructor(private formBuilder: FormBuilder, private remoteSrv: RoleDataService, private dialog: MatDialog, private dialogRef: MatDialogRef<AddRoleDialog>){
        this.addRoleFormGroup = this.formBuilder.group({
            name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]([a-zA-Z0-9_]*[a-zA-Z0-9])?$/), Validators.maxLength(255), Validators.minLength(5)]],
            description: ['', [Validators.maxLength(255)]],
        });
    }

    closeAlert() {
        this.errorMsg = "";
    }

    onAddRole() : void {
        this.loading = true;
        this.model = Object.assign(this.model, this.addRoleFormGroup.value);
        console.log(this.model);
        this.remoteSrv.addRole(this.model).subscribe(
            response => {
                this.loading = false;
                this.model = response;
                this.dialogRef.close('SUCCESS');
            },
            (errorResp: HttpErrorResponse) => {
                console.log(errorResp);
                this.errorMsg = errorResp.error.message;
                this.loading = false;
            },
            () => {
                console.log("Request Completed.")
            }
        );
    }
}