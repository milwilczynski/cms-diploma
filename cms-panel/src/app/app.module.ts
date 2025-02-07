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
    SitesDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
