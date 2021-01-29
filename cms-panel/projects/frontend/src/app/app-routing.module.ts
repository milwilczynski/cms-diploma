import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AppComponent } from './app.component';
import { ShowPostComponent } from './components/posts/show-post/show-post.component';
import { MainComponent } from './main/main.component';
import { WrapperComponent } from './main/wrapper/wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'post/:id',
        component: ShowPostComponent,
      },
      {
        path: '',
        component: WrapperComponent,
      },
      {
        path: ':name/post/:id',
        component: ShowPostComponent,
      },
      {
        path: ':name',
        component: WrapperComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
