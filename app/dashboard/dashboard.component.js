"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var DashboardComponent = (function () {
    function DashboardComponent() {
        this.item = {
            "CreatedBy": "Karthik",
            "UpdatedDate": "Marupeddi",
            "Title": "XXX",
            "Summary": "Batman wants to be friends?"
        };
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
    }
    Object.defineProperty(DashboardComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    DashboardComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], DashboardComponent.prototype, "drawerComponent", void 0);
    DashboardComponent = __decorate([
        core_1.Component({
            selector: "Dashboard",
            moduleId: module.id,
            templateUrl: "./dashboard.component.html",
            styleUrls: ["./dashboard.component.css"]
        }),
        __metadata("design:paramtypes", [])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
