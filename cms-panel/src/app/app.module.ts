import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './modules/home/home.component';
import { SidebarComponent } from './modules/home/components/sidebar/sidebar.component';
import { NavbarComponent } from './modules/home/components/navbar/navbar.component';
import { ContainerComponent } from './modules/home/components/container/container.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SiteAdderComponent } from './modules/site/site-adder/site-adder.component';
import { DomEditorComponent } from './modules/site/dom-editor/dom-editor.component';
import { SitesDashboardComponent } from './modules/site/sites-dashboard/sites-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { HtmlViewerComponent } from './modules/site/html-viewer/html-viewer.component';
import { ParamsEditorComponent } from './modules/site/params-editor/params-editor.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PostdashboardComponent } from './posts/postdashboard/postdashboard.component';
import { AddpostComponent } from './posts/addpost/addpost.component';
import { PostsbysiteComponent } from './posts/postsbysite/postsbysite.component';
import { BlockShowComponent } from './components/block-show/block-show.component';
import { TitleShowComponent } from './components/title-show/title-show.component';
import { ShowPostsComponent } from './posts/show-posts/show-posts.component';
import { PostEditorComponent } from './posts/post-editor/post-editor.component';
import { EditCommentComponent } from './modules/comments/edit-comment/edit-comment.component';
import { CommentsDashboardComponent } from './modules/comments/comments-dashboard/comments-dashboard.component';
import { CommentsBySiteComponent } from './modules/comments/comments-by-site/comments-by-site.component';
import { CommentsByPostsComponent } from './modules/comments/comments-by-posts/comments-by-posts.component';
import { ShowCommentsComponent } from './modules/comments/show-comments/show-comments.component';

@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    NavbarComponent,
    ContainerComponent,
    DashboardComponent,
    LoginComponent,
    AppComponent,
    SiteAdderComponent,
    DomEditorComponent,
    SitesDashboardComponent,
    HtmlViewerComponent,
    ParamsEditorComponent,
    PostdashboardComponent,
    AddpostComponent,
    PostsbysiteComponent,
    BlockShowComponent,
    TitleShowComponent,
    ShowPostsComponent,
    PostEditorComponent,
    EditCommentComponent,
    CommentsDashboardComponent,
    CommentsBySiteComponent,
    CommentsByPostsComponent,
    ShowCommentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
