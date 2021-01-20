import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  template: string = '';
  constructor(private templateService: TemplateService) {}

  ngOnInit(): void {
    this.getFooter();
  }

  getFooter() {
    this.templateService
      .getDom('public\\sites\\index.html', '#footer')
      .subscribe((request) => {
        this.template = request.html;
        /*if (this.template != '') {
          this.loadScript();
        }*/
      });
  }
}
