import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Site } from './site';

export interface HTML{
  html: any;
}

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  url = 'http://localhost:8080/api/sites';

  constructor(private http: HttpClient) { }

  getAllSites(){
    return this.http.get<Site[]>(this.url);
  }

  uploadSite(file: FormData){
    this.http.post(this.url + '/add', file, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(events => {
      if(events.type === HttpEventType.UploadProgress)
      {
        console.log('Upload progress: ' + Math.round(events.loaded / events.total!) * 100 + '%');
      }
      else(events.type === HttpEventType.Response)
      {
        console.log(events);
      };
    });
  }

  deleteSite(id: number){
    return this.http.get(this.url + '/' + id + '/delete');
  }

  getBody(id: number){
    return this.http.post<HTML>(this.url + '/htmlcontent', {dom: '#wrapper', id: id}, {
      observe: 'response'
    });
  }
}
