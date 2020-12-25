import { Component, OnInit } from '@angular/core';
import { faChartBar, faPaperclip, faAngleLeft, faPlusSquare } from '@fortawesome/free-solid-svg-icons';


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
  isPagesClicked = false;

  constructor() { }

  ngOnInit(): void {
  }

  togglePages(){
    this.isPagesClicked = !this.isPagesClicked;
  }



}
