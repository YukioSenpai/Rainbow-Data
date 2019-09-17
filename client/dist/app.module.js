"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var facebook_service_1 = require("./services/facebook.service");
var linkedin_service_1 = require("./services/linkedin.service");
var http_1 = require("@angular/http");
var app_component_1 = require("./components/app.component");
var facebook_component_1 = require("./components/facebook.component");
var linkedin_component_1 = require("./components/linkedin.component");
var forms_1 = require("@angular/forms");
// Configure and bootstrap the angular application
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule],
        declarations: [app_component_1.AppComponent, facebook_component_1.FacebookComponent, linkedin_component_1.LinkedinComponent],
        providers: [facebook_service_1.FacebookService, linkedin_service_1.LinkedinService],
        bootstrap: [app_component_1.AppComponent, facebook_component_1.FacebookComponent, linkedin_component_1.LinkedinComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map