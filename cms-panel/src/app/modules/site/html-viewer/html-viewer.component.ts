import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { SiteService } from 'src/app/services/site/site.service';

@Component({
  selector: 'app-html-viewer',
  templateUrl: './html-viewer.component.html',
  styleUrls: ['./html-viewer.component.css'],
})
export class HtmlViewerComponent implements OnInit {
  @Input() id!: string;
  @Output() isOnShow = new EventEmitter<boolean>();
  template: any;
  faTimes = faTimes;
  constructor(
    public siteService: SiteService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getView();
  }

  getView() {
    this.siteService.getContent('#wrapper', this.id).subscribe((response) => {
      this.template = response.html;
    });
  }

  close() {
    this.isOnShow.emit(false);
  }
}
