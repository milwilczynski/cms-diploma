import { Component, OnInit } from '@angular/core';
import { Site } from 'src/app/services/site/site';
import { SiteService } from 'src/app/services/site/site.service';
import { faPen, faTrashAlt, faEye, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sites-dashboard',
  templateUrl: './sites-dashboard.component.html',
  styleUrls: ['./sites-dashboard.component.css']
})
export class SitesDashboardComponent implements OnInit {
  public site: any;
  isOnShow = false;
  variable: number = 0;
  faPen = faPen;
  faTrashAlt = faTrashAlt;
  faEye = faEye;
  faPlus = faPlusSquare;

  constructor(private siteService: SiteService) { }

  ngOnInit(): void {
    this.fetchSites();
  }

  fetchSites(){
    this.siteService.getAllSites().subscribe(response => {
      this.site = response;
    });
  }

  deletePage(id: number){
    this.siteService.deleteSite(id);
  }

  toggleViewer(val: boolean){
    this.isOnShow = val;
  }

  setUrl(id: number){
    this.variable = id;
    if(this.variable != 0){
      this.toggleViewer(true);
    }
  }

}
