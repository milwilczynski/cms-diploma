import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Comment {
  id: number;
  postId: number;
  nickname: string;
  title: string;
  content: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  url = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient) {}

  getAllComments() {
    return this.http.get<Comment[]>(this.url);
  }

  getCommentsBySite(id: number) {
    return this.http.get<Comment[]>(this.url + '/' + id);
  }

  getCommentsByPost(id: number) {
    return this.http.get<Comment[]>(this.url + '/posts/' + id);
  }

  deleteComment(id: number) {
    return this.http.get(this.url + '/' + id + '/delete');
  }

  getComment(id: number) {
    return this.http.get<Comment>(this.url + '/' + id + '/comment');
  }

  editComment(body: any) {
    return this.http.post(this.url + '/edit', body);
  }

  getDashboard() {
    return this.http.get(this.url + '/dashboard/comment');
  }
}
