import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
})
export class WrapperComponent implements OnInit {
  siteName: any = null;
  template: string = '';
  constructor(
    private templateService: TemplateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.siteName = param.get('name');
      if (this.siteName == null) {
        this.getBody('index');
      } else {
        this.getBodyById(this.siteName);
      }
    });
  }

  getBody(name: string) {
    this.templateService
      .getDom('public\\sites\\' + name + '.html', '#wrapper')
      .subscribe((request) => {
        this.template = request.html;
      });
  }

  getBodyById(id: number) {
    this.templateService.getDomById(id).subscribe((request) => {
      this.template = request.html;
    });
  }
}
