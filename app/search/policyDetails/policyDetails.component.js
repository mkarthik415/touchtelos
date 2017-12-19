"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var nativescript_angular_1 = require("nativescript-angular");
require("rxjs/add/operator/switchMap");
var MyHttpGetService_1 = require("../../shared/MyHttpGetService");
var segmented_bar_1 = require("tns-core-modules/ui/segmented-bar");
var PolicyDetailsComponent = (function () {
    function PolicyDetailsComponent(_pageRoute, myService) {
        this._pageRoute = _pageRoute;
        this.myService = myService;
        this.selectedIndex = 0;
        this.visibility1 = true;
        this.visibility2 = false;
        this.visibility3 = false;
        this.visibility4 = false;
        this.visibility5 = false;
        this.visibility6 = false;
        this.items = [];
        // this.visibilityArray = [this.visibility1,this.visibility2,this.visibility3,this.visibility4,this.visibility5,this.visibility6];
        this.barItemTitles = ["Personal Details", "Ins Company Details", "Policy Details", "Amount Details", "Documents", "Renewal Details"];
        for (var _i = 0, _a = this.barItemTitles; _i < _a.length; _i++) {
            var i = _a[_i];
            var item = new segmented_bar_1.SegmentedBarItem();
            item.title = i;
            this.items.push(item);
        }
        this.selectedIndex = 0;
        this.visibility1 = true;
    }
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    PolicyDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        this._pageRoute.activatedRoute
            .switchMap(function (activatedRoute) { return activatedRoute.params; })
            .forEach(function (params) {
            _this.mySerialNumber = params.id;
        });
        this.myService.getData("bySerialNumber?serialNumber" + "=" + this.mySerialNumber)
            .subscribe(function (result) {
            _this.onGetDataSuccess(result);
        }, function (error) {
            _this.onGetDataError(error);
        });
    };
    Object.defineProperty(PolicyDetailsComponent.prototype, "sideDrawerTransition", {
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
    PolicyDetailsComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    PolicyDetailsComponent.prototype.onGetDataSuccess = function (res) {
        this.policyInfo = res;
        console.log("results are " + this.policyInfo[0]);
    };
    PolicyDetailsComponent.prototype.onGetDataError = function (error) {
        var body = error.json() || "";
        var err = body.error || JSON.stringify(body);
        console.log("onGetDataError: " + err);
    };
    PolicyDetailsComponent.prototype.onSelectedIndexChange = function (args) {
        var segmetedBar = args.object;
        this.selectedIndex = segmetedBar.selectedIndex;
        for (var i in this.visibilityArray) {
            console.log("selected segment is : " + this.selectedIndex);
            if (i == this.selectedIndex.toString()) {
                console.log("Assigned value is : " + this.visibility + i.toString);
                this.visibility + i.toString;
            }
            else {
                this.visibilityArray[i] = "false";
            }
        }
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], PolicyDetailsComponent.prototype, "drawerComponent", void 0);
    PolicyDetailsComponent = __decorate([
        core_1.Component({
            selector: "policyDetails",
            moduleId: module.id,
            templateUrl: "./policyDetails.component.html",
            styleUrls: ["policyDetail.component.css"],
            providers: [MyHttpGetService_1.MyHttpGetService]
        }),
        __metadata("design:paramtypes", [nativescript_angular_1.PageRoute,
            MyHttpGetService_1.MyHttpGetService])
    ], PolicyDetailsComponent);
    return PolicyDetailsComponent;
}());
exports.PolicyDetailsComponent = PolicyDetailsComponent;
