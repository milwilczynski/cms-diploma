import { Component, OnInit } from '@angular/core';
import {
  faClipboard,
  faClock,
  faEyeSlash,
  faHeading,
  faPen,
  faPlus,
  faTrashAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  posts!: any[];
  sites: any;
  dashboard: any = null;
  selectedPage: number = 0;
  faPosts = faClipboard;
  faHeading = faHeading;
  faUser = faUser;
  faClock = faClock;
  faPen = faPen;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  faEyeSlash = faEyeSlash;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.fetchDashboard();
  }

  fetchDashboard(): void {
    this.postsService.getDashboard().subscribe((response) => {
      this.dashboard = response;
    });
  }

  splitter(date: string): string {
    let dateString: string;
    let data = date.split('T');
    dateString =
      data[1].split(':')[0] + ':' + data[1].split(':')[1] + ', ' + data[0];
    return dateString;
  }

  stringCutter(string: string): string {
    return string.length >= 25 ? string.substring(0, 25) + '...' : string;
  }
}
