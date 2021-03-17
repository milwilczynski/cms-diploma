import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard } from '../posts/dashboard.interface';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  getAllUsers(): any {
    return this.http.get<User[]>(this.url);
  }

  getUsersByRole(role: number): any {
    return this.http.get<User[]>(
      'http://localhost:8080/api/role/' + role + '/user'
    );
  }

  deleteUser(id: number): any {
    return this.http.delete(this.url + '/' + id);
  }

  getUser(id: number): any {
    return this.http.get<User>(this.url + '/' + id);
  }

  getDashboard(): any {
    return this.http.get<Dashboard>(this.url + '-dashboard');
  }

  addUser(body: any): any {
    return this.http.put(this.url, body);
  }

  editUser(body: any): any {
    return this.http.post(this.url + '-edit', body);
  }
}
