import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';

export interface FormDialogData {
    model: any;
    options: FormlyFormOptions;
    formFields: FormlyFieldConfig[];
    title: string;
}