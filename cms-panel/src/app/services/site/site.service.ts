import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Site } from './site';

export interface HTML {
  html: any;
}

@Injectable({
  providedIn: 'root',
})
export class SiteService {
  url = 'http://localhost:8080/api/sites';

  constructor(private http: HttpClient) {}

  getAllSites() {
    return this.http.get<Site[]>(this.url);
  }

  uploadSite(file: FormData) {
    this.http
      .post(this.url + '/add', file, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe((events) => {
        if (events.type === HttpEventType.UploadProgress) {
          console.log(
            'Upload progress: ' +
              Math.round(events.loaded / events.total!) * 100 +
              '%'
          );
        } else events.type === HttpEventType.Response;
        {
          console.log(events);
        }
      });
  }

  deleteSite(id: number) {
    return this.http
      .delete(this.url + '/' + id + '/delete')
      .subscribe((response) => {
        console.log(response);
      });
  }

  getContent(dom: string, fileUrl: string) {
    return this.http.post<HTML>(this.url + '/htmlcontent', {
      dom: dom,
      url: fileUrl,
    });
  }

  updateContent(dom: string, fileUrl: string, content: string) {
    return this.http.post(this.url + '/htmlcontent/update', {
      dom: dom,
      content: content,
      file: fileUrl,
    });
  }

  getDashboardInfo() {
    return this.http.get(this.url + '/main');
  }

  toggleNavigation(id: number) {
    return this.http.get(this.url + '/' + id + '/navigation');
  }
}
