import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';

@Component({
  selector: 'app-comments-by-site',
  templateUrl: './comments-by-site.component.html',
  styleUrls: ['./comments-by-site.component.css'],
})
export class CommentsBySiteComponent implements OnInit {
  sites!: any;
  pairs!: any;
  constructor(private siteService: SiteService) {}

  ngOnInit(): void {
    this.fetchSites();
  }

  fetchSites(): void {
    this.siteService.getAllSites().subscribe((response) => {
      this.sites = response;
      this.pairMaker(this.sites);
    });
  }

  pairMaker(array: any) {
    this.pairs = array.reduce(function (result, value, index, array) {
      if (index % 2 === 0) result.push(array.slice(index, index + 2));
      return result;
    }, []);
  }
}
