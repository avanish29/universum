import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

const API_BASE_URL : string = environment.api_base_url;
const PUBLIC_LANGUAGE_URL = API_BASE_URL + 'languages/';

@Injectable({ providedIn: 'root' })
export class I18Service implements TranslateLoader {
 

  constructor( private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(PUBLIC_LANGUAGE_URL + `${lang}/messages`).pipe(map((response: JSON) => {      
      return response;
    }),
    publishReplay(1),
    refCount());
  } 
}
