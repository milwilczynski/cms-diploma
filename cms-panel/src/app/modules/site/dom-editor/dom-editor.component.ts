import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteService } from 'src/app/services/site/site.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-dom-editor',
  templateUrl: './dom-editor.component.html',
  styleUrls: ['./dom-editor.component.css'],
})
export class DomEditorComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '450px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '100%',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: true,
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };

  domElement: any = null;
  id: any = null;
  content!: any;
  fileUrl: any = '';
  url: any;

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.domElement = params.get('name');
      this.fileUrl = params.get('fileUrl');
      this.getContent();
    });
  }

  getContent() {
    this.siteService
      .getContent(this.domElement, this.fileUrl)
      .subscribe((response) => {
        this.content = response.html;
        console.log(this.content);
      });
  }

  updateDOM() {
    this.siteService
      .updateContent(this.domElement, this.fileUrl, this.content)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
