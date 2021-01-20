import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-postdashboard',
  templateUrl: './postdashboard.component.html',
  styleUrls: ['./postdashboard.component.css'],
})
export class PostdashboardComponent implements OnInit {
  posts!: any[];
  pairs!: any[][];
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.fetchAllPosts();
  }

  fetchAllPosts(): void {
    this.postsService.getPostsDashboard().subscribe((response) => {
      this.posts = response;
      this.pairMaker(this.posts);
    });
  }

  splitter(date: string) {
    let dateString: string;
    let data = date.split('T');
    dateString =
      data[1].split(':')[0] + ':' + data[1].split(':')[1] + ', ' + data[0];
    return dateString;
  }

  pairMaker(array: any) {
    this.pairs = array.reduce(function (result, value, index, array) {
      if (index % 2 === 0) result.push(array.slice(index, index + 2));
      return result;
    }, []);
  }
}
