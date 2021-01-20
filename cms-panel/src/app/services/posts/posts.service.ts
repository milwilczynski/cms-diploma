import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Post {
  id: number;
  siteId: number;
  title: string;
  subtitle: string;
  content: string;
  user: {
    id: number;
    login: string;
  };
  site: {
    id: number;
    title: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  url = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  getAllPosts() {
    return this.http.get<Post[]>(this.url);
  }

  getPostsDashboard() {
    return this.http.get<Post[]>(this.url + 'dashboard');
  }

  getPostsBySite(id: number) {
    return this.http.get<Post[]>(this.url + '/' + id);
  }

  addPost(body: any) {
    return this.http.post(this.url + '/add', body).subscribe((response) => {
      console.log(response);
    });
  }

  deletePost(id: number) {
    return this.http.get(this.url + '/' + id + '/delete');
  }

  fetchPost(id: number) {
    return this.http.get<Post>(this.url + '/' + id + '/post');
  }

  editPost(body: any) {
    return this.http.post(this.url + '/edit', body);
  }
}
