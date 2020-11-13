import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:8080/api/user';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.url);
  }
}
