import { Component, OnInit } from '@angular/core';
import { Site } from 'src/app/services/site/site';
import { SiteService } from 'src/app/services/site/site.service';
import {
  faPen,
  faTrashAlt,
  faEye,
  faPlusSquare,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sites-dashboard',
  templateUrl: './sites-dashboard.component.html',
  styleUrls: ['./sites-dashboard.component.css'],
})
export class SitesDashboardComponent implements OnInit {
  public site: any;
  isOnShow = false;
  fileUrl: string = '';
  faPen = faPen;
  faTrashAlt = faTrashAlt;
  faEye = faEye;
  faPlus = faPlusSquare;
  faCheck = faCheck;
  faTimes = faTimes;

  constructor(private siteService: SiteService) {}

  ngOnInit(): void {
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
}
