import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class I18Service implements TranslateLoader {
  API_BASE_URL : string = environment.api_base_url;

  constructor( private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(this.API_BASE_URL  + `messages/${lang}`).pipe(map((response: JSON) => {      
      return response;
    }),
    publishReplay(1),
    refCount());
  } 
}
