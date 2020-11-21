import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { Token } from '../../models/token';

@Injectable()
export class AuthService {
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  authenticate(credentials) {
    return this.http
      .post(this.url + '/user/login', {
        email: credentials.email,
        password: credentials.password,
      })
      .pipe(
        map((result: Token) => {
          if (result && result.token) {
            localStorage.setItem('token', result.token);
            return true;
          }
          return false;
        })
      );
  }

  createOrUpdate(credentials) {
    return this.http.post(this.url + '/user/create', credentials);
  }

  logout() {
    return this.http
      .delete(this.url + '/user/logout/' + this.currentUser.userId)
      .pipe(
        map(() => {
          localStorage.removeItem('token');
        })
      );
  }

  isLoggedIn() {
    const jwtHelperService = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return !jwtHelperService.isTokenExpired(token);
  }

  get currentUser() {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    return new JwtHelperService().decodeToken(token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
