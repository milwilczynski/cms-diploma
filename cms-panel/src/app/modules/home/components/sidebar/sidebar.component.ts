import { Component, OnInit } from '@angular/core';
import { faChartBar, faPaperclip, faAngleLeft, faPlusSquare, faNewspaper, faComment, faUser, faPalette, faCog, faFlag } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  faChart = faChartBar;
  faFile = faPaperclip;
  faAngle = faAngleLeft;
  faPlusSqure = faPlusSquare;
  faNewsPaper = faNewspaper;
  faComment = faComment;
  faUser = faUser;
  faPallete = faPalette;
  faCog = faCog;
  faFlag = faFlag;
  isPagesClicked = false;
  isPostsClicked = false;

  constructor() { }

  ngOnInit(): void {
  }

  togglePages(){
    this.isPagesClicked = !this.isPagesClicked;
  }

  togglePosts(){
    this.isPostsClicked = !this.isPostsClicked;
  }



}
