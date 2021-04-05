import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Inject, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormDialogData } from './form-dialog.model';

@Component({
    //changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'form-dialog',
    templateUrl: './form-dialog.component.html'
})
export class FormDialogComponent {
    form = new FormGroup({});
    formData : FormDialogData;
    errorMsg: String = "";
    loading: boolean = false;
    @Output() submitClicked: EventEmitter<any> = new EventEmitter<any>();

    constructor(private dialogRef: MatDialogRef<FormDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: FormDialogData){
        this.formData = data;
    }

    @HostListener("keydown.esc")
    public onEsc() {
        this.onClose(false);
    }

    public onCancel() {
        this.onClose(false);
    }

    public onClose(value) {
        this.dialogRef.close(value);
    }

    public closeAlert() {
        this.errorMsg = "";
    }

    public onSubmit() {
        this.submitClicked.emit(this.formData.model);
    }

    public showErrorMsg(msg: string) {
        this.errorMsg = msg;
    }
}