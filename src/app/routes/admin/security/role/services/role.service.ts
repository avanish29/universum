import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/role.model';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

const API_BASE_URL : string = environment.api_base_url;
const ROLES_PATH = API_BASE_URL + 'api/admin/security/roles';

@Injectable()
export class RoleDataService {
  constructor(private http: HttpClient) {}

  getAllRoles(query: string = "", sort: string, order: string, page: number = 0, perpage: number = 10) : Observable<PageResponse<Role>> {
    const requestUrl = `${ROLES_PATH}?query=${query}&sort=${sort}&order=${order}&offset=${page}&limit=${perpage}`;
    return this.http.get<PageResponse<Role>>(requestUrl);
  }

  getRole(roleId: number) : Observable<Role> {
    const requestUrl = `${ROLES_PATH}`+ `/`+ roleId;
    return this.http.get<Role>(requestUrl);
  }

  addRole(createRequestBody: Role) : Observable<Role> {
    return this.http.post<Role>(ROLES_PATH, createRequestBody);
  }

  updateRole(roleId: number, updateRequestBody: Role) : Observable<Role> {
    return this.http.put<Role>(`${ROLES_PATH}`+ `/`+ roleId, updateRequestBody);
  }

  deleteRole(roleId: number) : Observable<void> {
    return this.http.delete<void>(`${ROLES_PATH}`+ `/`+ roleId);
  }

  deleteRoles(roleIds: number[]) : Observable<void> {
    return this.http.delete<void>(`${ROLES_PATH}?ids=`+ roleIds.join(","));
  }
}