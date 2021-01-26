import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css'],
})
export class WrapperComponent implements OnInit {
  template: string = '';
  constructor(private templateService: TemplateService) {}

  ngOnInit(): void {
    this.getBody();
  }

  getBody() {
    this.templateService
      .getDom('public\\sites\\index.html', '#wrapper')
      .subscribe((request) => {
        this.template = request.html;
        /*if (this.template != '') {
          this.loadScript();
        }*/
      });
  }
}
