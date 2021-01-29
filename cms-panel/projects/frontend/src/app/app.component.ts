import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from './services/template.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  layout: string = 'modern';
  headerColor!: any;
  menuColor!: any;
  bodyColor!: any;
  isHeader!: any;
  isSite = false;
  navbarColor!: any;
  dynamicCSSUrl: string = '';
  dynamicJSUrl: string = '';
  constructor(
    public sanitizer: DomSanitizer,
    public templateService: TemplateService
  ) {}

  ngOnInit(): void {
    this.checkIfIndexExist();
  }

  checkIfIndexExist(): any {
    this.templateService
      .getDom('public\\sites\\index.html', '#wrapper')
      .subscribe((response) => {
        if (response != null) {
          this.isSite = true;
          this.fetchConfig();
        }
      });
  }
  setLayout() {
    switch (this.layout) {
      case 'modern':
        this.dynamicCSSUrl = './assets/modern-layout/style.css';
        this.loadScript('./assets/modern-layout/script.js');
        break;
      case 'navbarbottom':
        this.dynamicCSSUrl = './assets/navbottom-layout/style.css';
        this.loadScript('./assets/navbottom-layout/script.js');
        break;
      case 'menuleft':
        this.dynamicCSSUrl = './assets/menu-left/style.css';
        this.loadScript('./assets/menu-left/script.js');
        break;
      case 'menuright':
        this.dynamicCSSUrl = './assets/menu-right/style.css';
        this.loadScript('./assets/menu-right/script.js');
        break;
    }
    if (!this.isHeader) {
      (document.getElementById('header') as HTMLDivElement).style.display =
        'none';
    }
  }

  fetchConfig(): any {
    this.templateService.getConfig().subscribe((response) => {
      this.layout = response.layout;
      this.isHeader = response.isHeader;
      this.bodyColor = response.bodyColor;
      this.menuColor = response.menuColor;
      this.navbarColor = response.navbarColor;
      this.headerColor = response.headerColor;
      this.setLayout();
      this.setColors();
    });
  }

  setColors(): any {
    (document.getElementById(
      'header'
    ) as HTMLDivElement).style.backgroundColor = this.headerColor;
    (document.getElementById(
      'wrapper'
    ) as HTMLDivElement).style.backgroundColor = this.bodyColor;
    (document.getElementById(
      'footer'
    ) as HTMLDivElement).style.backgroundColor = this.menuColor;
    (document.getElementById(
      'menu'
    ) as HTMLDivElement).style.backgroundColor = this.navbarColor;
  }

  loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;

    var css_link = document.createElement('link');
    (css_link.rel = 'stylesheet'),
      (css_link.type = 'text/css'),
      (css_link.href = this.dynamicCSSUrl);

    document.head.appendChild(css_link);
    body.appendChild(script);
  }
}
