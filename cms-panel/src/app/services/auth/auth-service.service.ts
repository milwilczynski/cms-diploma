import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Auth {
  token: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  jwtHelper: JwtHelperService;
  url = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

  authUser(body: any): Observable<any> {
    return this.http.post<Auth>(this.url + '-auth', body).pipe(
      map((result: Auth) => {
        if (result && result.token) {
          localStorage.setItem('token', result.token);
          return true;
        }
        return false;
      })
    );
  }

  logout() {
    /*
    return this.http
      .delete(this.url + '/user/logout/' + this.currentUser.userId)
      .pipe(
        map(() => {
          localStorage.removeItem('token');
        })
      );
      */
    try {
      localStorage.removeItem('token');
      return true;
    } catch (err) {
      return err;
    }
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  currentUser() {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    return this.jwtHelper.decodeToken(token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
