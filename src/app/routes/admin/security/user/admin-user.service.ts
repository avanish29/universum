import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GithubApi } from './admin-user.component';

@Injectable()
export class AdminUserDataService {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sort: string, order: string, page: number = 0, perpage: number = 10): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl =
        `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + 1}&per_page=${perpage}`;

    return this._httpClient.get<GithubApi>(requestUrl);
  }
}