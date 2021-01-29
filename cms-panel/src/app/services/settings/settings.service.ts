import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  url = 'http://localhost:8080/api/settings';
  constructor(private http: HttpClient) {}

  getConfig(): any {
    return this.http.get(this.url);
  }

  updateLayout(body: any): any {
    return this.http.post(this.url + '-layout', body);
  }

  updateHeader(body: any): any {
    return this.http.post(this.url + '-header', body);
  }

  updateColors(body: any): any {
    return this.http.post(this.url + '-colors', body);
  }
}
