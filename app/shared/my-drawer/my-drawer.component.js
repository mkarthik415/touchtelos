"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var userInfo_1 = require("../userInfo");
/* ***********************************************************
* Keep data that is displayed in your app drawer in the MyDrawer component class.
* Add new data objects that you want to display in the drawer here in the form of properties.
*************************************************************/
var MyDrawerComponent = (function () {
    function MyDrawerComponent(myinfo) {
        this.myinfo = myinfo;
    }
    MyDrawerComponent.prototype.ngOnInit = function () {
        var _this = this;
        /* ***********************************************************
        * Use the MyDrawerComponent "onInit" event handler to initialize the properties data values.
        *************************************************************/
        this.myinfo.currentMessage.subscribe(function (message) { return _this.message = message; });
        this.profilePic = "res://shared/" + this.message;
    };
    /* ***********************************************************
    * The "isPageSelected" function is bound to every navigation item on the <MyDrawerItem>.
    * It is used to determine whether the item should have the "selected" class.
    * The "selected" class changes the styles of the item, so that you know which page you are on.
    *************************************************************/
    MyDrawerComponent.prototype.isPageSelected = function (pageTitle) {
        return pageTitle === this.selectedPage;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MyDrawerComponent.prototype, "selectedPage", void 0);
    MyDrawerComponent = __decorate([
        core_1.Component({
            selector: "MyDrawer",
            moduleId: module.id,
            templateUrl: "./my-drawer.component.html",
            styleUrls: ["./my-drawer.component.css"]
        }),
        __metadata("design:paramtypes", [userInfo_1.UserInfo])
    ], MyDrawerComponent);
    return MyDrawerComponent;
}());
exports.MyDrawerComponent = MyDrawerComponent;
