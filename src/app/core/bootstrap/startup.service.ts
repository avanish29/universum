import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { MenuService } from '@core/bootstrap/menu.service';

export interface SupportedLanguage {
    code: string;
    label: string;
    dir: 'ltr' | 'rtl';
    isDefault: boolean;
}

export interface SystemSetting {
    theme: string;
    menuPosition: string;
    formFieldAppearance: 'legacy' | 'standard' | 'fill' | 'outline';
    supportedLanguages: SupportedLanguage[];
}

@Injectable({providedIn: 'root'})
export class StartupService {
    private settings: SystemSetting;
    private allLangsCode : Array<string> = [];
    private currentLanguage : SupportedLanguage;
    private langChangeObs$: BehaviorSubject<SupportedLanguage> = new BehaviorSubject(null);

    constructor(private menu: MenuService, private http: HttpClient, private translate: TranslateService) {}

    loadConfiguration(): Promise<SystemSetting>{
        return new Promise((resolve, reject) => {
            this.http
            .get('assets/data/setting.json?_t=' + Date.now())
            .pipe(
            catchError(res => {
                resolve();
                return throwError(res);
            })
            )
            .subscribe(
            (res: SystemSetting) => {
                this.settings = res;
                this.settings.supportedLanguages.forEach(language => {   
                    this.allLangsCode.push(language.code);
                    if(language.isDefault) this.currentLanguage = language;
                });
                this.translate.addLangs(this.allLangsCode);
                this.translate.setDefaultLang(this.currentLanguage.code);
            },
            () => {
                reject();
            },
            () => {
                resolve();
            }
            );
        });
    }

    getAllLanguages() : SupportedLanguage[] {
        return this.settings.supportedLanguages;
    }

    getSettings(): SystemSetting {
        return this.settings;
    }

    getCurrentLanguage() : SupportedLanguage {
        return this.currentLanguage;
    }

    getLangChangeObs(): Observable<SupportedLanguage> {
        return this.langChangeObs$.asObservable();
    }

    setCurrentLanguage(lang: string) : void {
        this.getAllLanguages().forEach(language => {   
            if(language.code === lang) {
                this.currentLanguage = language;
                this.langChangeObs$.next(this.currentLanguage);
            }
        });
    }
}