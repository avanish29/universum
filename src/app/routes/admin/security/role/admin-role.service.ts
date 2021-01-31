import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageResponse, Role } from './admin-role.model';

const SECURITY_SERVICE_BASE_URL = 'http://gateway-service:9090/api/security-service';
const ROLES_PATH = '/roles';

@Injectable()
export class AdminRoleDataService {
  constructor(private http: HttpClient) {}

  getData(query: string = "", sort: string, order: string, page: number = 0, perpage: number = 10) {
    const requestUrl = `${SECURITY_SERVICE_BASE_URL + ROLES_PATH}?query=${query}&sort=${sort}&order=${order}&offset=${page}&limit=${perpage}`;
    return this.http.get<PageResponse<Role>>(requestUrl);
  }
}