import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationResponse } from './forgot-password.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService } from '@core';

const API_BASE_URL = 'http://gateway-service:9090';
const LOGIN_PATH = '/authenticate';

@Injectable()
export class ForgotPasswordService {
  constructor(private http: HttpClient) {}

  recoverPassword(userName: String): Observable<AuthenticationResponse> {
    const requestUrl = `${API_BASE_URL + LOGIN_PATH}`;
    return this.http.post<AuthenticationResponse>(requestUrl, { 'username': userName})
    .pipe(map(response => {
        const tokenModel : any = { token: response.authToken };
        return response;
    }));
  }
}