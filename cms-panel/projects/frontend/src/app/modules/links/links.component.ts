import { Component, Input, OnInit } from '@angular/core';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css'],
})
export class LinksComponent implements OnInit {
  @Input() styles;
  @Input() class;

  navbar!: any;
  constructor(private templateService: TemplateService) {}

  ngOnInit(): void {
    this.getNavigationBar();
  }
  ngAfterViewInit(): void {
    console.log(this.class);
  }

  getNavigationBar(): any {
    this.templateService.getNavigationBar().subscribe((response) => {
      this.navbar = response;
    });
  }
}
