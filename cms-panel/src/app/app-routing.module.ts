import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { DomEditorComponent } from './modules/site/dom-editor/dom-editor.component';
import { SiteAdderComponent } from './modules/site/site-adder/site-adder.component';
import { SitesDashboardComponent } from './modules/site/sites-dashboard/sites-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'sites',
        component: SitesDashboardComponent,
      },
      {
        path: 'sites/add',
        component: SiteAdderComponent
      },
      {
        path: 'sites/domeditor',
        component: DomEditorComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
