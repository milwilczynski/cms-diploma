import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-show-posts',
  templateUrl: './show-posts.component.html',
  styleUrls: ['./show-posts.component.css'],
})
export class ShowPostsComponent implements OnInit {
  siteId: any;
  posts!: any;
  pairs!: any;
  faPen = faPen;
  faTrashAlt = faTrashAlt;

  constructor(
    private route: ActivatedRoute,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.siteId = params.get('id');
      this.fetchPosts();
    });
  }

  fetchPosts() {
    this.postService.getPostsBySite(this.siteId).subscribe((response) => {
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

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe((response) => {
      console.log(response);
    });
  }

  stringCutter(string: string) {
    return string.length >= 80 ? string.substring(0, 80) + '...' : string;
  }
}
