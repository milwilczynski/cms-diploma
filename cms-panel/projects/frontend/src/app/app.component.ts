import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  layout: string = 'modern';
  dynamicCSSUrl: string = '';
  dynamicJSUrl: string = '';
  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    switch (this.layout) {
      case 'modern':
        this.dynamicCSSUrl = './assets/modern-layout/style.css';
        this.loadScript('./assets/modern-layout/script.js');
        break;
      case 'navbottom':
        this.dynamicCSSUrl = './assets/navbottom-layout/style.css';
        this.loadScript('./assets/navbottom-layout/script.js');
    }
  }

  public loadScript(url: string) {
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
