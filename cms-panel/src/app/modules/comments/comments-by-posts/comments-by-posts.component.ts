import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-comments-by-posts',
  templateUrl: './comments-by-posts.component.html',
  styleUrls: ['./comments-by-posts.component.css'],
})
export class CommentsByPostsComponent implements OnInit {
  posts!: any;
  pairs!: any;
  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.fetchSites();
  }

  fetchSites(): void {
    this.postService.getAllPosts().subscribe((response) => {
      this.posts = response;
      this.pairMaker(this.posts);
    });
  }

  pairMaker(array: any) {
    this.pairs = array.reduce(function (result, value, index, array) {
      if (index % 2 === 0) result.push(array.slice(index, index + 2));
      return result;
    }, []);
  }
}
