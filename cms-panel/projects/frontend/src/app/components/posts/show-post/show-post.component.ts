import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css'],
})
export class ShowPostComponent implements OnInit {
  postId!: any;
  post!: any;
  title!: any;
  content!: any;
  nickname!: any;
  comments!: any;

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.postId = param.get('id');
      this.fetchPost(this.postId);
    });
  }

  fetchPost(id: number) {
    this.postService.getPost(id).subscribe((response) => {
      this.post = response;
      this.getComments(this.post.id);
    });
  }

  splitter(date: string): string {
    let dateString: string;
    let data = date.split('T');
    dateString =
      data[1].split(':')[0] + ':' + data[1].split(':')[1] + ', ' + data[0];
    return dateString;
  }

  submitComment() {
    const body = {
      postId: this.post.id,
      nickname: this.nickname,
      title: this.title,
      content: this.content,
    };
    this.postService.submitComment(body).subscribe((response) => {
      console.log(response);
    });
  }

  getComments(id: number) {
    this.postService.getComments(id).subscribe((response) => {
      this.comments = response;
      console.log(this.comments);
    });
  }
}
