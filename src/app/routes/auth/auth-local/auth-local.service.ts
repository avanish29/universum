import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationResponse } from './auth-local.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService } from '@core';

const API_BASE_URL = 'http://gateway-service:9090';
const LOGIN_PATH = '/authenticate';

@Injectable()
export class LocalAuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  authenticate(userName: String, passWord: String): Observable<AuthenticationResponse> {
    const requestUrl = `${API_BASE_URL + LOGIN_PATH}`;
    return this.http.post<AuthenticationResponse>(requestUrl, { 'username': userName, 'password': passWord})
    .pipe(map(response => {
        const tokenModel : any = { token: response.authToken };
        this.tokenService.set(tokenModel);
        return response;
    }));
  }
}