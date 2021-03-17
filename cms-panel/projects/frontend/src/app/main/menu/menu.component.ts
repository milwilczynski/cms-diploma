import { Component, Input, OnInit } from '@angular/core';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  template: string = '';
  navbar!: any;
  constructor(private templateService: TemplateService) {}

  ngOnInit(): void {
    this.getHeader();
  }

  getHeader() {
    this.templateService
      .getDom('public\\sites\\index.html', '#menu')
      .subscribe((request) => {
        this.template = request.html;
      });
  }
}
