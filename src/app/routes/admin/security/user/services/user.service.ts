import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ApplicationUserModel } from '../models/user.model';

const API_BASE_URL : string = environment.api_base_url;
const USERS_PATH = API_BASE_URL + 'api/admin/security/users';

@Injectable()
export class UserDataService {
    constructor(private http: HttpClient) {}

    getAllUsers(query: string = "", sort: string, order: string, page: number = 0, perpage: number = 10) : Observable<PageResponse<ApplicationUserModel>> {
        const requestUrl = `${USERS_PATH}?query=${query}&sort=${sort}&order=${order}&offset=${page}&limit=${perpage}`;
        return this.http.get<PageResponse<ApplicationUserModel>>(requestUrl);
    }

    getUser(userId: number) : Observable<ApplicationUserModel> {
        const requestUrl = `${USERS_PATH}`+ `/`+ userId;
        return this.http.get<ApplicationUserModel>(requestUrl);
    }

    addUser(createRequestBody: ApplicationUserModel) : Observable<ApplicationUserModel> {
        return this.http.post<ApplicationUserModel>(USERS_PATH, createRequestBody);
    }

    updateUser(userId: number, updateRequestBody: ApplicationUserModel) : Observable<ApplicationUserModel> {
        return this.http.put<ApplicationUserModel>(`${USERS_PATH}`+ `/`+ userId, updateRequestBody);
    }

    deleteUser(userId: number) : Observable<void> {
        return this.http.delete<void>(`${USERS_PATH}`+ `/`+ userId);
    }

    deleteUsers(userIds: number[]) : Observable<void> {
        return this.http.delete<void>(`${USERS_PATH}?ids=`+ userIds.join(","));
    }
}