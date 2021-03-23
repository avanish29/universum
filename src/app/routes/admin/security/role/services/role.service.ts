import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/role.model';
import { Observable } from 'rxjs';

const SECURITY_SERVICE_BASE_URL = 'http://gateway-service:9090/services/security';
const ROLES_PATH = SECURITY_SERVICE_BASE_URL + '/roles';
const ROLE_BY_ID_PATH = ROLES_PATH + '/${roleId}';

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