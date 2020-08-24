import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService } from '@core/bootstrap/menu.service';

export interface SystemSupportedLanguage {
    langcode: string;
    langlable: string;
    langtranslation: string;
    langdir: string;
    langisSystemDefault: boolean;
    langlabel: string;
}

export interface SystemSetting {
    sysdefaulttheme: string;
    sysdefaultmenuposition: string;
    syssupportedlanguage: SystemSupportedLanguage[];
}

@Injectable({providedIn: 'root'})
export class StartupService {
    private settings: SystemSetting;

    constructor(private menu: MenuService, private http: HttpClient) {}

    loadConfiguration(): Promise<any>{
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
            (res: any) => {
                //this.menu.recursMenuForTranslation(res.menu, 'menu');
                //this.menu.set(res.menu);
                this.settings = res;
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
}