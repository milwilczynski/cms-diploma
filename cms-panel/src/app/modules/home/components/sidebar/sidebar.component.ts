import { Component, OnInit } from '@angular/core';
import {
  faChartBar,
  faPaperclip,
  faAngleLeft,
  faPlusSquare,
  faBookOpen,
  faComment,
  faUser,
  faPalette,
  faCog,
  faFlag,
  faBars,
  faHeading,
  faShoePrints,
  faCompass,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  faChart = faChartBar;
  faFile = faPaperclip;
  faAngle = faAngleLeft;
  faPlusSqure = faPlusSquare;
  faNewsPaper = faBookOpen;
  faComment = faComment;
  faUser = faUser;
  faPallete = faPalette;
  faCog = faCog;
  faFlag = faFlag;
  faAdn = faBars;
  faHeading = faHeading;
  faShoes = faShoePrints;
  faCompass = faCompass;
  isPagesClicked = false;
  isPostsClicked = false;
  isContentClicked = false;
  isCommentsClicked = false;
  constructor() {}

  ngOnInit(): void {}

  togglePages() {
    this.isPagesClicked = !this.isPagesClicked;
  }

  togglePosts() {
    this.isPostsClicked = !this.isPostsClicked;
  }

  toggleComments() {
    this.isCommentsClicked = !this.isCommentsClicked;
  }

  toggleContent() {
    this.isContentClicked = !this.isContentClicked;
  }
}
