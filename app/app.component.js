"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var userInfo_1 = require("./shared/userInfo");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            templateUrl: "app.component.html",
            providers: [userInfo_1.UserInfo]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
