import { BrowserModule } from '@angular/platform-browser';
import {
  Compiler,
  CompilerFactory,
  COMPILER_OPTIONS,
  NgModule,
} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './main/footer/footer.component';
import { MenuComponent } from './main/menu/menu.component';
import { HeaderComponent } from './main/header/header.component';
import { WrapperComponent } from './main/wrapper/wrapper.component';
import { MainComponent } from './main/main.component';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { DynamicRendererComponent } from './components/dynamic-renderer/dynamic-renderer.component';
import { PostsComponent } from './components/posts/dashboard/posts.component';
import { HttpClientModule } from '@angular/common/http';

export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MenuComponent,
    HeaderComponent,
    WrapperComponent,
    MainComponent,
    DynamicRendererComponent,
    PostsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
    {
      provide: CompilerFactory,
      useClass: JitCompilerFactory,
      deps: [COMPILER_OPTIONS],
    },
    { provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory] },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
