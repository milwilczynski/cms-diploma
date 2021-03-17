import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css'],
})
export class PostEditorComponent implements OnInit {
  postId: any;
  sites: any;
  content!: any;
  title!: any;
  subtitle!: any;

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
    private route: ActivatedRoute,
    private postService: PostsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.postId = params.get('id');
      this.fetchPost(this.postId);
    });
  }

  fetchPost(id: number) {
    this.postService.fetchPost(id).subscribe((response) => {
      this.title = response.title;
      this.subtitle = response.subtitle;
      this.content = response.content;
    });
  }

  updatePost(): void {
    const body = {
      id: this.postId,
      title: this.title,
      subtitle: this.subtitle,
      content: this.content,
    };
    this.postService.editPost(body).subscribe((response) => {
      console.log(response);
    });
  }
}
