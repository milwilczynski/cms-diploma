import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';

export interface HTML {
  html: any;
}

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  url = 'http://localhost:8080/api/sites';
  constructor(private http: HttpClient) {}

  getDom(fileUrl: string, selector: string) {
    return this.http.post<HTML>(this.url + '/htmlcontent', {
      dom: selector,
      url: fileUrl,
    });
  }
}
