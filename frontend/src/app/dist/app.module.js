"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var auth_interceptor_1 = require("./service/auth/auth.interceptor");
var auth_service_1 = require("./service/auth/auth.service");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var home_component_1 = require("./components/home/home.component");
var user_component_1 = require("./components/user/user.component");
var user_service_1 = require("./service/user.service");
var navbar_component_1 = require("./components/navbar/navbar.component");
var titlebar_component_1 = require("./components/titlebar/titlebar.component");
var login_component_1 = require("./components/login/login.component");
var forms_1 = require("@angular/forms");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                user_component_1.UserComponent,
                navbar_component_1.NavbarComponent,
                titlebar_component_1.TitlebarComponent,
                login_component_1.LoginComponent,
            ],
            imports: [platform_browser_1.BrowserModule, app_routing_module_1.AppRoutingModule, http_1.HttpClientModule, forms_1.FormsModule],
            providers: [
                user_service_1.UserService,
                auth_service_1.AuthService,
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: auth_interceptor_1.AuthInterceptor,
                    multi: true
                },
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
