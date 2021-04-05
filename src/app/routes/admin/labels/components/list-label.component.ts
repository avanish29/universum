import { Component, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import {distinctUntilChanged, finalize} from 'rxjs/operators';

import { LabelDataService } from '../services/label.service';
import { LabelModel, LanguageModel } from '../models/label.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmDialogService } from '@shared/components/confirm-dialog/confirm-dialog.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { FormDialogService } from '@shared/components/form-dialog/form.dialog.service';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
    selector: 'label-list',
    templateUrl: '../pages/list-label.component.html',
    styleUrls: ['../styles/list-label.component.scss']
})
export class LabelListComponent implements OnInit, AfterViewInit, OnDestroy {
    query: string = "";
    displayedColumns: string[] = ['labelKey', 'labelValue', 'actions'];
    dataSource: MatTableDataSource<LabelModel> = new MatTableDataSource();
    
    languages: LanguageModel[] = [];
    selectedLanguage: LanguageModel;

    searchForm: FormGroup;
  
    resultsLength = 0;
    isLoadingResults = true;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private remoteSrv: LabelDataService, private dialogService: ConfirmDialogService, private formDialogService: FormDialogService) { }

    ngAfterViewInit() {
    }

    ngOnInit() {
        this.searchFormInit();
        this.loadLanguagesAndLabels();
        this.searchForm.valueChanges.pipe(distinctUntilChanged()).subscribe(model => {
            const filterValue = model.labelKey + '$' + model.labelValue;
            this.dataSource.filter = filterValue.trim().toLowerCase();
        });
    }

    ngOnDestroy() {

    }

    searchFormInit() {
        this.searchForm = new FormGroup({
            labelKey: new FormControl(''),
            labelValue: new FormControl('')
        });
    }

    loadLanguagesAndLabels(): void {
        this.remoteSrv.loadLanguagesAndMessages().pipe(
            finalize(
                () => {
                    this.isLoadingResults = false;
                }
            )
        ).subscribe(
            responses => {
                this.languages = responses[0];
                this.resetSelectedLangToDefault();
                this.parseLabelResponse(responses[1]);
            }
        );
    }

    loadLanguages(): void {
        this.remoteSrv.getAllLanguages().pipe(
            finalize(
                () => {
                    this.isLoadingResults = false;
                }
            )
        ).subscribe(
            response => {
                this.languages = response;
            }
        );
    }

    loadLabels(): void {
        this.remoteSrv.getLabelsForLanguage(this.getSelectedLangCode()).pipe(
            finalize(
                () => {
                    this.isLoadingResults = false;
                }
            )
        ).subscribe(
            response => {
                this.parseLabelResponse(response);
            }
        );
    }

    parseLabelResponse(labelResponse: Map<string, string>):void {
        let responseData : LabelModel[] = [];
        for (let key in labelResponse) {
            let value = labelResponse[key];
            let labelModel = {labelKey: key, labelValue: value}
            responseData.push(labelModel);
        }
        this.resultsLength = responseData.length;
        this.dataSource = new MatTableDataSource<LabelModel>(responseData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.getFilterPredicate();
    }

    getFilterPredicate() {
        return (row: LabelModel, filters: string) => {
            // split string per '$' to array
            const filterArray = filters.split('$');
            const filterKey = filterArray[0];
            const filterValue = filterArray[1];

            const matchFilter = [];

            // Fetch data from row
            const columnLabelKey = row.labelKey;
            const columnLabelValue = row.labelValue;

            // verify fetching data by our searching values
            const customFilterKey = columnLabelKey.toLowerCase().includes(filterKey);
            const customFilterValue = columnLabelValue.toLowerCase().includes(filterValue);

            // push boolean values into array
            matchFilter.push(customFilterKey);
            matchFilter.push(customFilterValue);

            // return true if all values in array is true
            // else return false
            return matchFilter.every(Boolean);
        }
    }

    onLanguageChange(selectedValue: LanguageModel) {
        this.selectedLanguage = selectedValue;
        this.loadLabels();
    }

    isDefaultLanguageSelected(): boolean {
        return this.languages.find(language => language.code === this.selectedLanguage.code).isDefault;
    }

    openDialog(selectedRow: LabelModel) {
        this.formDialogService.open({
            model: selectedRow ? selectedRow : {},
            options: {},
            formFields: [
                {
                    key: 'labelKey',
                    type: 'input',
                    templateOptions: {
                        label: 'Key',
                        placeholder: 'Enter label key here!',
                        required: true,
                        disabled: selectedRow ? true : false
                    }
                }, {
                    key: 'labelValue',
                    type: 'input',
                    templateOptions: {
                        label: 'Value',
                        placeholder: 'Enter label value here!'
                    }
                }
            ],
            title: selectedRow ? "Edit Label" : "New Label"
        }).subscribe((result : LabelModel) => {
            this.upsertLabel(result, selectedRow ? true : false);
        });
    }

    openLanguageDialog(selectedLang: LanguageModel) {
        this.formDialogService.open({
            model: selectedLang ? selectedLang : {},
            options: {},
            formFields: [
                {
                    key: 'code',
                    type: 'input',
                    templateOptions: {
                        label: 'Language code',
                        placeholder: 'Enter language code here!',
                        required: true,
                        disabled: selectedLang ? true : false
                    }
                }, {
                    key: 'label',
                    type: 'input',
                    templateOptions: {
                        label: 'Display Name',
                        placeholder: 'Enter language display name here!',
                        required: true
                    }
                }, {
                    key: 'dir',
                    type: 'select',
                    defaultValue: 'LTR',
                    templateOptions: {
                        label: 'Language Direction',
                        placeholder: 'Select language direction',
                        required: true,
                        options: [
                            { label: 'Left-to-Right', value: 'LTR' },
                            { label: 'Right-to-Left', value: 'RTL' }
                        ]
                    }
                }
            ],
            title: selectedLang ? "Edit Language" : "New Language"
        }).subscribe((result : LanguageModel) => {
            this.upsertLanguage(result, selectedLang ? true : false);
        });
    }

    onDeleteLanguage() {
        this.dialogService.open({
            title: 'Delete Language?',
            message: 'Are you sure you want to delete the selected language ?',
            cancelText: 'CANCEL',
            confirmText: 'YES, DELETE'
        });
        this.dialogService.confirmed().subscribe(confirmed => {
            if (confirmed) {
                this.isLoadingResults = true;
                this.remoteSrv.deleteLanguage(this.selectedLanguage.code).subscribe(
                    () => {
                        this.isLoadingResults = false;
                        this.loadLanguagesAndLabels();
                    },
                    (errorResp: HttpErrorResponse) => {
                        this.isLoadingResults = false;
                    }
                );
            }
        });
    }

    onDeleteLabel(selectedRow: LabelModel) {
        const options = {
            title: 'Delete?',
            message: 'Are you sure you want to delete the selected item ?',
            cancelText: 'CANCEL',
            confirmText: 'YES, DELETE'
        };

        this.dialogService.open(options);

        this.dialogService.confirmed().subscribe(confirmed => {
            if (confirmed) {
                this.isLoadingResults = true;
                this.remoteSrv.deleteLabel(null, selectedRow.labelKey).subscribe(
                    () => {
                        this.isLoadingResults = false;
                        this.loadLabels();
                    },
                    (errorResp: HttpErrorResponse) => {
                        this.isLoadingResults = false;
                    }
                );
            }
        });
    }

    private getSelectedLangCode(): string {
        return this.selectedLanguage ? this.selectedLanguage.code : "en_US";
    }

    private resetSelectedLangToDefault() {
        this.selectedLanguage = this.languages.find(language => language.isDefault);
    }

    private upsertLabel(model : LabelModel, isEditMode: boolean) {
        if(isEditMode) {
            this.remoteSrv.updateLabel(this.getSelectedLangCode(), model).subscribe(
                () => {
                    this.loadLabels();
                    this.formDialogService.onSuccess();
                },
                err => {
                    this.formDialogService.onError(err).subscribe((result : LabelModel) => this.upsertLabel(result, isEditMode));
                }
            );
        } else {
            this.remoteSrv.addLabel(this.getSelectedLangCode(), model).subscribe(
                () => {
                    this.loadLabels();
                    this.formDialogService.onSuccess();
                },
                err => {
                    this.formDialogService.onError(err).subscribe((result : LabelModel) => this.upsertLabel(result, isEditMode));
                }
            );
        }
    }

    private upsertLanguage(model: LanguageModel, isEditMode: boolean) {
        if(isEditMode) {
            this.remoteSrv.updateLanguage(this.getSelectedLangCode(), model).subscribe(
                () => {
                    this.loadLanguagesAndLabels();
                    this.formDialogService.onSuccess();
                },
                err => {
                    this.formDialogService.onError(err).subscribe((result : LanguageModel) => this.upsertLanguage(result, isEditMode));
                }
            );
        } else {
            this.remoteSrv.addLanguage(model).subscribe(
                () => {
                    this.loadLanguagesAndLabels();
                    this.formDialogService.onSuccess();
                },
                err => {
                    this.formDialogService.onError(err).subscribe((result : LanguageModel) => this.upsertLanguage(result, isEditMode));
                }
            );
        }
    }
}