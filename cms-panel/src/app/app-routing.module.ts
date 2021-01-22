import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentsDashboardComponent } from './modules/comments/comments-dashboard/comments-dashboard.component';
import { EditCommentComponent } from './modules/comments/edit-comment/edit-comment.component';
import { ShowCommentsComponent } from './modules/comments/show-comments/show-comments.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { DomEditorComponent } from './modules/site/dom-editor/dom-editor.component';
import { SiteAdderComponent } from './modules/site/site-adder/site-adder.component';
import { SitesDashboardComponent } from './modules/site/sites-dashboard/sites-dashboard.component';
import { AddpostComponent } from './posts/addpost/addpost.component';
import { PostEditorComponent } from './posts/post-editor/post-editor.component';
import { PostdashboardComponent } from './posts/postdashboard/postdashboard.component';
import { PostsbysiteComponent } from './posts/postsbysite/postsbysite.component';
import { ShowPostsComponent } from './posts/show-posts/show-posts.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'sites',
        component: SitesDashboardComponent,
      },
      {
        path: 'sites/add',
        component: SiteAdderComponent,
      },
      {
        path: 'sites/domeditor/:fileUrl/:name',
        component: DomEditorComponent,
      },
      {
        path: 'posts',
        component: PostdashboardComponent,
      },
      {
        path: 'posts/add',
        component: AddpostComponent,
      },
      {
        path: 'posts/:id',
        component: PostEditorComponent,
      },
      {
        path: 'comments',
        component: CommentsDashboardComponent,
      },
      {
        path: 'comments/edit/:id',
        component: EditCommentComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
