import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { SiteService } from 'src/app/services/site/site.service';

@Component({
  selector: 'app-html-viewer',
  templateUrl: './html-viewer.component.html',
  styleUrls: ['./html-viewer.component.css']
})
export class HtmlViewerComponent implements OnInit {
  @Input() id!: number;
  @Output() isOnShow = new EventEmitter<boolean>();
  template: any;
  faTimes = faTimes;
  constructor(public siteService: SiteService,  private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.getInnerHTML(this.id);
  }

  close(){
    this.isOnShow.emit(false);
  }

  getInnerHTML(id: number){
    this.siteService.getBody(id).subscribe(response => this.template = response.body?.html);
  }

}
