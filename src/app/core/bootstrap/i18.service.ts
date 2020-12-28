import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class I18Service implements TranslateLoader {
  I18_SERVICE_URL : string = environment.i18_service_url;

  constructor( private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(this.I18_SERVICE_URL  + `${lang}.json?_t=` + Date.now()).pipe(map((response: JSON) => {      
      return response;
    }),
    publishReplay(1),
    refCount());
  } 
}
