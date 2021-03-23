import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../../../environments/environment';

export interface SupportedLanguage {
    code: string;
    label: string;
    dir: 'LTR' | 'RTL';
    isDefault: boolean;
}

export interface SystemSetting {
    dir?: 'LTR' | 'RTL';
    theme?: 'light' | 'dark';
    menuPosition?: 'side' | 'top';
    sidenavOpened: boolean;
    sidenavCollapsed: boolean;
    registrationEnabled: boolean;
    headerPos: 'above' | 'fixed' | 'static';
    formFieldAppearance: 'legacy' | 'standard' | 'fill' | 'outline';
    loginType: 'default' | 'sso' | 'ldap' | 'okta';
    supportedLanguages: SupportedLanguage[];
}

@Injectable({providedIn: 'root'})
export class StartupService {
    API_BASE_URL : string = environment.api_base_url;
    private settings: SystemSetting;
    private allLangsCode : Array<string> = [];
    private currentLanguage : SupportedLanguage;
    private langChangeObs$: BehaviorSubject<SupportedLanguage> = new BehaviorSubject(null);

    constructor(private http: HttpClient, private translate: TranslateService) {}

    loadConfiguration(): Promise<SystemSetting>{
        return new Promise((resolve, reject) => {
            this.http
            .get(this.API_BASE_URL + 'settings')
            .pipe(
            catchError(res => {
                resolve(null);
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
                this.settings.dir = this.currentLanguage.dir;
                this.translate.addLangs(this.allLangsCode);
                this.translate.setDefaultLang(this.currentLanguage.code);
            },
            () => {
                reject();
            },
            () => {                
                resolve(null);
            }
            );
        });
    }

    get registrationEnabled() {
        return this.settings.registrationEnabled;
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

    getSystemLoginType(): string {
        let loginType : string = 'local';
        switch(this.settings.loginType) {
            case "sso":
                loginType = 'sso';
                break;
            case "okta":
                loginType = 'oauth';
                break;
        }
        return loginType;
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