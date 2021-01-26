import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PostsService } from 'src/app/services/posts/posts.service';
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css'],
})
export class AddpostComponent implements OnInit {
  sites: any;
  content!: any;
  title!: any;
  subtitle!: any;
  pageId: any;

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
  constructor(
    private siteService: SiteService,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    this.fetchSites();
  }

  fetchSites(): void {
    this.siteService.getAllSites().subscribe((response) => {
      this.sites = response;
    });
  }

  createPost(): void {
    const body = {
      siteId: this.pageId,
      userId: 1,
      title: this.title,
      subtitle: this.subtitle,
      content: this.content,
    };
    this.postService.addPost(body);
  }
}
