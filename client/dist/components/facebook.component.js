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
var facebook_service_1 = require("../services/facebook.service");
require("rxjs/add/operator/switchMap");
// Component controlling and handling all data received from the Rainbow Data API.
var FacebookComponent = (function () {
    function FacebookComponent(FacebookService) {
        this.FacebookService = FacebookService;
        this.infos = null;
    }
    /**
     * When the component is initialized, check in the browser URI if a user_code is present.
     * If it is, refactor and pass it with the method setFbAccessToken
     * @method ngOnInit
     */
    FacebookComponent.prototype.ngOnInit = function () {
        var user_code = window.location.href.split('code=').slice(1).toString();
        if (user_code) {
            this.setFbAccessToken(user_code);
        }
    };
    FacebookComponent.prototype.logFbUser = function () {
        this.FacebookService.logFbUser();
    };
    /**
     * Subscribe to the http observable of the FacebookService method to send the user_code
     * to the Rainbow Data API in order to set the access token in the API, server side.
     * @method setFbAccessToken
     * @param  {string}         user_code [code retrieved below on the "ngOnInit" method]
     */
    FacebookComponent.prototype.setFbAccessToken = function (user_code) {
        var _this = this;
        this.FacebookService.setFbAccessToken(user_code).subscribe(function (res) {
            if (res.status === 200) {
                _this.getFbInfos();
            }
        }, function (error) { return console.log("Error: ", error); });
    };
    /**
     * Subscribe to the http observable of the FacebookService method to get the JSON Object
     * containing all the user's personnal informations.
     * Store these informations in a variable used in the view.
     * @method getFbInfos
     */
    FacebookComponent.prototype.getFbInfos = function () {
        var _this = this;
        this.FacebookService.getFbInfos().subscribe(function (infos) {
            _this.infos = infos;
        });
    };
    return FacebookComponent;
}());
FacebookComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'facebook',
        templateUrl: '../../app/views/facebook.component.html'
    }),
    __metadata("design:paramtypes", [facebook_service_1.FacebookService])
], FacebookComponent);
exports.FacebookComponent = FacebookComponent;
//# sourceMappingURL=facebook.component.js.map