import { Component, OnInit } from '@angular/core';
import {
  faClipboard,
  faClock,
  faUser,
} from '@fortawesome/free-regular-svg-icons';
import {
  faCommentSlash,
  faHeading,
  faPen,
  faPlus,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import { SiteService } from 'src/app/services/site/site.service';

@Component({
  selector: 'app-comments-dashboard',
  templateUrl: './comments-dashboard.component.html',
  styleUrls: ['./comments-dashboard.component.css'],
})
export class CommentsDashboardComponent implements OnInit {
  posts!: any[];
  sites!: any;
  comments!: any;
  dashboard: any = null;
  selectedPage!: number;
  faPosts = faClipboard;
  faHeading = faHeading;
  faUser = faUser;
  faClock = faClock;
  faPen = faPen;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  faCommentSlash = faCommentSlash;

  constructor(
    private siteService: SiteService,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.fetchDashboard();
    this.fetchSites();
    this.fetchAllComments();
  }

  fetchAllComments(): void {
    this.commentsService.getAllComments().subscribe((response) => {
      this.comments = response;
    });
  }

  fetchSites(): void {
    this.siteService.getAllSites().subscribe((response) => {
      this.sites = response;
    });
  }

  fetchDashboard(): void {
    this.commentsService.getDashboard().subscribe(
      (response) => {
        this.dashboard = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchPostsByPage(id: number): void {
    this.commentsService.getCommentsBySite(id).subscribe((response) => {
      response.length === 0 ? (this.comments = []) : (this.comments = response);
    });
  }

  selectPage(): void {
    if (this.selectedPage === 0) {
      this.fetchAllComments();
    } else {
      this.fetchPostsByPage(this.selectedPage);
    }
  }

  deleteComment(id: number): void {
    this.commentsService.deleteComment(id).subscribe((response) => {
      console.log(response);
    });
  }

  splitter(date: string): string {
    let dateString: string;
    const data = date.split('T');
    dateString =
      data[1].split(':')[0] + ':' + data[1].split(':')[1] + ', ' + data[0];
    return dateString;
  }

  stringCutter(string: string): string {
    return string.length >= 24 ? string.substring(0, 24) + '...' : string;
  }
}
