import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import { SiteService } from 'src/app/services/site/site.service';

@Component({
  selector: 'app-show-comments',
  templateUrl: './show-comments.component.html',
  styleUrls: ['./show-comments.component.css'],
})
export class ShowCommentsComponent implements OnInit {
  id!: any;
  type!: any;
  comments!: any;
  visible = true;
  faTrashAlt = faTrashAlt;
  faPen = faPen;
  constructor(
    private route: ActivatedRoute,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.type = params.get('type');
      this.fetchComments();
    });
  }

  fetchComments(): void {
    if (this.type === 'post') {
      this.commentsService.getCommentsByPost(this.id).subscribe((response) => {
        this.comments = response;
        console.log(this.comments);
      });
    } else if (this.type === 'site') {
      this.commentsService.getCommentsBySite(this.id).subscribe((response) => {
        this.comments = response;
      });
    }
  }

  deleteComment(id: number) {
    this.commentsService.deleteComment(id).subscribe((response) => {
      console.log(response);
    });
  }

  splitter(date: string) {
    let dateString: string;
    let data = date.split('T');
    dateString =
      data[1].split(':')[0] + ':' + data[1].split(':')[1] + ' - ' + data[0];
    return dateString;
  }
}
