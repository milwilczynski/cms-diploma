import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CommentsService } from 'src/app/services/comments/comments.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css'],
})
export class EditCommentComponent implements OnInit {
  commentId!: any;
  content!: any;
  title!: any;
  nickname!: any;

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
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.commentId = params.get('id');
      this.fetchComment(this.commentId);
    });
  }

  fetchComment(id: number): void {
    this.commentsService.getComment(id).subscribe((response) => {
      console.log(response);
      this.title = response.title;
      this.content = response.content;
      this.nickname = response.nickname;
    });
  }

  updateComment(): void {
    const body = {
      id: this.commentId,
      title: this.title,
      content: this.content,
    };

    this.commentsService.editComment(body).subscribe((response) => {
      console.log(response);
    });
  }
}
