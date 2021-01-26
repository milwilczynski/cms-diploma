import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dashboard } from './dashboard.interface';
import { Role } from './role.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  url = 'http://localhost:8080/api/roles';
  constructor(private http: HttpClient) {}

  getAllRoles() {
    return this.http.get<Role[]>(this.url);
  }

  getDashboard() {
    return this.http.get<Dashboard>(this.url + '-dashboard');
  }

  deleteRole(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  addRole(body: any) {
    return this.http.put(this.url, body);
  }

  editRole(body: any) {
    return this.http.post(this.url, body);
  }

  fetchRole(id: number) {
    return this.http.get<Role>(this.url + '/' + id);
  }
}
