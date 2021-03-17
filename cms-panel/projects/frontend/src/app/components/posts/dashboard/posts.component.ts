import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  postId!: any;
  posts!: any;
  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      console.log('LOL: ' + param.get('name'));
      this.postId = param.get('name');
      if (this.postId == null) {
        this.fetchPostsBySiteName('index');
      } else {
        this.fetchPosts(this.postId);
      }
    });
  }

  fetchPosts(id: number) {
    this.postService.getPostsBySiteId(id).subscribe((response) => {
      this.posts = response;
    });
  }

  fetchPostsBySiteName(name: string) {
    this.postService.getPostsBySiteName(name).subscribe((response) => {
      this.posts = response;
    });
  }

  splitter(date: string): string {
    let dateString: string;
    let data = date.split('T');
    dateString =
      data[1].split(':')[0] + ':' + data[1].split(':')[1] + ', ' + data[0];
    return dateString;
  }
}
