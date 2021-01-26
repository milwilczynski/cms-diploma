import { Component, OnInit } from '@angular/core';
import {
  faClipboard,
  faClock,
  faUser,
} from '@fortawesome/free-regular-svg-icons';
import {
  faHeading,
  faPen,
  faPlus,
  faTimes,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { PostsService } from 'src/app/services/posts/posts.service';
import { SiteService } from 'src/app/services/site/site.service';

@Component({
  selector: 'app-postdashboard',
  templateUrl: './postdashboard.component.html',
  styleUrls: ['./postdashboard.component.css'],
})
export class PostdashboardComponent implements OnInit {
  posts!: any[];
  sites: any;
  dashboard: any;
  selectedPage!: number;
  faPosts = faClipboard;
  faHeading = faHeading;
  faUser = faUser;
  faClock = faClock;
  faPen = faPen;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;

  constructor(
    private postsService: PostsService,
    private siteService: SiteService
  ) {}

  ngOnInit(): void {
    this.fetchDashboard();
    this.fetchSites();
    this.fetchAllPosts();
  }

  fetchAllPosts(): void {
    this.postsService.getAllPosts().subscribe((response) => {
      this.posts = response;
    });
  }

  fetchDashboard(): void {
    this.postsService.getDashboard().subscribe((response) => {
      this.dashboard = response;
    });
  }

  deletePost(id: number): void {
    this.postsService.deletePost(id).subscribe((response) => {
      console.log(response);
    });
  }

  splitter(date: string): string {
    let dateString: string;
    let data = date.split('T');
    dateString =
      data[1].split(':')[0] + ':' + data[1].split(':')[1] + ', ' + data[0];
    return dateString;
  }

  fetchSites(): void {
    this.siteService.getAllSites().subscribe((response) => {
      this.sites = response;
    });
  }

  changePosts(): void {
    if (this.selectedPage == 0) {
      this.fetchAllPosts();
    } else {
      this.postsService
        .getPostsBySite(this.selectedPage)
        .subscribe((response) => {
          this.posts = response;
        });
    }
  }

  stringCutter(string: string): string {
    return string.length >= 25 ? string.substring(0, 25) + '...' : string;
  }
}
