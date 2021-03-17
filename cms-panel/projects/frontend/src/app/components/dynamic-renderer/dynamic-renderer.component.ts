import { CommonModule } from '@angular/common';
import {
  Compiler,
  Component,
  ComponentRef,
  Injector,
  Input,
  NgModule,
  NgModuleRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../../main/footer/footer.component';
import { HeaderComponent } from '../../main/header/header.component';
import { MenuComponent } from '../../main/menu/menu.component';
import { LinksComponent } from '../../modules/links/links.component';
import { TemplateService } from '../../services/template.service';
import { PostsComponent } from '../posts/dashboard/posts.component';

@Component({
  selector: 'app-dynamic-renderer',
  templateUrl: './dynamic-renderer.component.html',
  styleUrls: ['./dynamic-renderer.component.css'],
})
export class DynamicRendererComponent implements OnInit {
  @ViewChild('vc', { read: ViewContainerRef }) _container!: ViewContainerRef;
  cmpRef!: ComponentRef<any>;

  @Input() template!: string;
  @Input() components!: any;

  constructor(
    private _compiler: Compiler,
    private _injector: Injector,
    private _m: NgModuleRef<any>
  ) {}

  ngOnDestroy(): void {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }

  ngOnChanges(): void {}

  async ngOnInit() {
    //inicjating component
    const tmpCmp = Component({
      selector: 'app-renderer',
      template: this.template,
    })(
      class {
        //variables etc to serve between components
      }
    );

    //components which i want to use within dynamic component
    const components = [tmpCmp, PostsComponent, LinksComponent, Input];

    const imports = [
      BrowserModule,
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
    ];
    //module
    const tmpModule = NgModule({
      declarations: components,
      imports: imports,
    })(class {});

    this._compiler
      .compileModuleAndAllComponentsAsync(tmpModule)
      .then((factories) => {
        const f = factories.componentFactories[0];
        const cmpRef = f.create(this._injector, [], null, this._m);
        cmpRef.instance.name = 'component-renderer';
        this._container.insert(cmpRef.hostView);
      });
  }
}
