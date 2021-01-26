import { Component, OnInit } from '@angular/core';
import { Site } from 'src/app/services/site/site';
import { SiteService } from 'src/app/services/site/site.service';
import {
  faPen,
  faTrashAlt,
  faEye,
  faCheck,
  faTimes,
  faHome,
  faFileAlt,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFile,
  faUser,
  faClock,
  faPlusSquare,
  faEyeSlash,
} from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-sites-dashboard',
  templateUrl: './sites-dashboard.component.html',
  styleUrls: ['./sites-dashboard.component.css'],
})
export class SitesDashboardComponent implements OnInit {
  site: any = null;
  isOnShow = false;
  fileUrl: string = '';
  dashboard: any = null;
  faPen = faPen;
  faHome = faHome;
  faTrashAlt = faTrashAlt;
  faEye = faEye;
  faPlus = faPlus;
  faCheck = faCheck;
  faTimes = faTimes;
  faFile = faFile;
  faUser = faUser;
  faClock = faClock;
  faEyeSlash = faEyeSlash;

  constructor(private siteService: SiteService) {}

  ngOnInit(): void {
    this.fetchDashboard();
    this.fetchSites();
  }

  fetchSites() {
    this.siteService.getAllSites().subscribe((response) => {
      this.site = response;
    });
  }

  deletePage(id: number) {
    this.siteService.deleteSite(id);
  }

  toggleViewer(val: boolean) {
    this.isOnShow = val;
  }

  setUrl(url: string) {
    this.fileUrl = url;
    if (this.fileUrl != '') {
      this.toggleViewer(true);
    }
  }

  fetchDashboard() {
    this.siteService.getDashboardInfo().subscribe((response) => {
      this.dashboard = response;
    });
  }

  splitter(date: string) {
    let dateString: string;
    let data = date.split('T');
    dateString =
      data[1].split(':')[0] + ':' + data[1].split(':')[1] + ', ' + data[0];
    return dateString;
  }

  toggleNavigation(id: any) {
    this.siteService.toggleNavigation(id).subscribe((response) => {
      console.log(response);
    });
  }
}
