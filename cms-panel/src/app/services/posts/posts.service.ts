import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Dashboard } from './dashboard.interface';
import { Post } from './post.interface';

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
    return this.http.get<Dashboard>(this.url + 'dashboard');
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

  getDashboard() {
    return this.http.get(this.url + '/dashboard/post');
  }

  editPost(body: any) {
    return this.http.post(this.url + '/edit', body);
  }
}
