import { Component, Inject, OnInit } from '@angular/core';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  template: string = '';
  constructor(private templateService: TemplateService) {}

  ngOnInit(): void {
    this.getHeader();
  }

  getHeader() {
    this.templateService
      .getDom('public\\sites\\index.html', '#header')
      .subscribe((request) => {
        this.template = request.html;
        /*if (this.template != '') {
          this.loadScript();
        }*/
      });
  }
}
