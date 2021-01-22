import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Auth {
  token: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  url = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  authUser(body: any): Observable<any> {
    return this.http.post<Auth>(this.url + '/auth', body);
  }
}
