import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  url = 'http://localhost:8080/api/posts';
  constructor(private http: HttpClient) {}

  getPostsBySiteId(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  getPost(id: number) {
    return this.http.get(this.url + '/' + id + '/post');
  }

  getPostsBySiteName(name: string) {
    return this.http.get(this.url + '-bysitename/' + name);
  }

  getComments(id: number) {
    return this.http.get('http://localhost:8080/api/comments/posts/' + id);
  }

  submitComment(body: any) {
    return this.http.post('http://localhost:8080/api/comments/add', body);
  }
}
