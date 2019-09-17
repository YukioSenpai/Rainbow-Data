"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_service_1 = require("../services/app.service");
require("rxjs/add/operator/switchMap");
var FacebookComponent = (function () {
    function FacebookComponent(AppService) {
        this.AppService = AppService;
        this.infos = null;
    }
    FacebookComponent.prototype.ngOnInit = function () {
        var code = window.location.href.split('code=').slice(1).toString();
        console.log(code);
        if (code) {
            this.setFbAccessToken(code);
        }
    };
    FacebookComponent.prototype.logFbUser = function () {
        this.AppService.logFbUser();
    };
    FacebookComponent.prototype.setFbAccessToken = function (code) {
        var _this = this;
        this.AppService.setFbAccessToken(code).subscribe(function (res) {
            if (res.status === 200) {
                console.log("OK : token set in server application");
                _this.getFbInfos();
            }
        }, function (error) { return console.log("Error: ", error); });
    };
    FacebookComponent.prototype.getFbInfos = function () {
        var _this = this;
        this.AppService.getFbInfos().subscribe(function (infos) {
            _this.infos = infos;
            console.log(_this.infos);
            // console.log("Location : " + this.locationFb);
        });
    };
    return FacebookComponent;
}());
FacebookComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'facebook',
        templateUrl: '../app/facebook.component.html'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" && _a || Object])
], FacebookComponent);
exports.FacebookComponent = FacebookComponent;
var _a;
//# sourceMappingURL=facebook.component.js.map