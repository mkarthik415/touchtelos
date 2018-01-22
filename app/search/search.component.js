"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var MyHttpGetService_1 = require("../shared/MyHttpGetService");
var Constants_1 = require("../shared/Constants");
var segmented_bar_1 = require("ui/segmented-bar");
var nativescript_angular_1 = require("nativescript-angular");
require("rxjs/add/operator/switchMap");
var listview_1 = require("nativescript-pro-ui/listview");
var userInfo_1 = require("../shared/userInfo");
var app = require("application");
var SearchComponent = (function () {
    function SearchComponent(myService, _routerExtensions, myinfo) {
        this.myService = myService;
        this._routerExtensions = _routerExtensions;
        this.myinfo = myinfo;
        this.resultInfo = " Select search criteria .....";
        this.labelVisibility = true;
        this.loadModelVisibility = true;
        this.barItemTitles = ["Serial #", "Name", "Vehicle #", "Policy Issue Date", "Policy #", "Telephone #", "Email Address"];
        this.myItemss = [];
        this.loadMore = "Load More";
        for (var _i = 0, _a = this.barItemTitles; _i < _a.length; _i++) {
            var i = _a[_i];
            var item = new segmented_bar_1.SegmentedBarItem();
            item.title = i;
            this.myItemss.push(item);
        }
    }
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        this.activityIndicator = false;
        this.response = false;
        app.on(app.orientationChangedEvent, function (args) {
            if (args.newValue === 'landscape') {
                _this.myinfo.currentSearchResults.subscribe(function (results) { return _this.myItems = results; });
                _this.serviceCall();
            }
            else {
                _this.serviceCall();
            }
        });
    };
    Object.defineProperty(SearchComponent.prototype, "sideDrawerTransition", {
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
    SearchComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    SearchComponent.prototype.onGetDataSuccess = function (res) {
        this.index = 0;
        this.myItems = [];
        this.totalResults = [];
        this.totalResults = res.records.reverse();
        for (var i = 0, len = (this.totalResults.length >= 10 ? 10 : this.totalResults.length); i <= len; i++) {
            this.myItems.push(this.totalResults[i]);
            this.index = i;
        }
        console.log("the size of the array is: " + this.myItems.length);
        this.activityIndicator = false;
        if (this.myItems) {
            this.labelVisibility = false;
            this.loadModelVisibility = false;
        }
        else {
            this.labelVisibility = true;
            this.loadModelVisibility = true;
            this.resultInfo = " No Data found.";
        }
        this.host = res.headers.Host;
        this.userAgent = res.headers["User-Agent"];
        this.origin = res.origin;
        this.url = res.url;
        for (var myItem in this.myItems) {
            console.log(myItem);
        }
    };
    SearchComponent.prototype.onGetDataError = function (error) {
        var body = error.json() || "";
        var err = body.error || JSON.stringify(body);
        this.activityIndicator = false;
        this.labelVisibility = true;
        this.loadModelVisibility = true;
        this.resultInfo = " No Data found.";
        console.log("onGetDataError: " + err);
    };
    SearchComponent.prototype.extractData = function (args) {
        this.activityIndicator = true;
        this.searchBar = args.object;
        this.searchString = this.searchBar.text;
        this.myinfo.changeSearchString(this.searchString);
        this.myinfo.changeeEndPt(this.searchEndPt);
        this.serviceCall();
    };
    SearchComponent.prototype.serviceCall = function () {
        var _this = this;
        this.myService.getData((this.searchEndPt + "?" + Constants_1.webServices[this.searchEndPt] + "=" + this.searchString))
            .subscribe(function (result) {
            _this.activityIndicator = false;
            if (result) {
                _this.onGetDataSuccess(result);
            }
            else {
                _this.labelVisibility = true;
                _this.loadModelVisibility = true;
                _this.resultInfo = " No Data found.";
                _this.myItems = null;
            }
        }, function (error) {
            _this.onGetDataError(error);
        });
    };
    SearchComponent.prototype.onSelectedIndexChange = function (args) {
        var segmetedBar = args.object;
        this.searchHint = "Search By " + segmetedBar.items[segmetedBar.selectedIndex].title;
        this.searchEndPt = Constants_1.description[segmetedBar.items[segmetedBar.selectedIndex].title];
        this.searchKeyboardType = Constants_1.searchKeyboardType[segmetedBar.items[segmetedBar.selectedIndex].title];
        this.searchPhrase = "";
    };
    SearchComponent.prototype.onPolicytemTap = function (args) {
        var tappedPolicyItem = args.view.bindingContext;
        this._routerExtensions.navigate(["/search/policyDetails", tappedPolicyItem.id], {
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });
    };
    SearchComponent.prototype.onClear = function (args) {
        var searchBar = args.object;
        this.searchPhrase = "";
    };
    SearchComponent.prototype.onLoadMoreItemsRequested = function (args) {
        var listView = args.object;
        if (this.totalResults.length > 10 && this.totalResults.length != this.myItems.length) {
            for (var i = this.index + 1, len = (this.totalResults.length >= this.index + 10 ? this.index + 10 : this.totalResults.length - 1); i <= len; i++) {
                this.myItems.push(this.totalResults[i]);
                if (this.totalResults.length == i) {
                    listView.loadOnDemandMode = listview_1.ListViewLoadOnDemandMode[listview_1.ListViewLoadOnDemandMode.None];
                    break;
                }
            }
            this.index = this.index + 10;
        }
        else {
            this.loadModelVisibility = false;
        }
        args.returnValue = true;
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], SearchComponent.prototype, "drawerComponent", void 0);
    SearchComponent = __decorate([
        core_1.Component({
            selector: "Search",
            moduleId: module.id,
            templateUrl: "./search.component.html",
            styleUrls: ["search.component.css"],
            providers: [MyHttpGetService_1.MyHttpGetService]
        }),
        __metadata("design:paramtypes", [MyHttpGetService_1.MyHttpGetService,
            nativescript_angular_1.RouterExtensions,
            userInfo_1.UserInfo])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBOEU7QUFDOUUsNkRBQTRGO0FBQzVGLGtFQUE4RTtBQUU5RSwrREFBMkQ7QUFDM0QsaURBQWlGO0FBQ2pGLGtEQUFnRTtBQUVoRSw2REFBc0Q7QUFDdEQsdUNBQXFDO0FBQ3JDLHlEQUFzRztBQUN0RywrQ0FBOEM7QUFDOUMsaUNBQW1DO0FBU25DO0lBbURJLHlCQUEyQixTQUEyQixFQUMzQixpQkFBbUMsRUFDbkMsTUFBZ0I7UUFGaEIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFDM0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxXQUFNLEdBQU4sTUFBTSxDQUFVO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsK0JBQStCLENBQUM7UUFDbEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUN4SCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQTtRQUMzQixHQUFHLENBQUMsQ0FBVSxVQUFrQixFQUFsQixLQUFBLElBQUksQ0FBQyxhQUFhLEVBQWxCLGNBQWtCLEVBQWxCLElBQWtCO1lBQTNCLElBQUksQ0FBQyxTQUFBO1lBQ04sSUFBTSxJQUFJLEdBQUcsSUFBSSxnQ0FBZ0IsRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFB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QyxFQUFFLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDM0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sSUFBRSxDQUFDLENBQUMsQ0FDL0IsQ0FBQztvQkFDRyxRQUFRLENBQUMsZ0JBQWdCLEdBQUcsbUNBQXdCLENBQUMsbUNBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3BGLEtBQUssQ0FBQztnQkFDVixDQUFDO1lBQ0wsQ0FBQztZQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakMsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztRQUNyQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQS9Mb0I7UUFBcEIsZ0JBQVMsQ0FBQyxRQUFRLENBQUM7a0NBQWtCLGdDQUFzQjs0REFBQztJQUxwRCxlQUFlO1FBUDNCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsUUFBUTtZQUNsQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHlCQUF5QjtZQUN0QyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztZQUNuQyxTQUFTLEVBQUUsQ0FBQyxtQ0FBZ0IsQ0FBQztTQUNoQyxDQUFDO3lDQW9Ed0MsbUNBQWdCO1lBQ1IsdUNBQWdCO1lBQzNCLG1CQUFRO09BckRsQyxlQUFlLENBcU0zQjtJQUFELHNCQUFDO0NBQUEsQUFyTUQsSUFxTUM7QUFyTVksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIENoYW5nZURldGVjdG9yUmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtEcmF3ZXJUcmFuc2l0aW9uQmFzZSwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlclwiO1xuaW1wb3J0IHtSYWRTaWRlRHJhd2VyQ29tcG9uZW50fSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcblxuaW1wb3J0IHtNeUh0dHBHZXRTZXJ2aWNlfSBmcm9tIFwiLi4vc2hhcmVkL015SHR0cEdldFNlcnZpY2VcIlxuaW1wb3J0IHt3ZWJTZXJ2aWNlcywgZGVzY3JpcHRpb24sIHNlYXJjaEtleWJvYXJkVHlwZX0gZnJvbSBcIi4uL3NoYXJlZC9Db25zdGFudHNcIjtcbmltcG9ydCB7U2VnbWVudGVkQmFyLCBTZWdtZW50ZWRCYXJJdGVtfSBmcm9tIFwidWkvc2VnbWVudGVkLWJhclwiO1xuaW1wb3J0IHtTZWFyY2hCYXJ9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXJcIjtcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9zd2l0Y2hNYXBcIjtcbmltcG9ydCB7TGlzdFZpZXdFdmVudERhdGEsIFJhZExpc3RWaWV3LCBMaXN0Vmlld0xvYWRPbkRlbWFuZE1vZGV9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL2xpc3R2aWV3XCI7XG5pbXBvcnQgeyBVc2VySW5mbyB9IGZyb20gJy4uL3NoYXJlZC91c2VySW5mbyc7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSAnYXBwbGljYXRpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJTZWFyY2hcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2VhcmNoLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJzZWFyY2guY29tcG9uZW50LmNzc1wiXSxcbiAgICBwcm92aWRlcnM6IFtNeUh0dHBHZXRTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBVc2UgdGhlIEBWaWV3Q2hpbGQgZGVjb3JhdG9yIHRvIGdldCBhIHJlZmVyZW5jZSB0byB0aGUgZHJhd2VyIGNvbXBvbmVudC5cbiAgICAqIEl0IGlzIHVzZWQgaW4gdGhlIFwib25EcmF3ZXJCdXR0b25UYXBcIiBmdW5jdGlvbiBiZWxvdyB0byBtYW5pcHVsYXRlIHRoZSBkcmF3ZXIuXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBAVmlld0NoaWxkKFwiZHJhd2VyXCIpIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcblxuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcbiAgICBwdWJsaWMgaG9zdDogc3RyaW5nO1xuICAgIHB1YmxpYyB1c2VyQWdlbnQ6IHN0cmluZztcbiAgICBwdWJsaWMgb3JpZ2luOiBzdHJpbmc7XG4gICAgcHVibGljIHVybDogc3RyaW5nO1xuICAgIHB1YmxpYyBteUl0ZW1zOiBBcnJheTxhbnk+O1xuICAgIHB1YmxpYyB0b3RhbFJlc3VsdHM6QXJyYXk8YW55PjtcbiAgICBwdWJsaWMgc2VhcmNoRW5kUHQ6IGFueTtcbiAgICBwdWJsaWMgc2VhcmNoSGludDogc3RyaW5nO1xuICAgIHB1YmxpYyBzZWFyY2hLZXlib2FyZFR5cGU6IGFueTtcbiAgICBwdWJsaWMgbXlJdGVtc3M6IEFycmF5PFNlZ21lbnRlZEJhckl0ZW0+O1xuICAgIHB1YmxpYyBiYXJJdGVtVGl0bGVzOiBBcnJheTxzdHJpbmc+O1xuICAgIHB1YmxpYyByZXN1bHRJbmZvOiBzdHJpbmc7XG4gICAgcHVibGljIGxhYmVsVmlzaWJpbGl0eTogYm9vbGVhbjtcbiAgICBwdWJsaWMgbG9hZE1vZGVsVmlzaWJpbGl0eTogYm9vbGVhbjtcbiAgICBwdWJsaWMgc2VhcmNoUGhyYXNlOiBzdHJpbmc7XG4gICAgcHVibGljIGFjdGl2aXR5SW5kaWNhdG9yOiBib29sZWFuO1xuICAgIHByaXZhdGUgcmVzcG9uc2U6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBpbmR1c3RyeTogc3RyaW5nO1xuICAgIHByaXZhdGUgc2VhcmNoQmFyOiBhbnk7XG4gICAgcHJpdmF0ZSBpbmRleDogbnVtYmVyO1xuICAgIHB1YmxpYyBsb2FkTW9yZTogc3RyaW5nO1xuICAgIHB1YmxpYyBzZWFyY2hTdHJpbmc6IHN0cmluZztcblxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBVc2UgdGhlIHNpZGVEcmF3ZXJUcmFuc2l0aW9uIHByb3BlcnR5IHRvIGNoYW5nZSB0aGUgb3Blbi9jbG9zZSBhbmltYXRpb24gb2YgdGhlIGRyYXdlci5cbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbiA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuYWN0aXZpdHlJbmRpY2F0b3IgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXNwb25zZSA9IGZhbHNlO1xuXG4gICAgICAgIGFwcC5vbihhcHAub3JpZW50YXRpb25DaGFuZ2VkRXZlbnQsIChhcmdzOiBhcHAuT3JpZW50YXRpb25DaGFuZ2VkRXZlbnREYXRhKSA9PiB7XG5cbiAgICAgICAgICAgIGlmIChhcmdzLm5ld1ZhbHVlID09PSAnbGFuZHNjYXBlJykge1xuICAgICAgICAgICAgICAgIHRoaXMubXlpbmZvLmN1cnJlbnRTZWFyY2hSZXN1bHRzLnN1YnNjcmliZShyZXN1bHRzID0+IHRoaXMubXlJdGVtcyA9IHJlc3VsdHMpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZUNhbGwoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlQ2FsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIG15U2VydmljZTogTXlIdHRwR2V0U2VydmljZSxcbiAgICAgICAgICAgICAgICAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgcHJpdmF0ZSBteWluZm86IFVzZXJJbmZvKSB7XG4gICAgICAgIHRoaXMucmVzdWx0SW5mbyA9IFwiIFNlbGVjdCBzZWFyY2ggY3JpdGVyaWEgLi4uLi5cIjtcbiAgICAgICAgdGhpcy5sYWJlbFZpc2liaWxpdHkgPSB0cnVlO1xuICAgICAgICB0aGlzLmxvYWRNb2RlbFZpc2liaWxpdHkgPSB0cnVlO1xuICAgICAgICB0aGlzLmJhckl0ZW1UaXRsZXMgPSBbXCJTZXJpYWwgI1wiLCBcIk5hbWVcIiwgXCJWZWhpY2xlICNcIiwgXCJQb2xpY3kgSXNzdWUgRGF0ZVwiLCBcIlBvbGljeSAjXCIsIFwiVGVsZXBob25lICNcIiwgXCJFbWFpbCBBZGRyZXNzXCJdO1xuICAgICAgICB0aGlzLm15SXRlbXNzID0gW107XG4gICAgICAgIHRoaXMubG9hZE1vcmUgPSBcIkxvYWQgTW9yZVwiXG4gICAgICAgIGZvciAodmFyIGkgb2YgdGhpcy5iYXJJdGVtVGl0bGVzKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbmV3IFNlZ21lbnRlZEJhckl0ZW0oKTtcbiAgICAgICAgICAgIGl0ZW0udGl0bGUgPSBpO1xuICAgICAgICAgICAgdGhpcy5teUl0ZW1zcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXQgc2lkZURyYXdlclRyYW5zaXRpb24oKTogRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XG4gICAgfVxuXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIEFjY29yZGluZyB0byBndWlkZWxpbmVzLCBpZiB5b3UgaGF2ZSBhIGRyYXdlciBvbiB5b3VyIHBhZ2UsIHlvdSBzaG91bGQgYWx3YXlzXG4gICAgKiBoYXZlIGEgYnV0dG9uIHRoYXQgb3BlbnMgaXQuIFVzZSB0aGUgc2hvd0RyYXdlcigpIGZ1bmN0aW9uIHRvIG9wZW4gdGhlIGFwcCBkcmF3ZXIgc2VjdGlvbi5cbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR2V0RGF0YVN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xuICAgICAgICB0aGlzLm15SXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy50b3RhbFJlc3VsdHMgPSBbXTtcbiAgICAgICAgdGhpcy50b3RhbFJlc3VsdHMgPSByZXMucmVjb3Jkcy5yZXZlcnNlKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSAgKHRoaXMudG90YWxSZXN1bHRzLmxlbmd0aCA+PSAxMCA/IDEwIDogdGhpcy50b3RhbFJlc3VsdHMubGVuZ3RoKTsgaSA8PSBsZW47IGkrKykge1xuICAgICAgICAgICAgdGhpcy5teUl0ZW1zLnB1c2godGhpcy50b3RhbFJlc3VsdHNbaV0pO1xuICAgICAgICAgICAgdGhpcy5pbmRleCA9IGk7XG4gICAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcInRoZSBzaXplIG9mIHRoZSBhcnJheSBpczogXCIgKyB0aGlzLm15SXRlbXMubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5hY3Rpdml0eUluZGljYXRvciA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5teUl0ZW1zKSB7XG4gICAgICAgICAgICB0aGlzLmxhYmVsVmlzaWJpbGl0eSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sb2FkTW9kZWxWaXNpYmlsaXR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxhYmVsVmlzaWJpbGl0eSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxvYWRNb2RlbFZpc2liaWxpdHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRJbmZvID0gXCIgTm8gRGF0YSBmb3VuZC5cIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhvc3QgPSByZXMuaGVhZGVycy5Ib3N0O1xuICAgICAgICB0aGlzLnVzZXJBZ2VudCA9IHJlcy5oZWFkZXJzW1wiVXNlci1BZ2VudFwiXTtcbiAgICAgICAgdGhpcy5vcmlnaW4gPSByZXMub3JpZ2luO1xuICAgICAgICB0aGlzLnVybCA9IHJlcy51cmw7XG4gICAgICAgIGZvciAobGV0IG15SXRlbSBpbiB0aGlzLm15SXRlbXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG15SXRlbSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHByaXZhdGUgb25HZXREYXRhRXJyb3IoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBlcnJvci5qc29uKCkgfHwgXCJcIjtcbiAgICAgICAgY29uc3QgZXJyID0gYm9keS5lcnJvciB8fCBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICAgICAgdGhpcy5hY3Rpdml0eUluZGljYXRvciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxhYmVsVmlzaWJpbGl0eSA9IHRydWU7XG4gICAgICAgIHRoaXMubG9hZE1vZGVsVmlzaWJpbGl0eSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdWx0SW5mbyA9IFwiIE5vIERhdGEgZm91bmQuXCI7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25HZXREYXRhRXJyb3I6IFwiICsgZXJyKTtcbiAgICB9XG5cbiAgICBleHRyYWN0RGF0YShhcmdzKSB7XG4gICAgICAgIHRoaXMuYWN0aXZpdHlJbmRpY2F0b3IgPSB0cnVlO1xuICAgICAgICB0aGlzLnNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIHRoaXMuc2VhcmNoU3RyaW5nID0gdGhpcy5zZWFyY2hCYXIudGV4dDtcbiAgICAgICAgdGhpcy5teWluZm8uY2hhbmdlU2VhcmNoU3RyaW5nKHRoaXMuc2VhcmNoU3RyaW5nKTtcbiAgICAgICAgdGhpcy5teWluZm8uY2hhbmdlZUVuZFB0KHRoaXMuc2VhcmNoRW5kUHQpO1xuICAgICAgICB0aGlzLnNlcnZpY2VDYWxsKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXJ2aWNlQ2FsbCgpIHtcbiAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0RGF0YSgodGhpcy5zZWFyY2hFbmRQdCArIFwiP1wiICsgd2ViU2VydmljZXNbdGhpcy5zZWFyY2hFbmRQdF0gKyBcIj1cIiArIHRoaXMuc2VhcmNoU3RyaW5nKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlJbmRpY2F0b3IgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYWJlbFZpc2liaWxpdHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRNb2RlbFZpc2liaWxpdHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdEluZm8gPSBcIiBObyBEYXRhIGZvdW5kLlwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm15SXRlbXMgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uU2VsZWN0ZWRJbmRleENoYW5nZShhcmdzKSB7XG4gICAgICAgIGxldCBzZWdtZXRlZEJhciA9IDxTZWdtZW50ZWRCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIHRoaXMuc2VhcmNoSGludCA9IFwiU2VhcmNoIEJ5IFwiICsgc2VnbWV0ZWRCYXIuaXRlbXNbc2VnbWV0ZWRCYXIuc2VsZWN0ZWRJbmRleF0udGl0bGU7XG4gICAgICAgIHRoaXMuc2VhcmNoRW5kUHQgPSBkZXNjcmlwdGlvbltzZWdtZXRlZEJhci5pdGVtc1tzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4XS50aXRsZV07XG4gICAgICAgIHRoaXMuc2VhcmNoS2V5Ym9hcmRUeXBlID0gc2VhcmNoS2V5Ym9hcmRUeXBlW3NlZ21ldGVkQmFyLml0ZW1zW3NlZ21ldGVkQmFyLnNlbGVjdGVkSW5kZXhdLnRpdGxlXTtcbiAgICAgICAgdGhpcy5zZWFyY2hQaHJhc2UgPSBcIlwiO1xuXG4gICAgfVxuXG4gICAgb25Qb2xpY3l0ZW1UYXAoYXJncykge1xuXG4gICAgICAgIGNvbnN0IHRhcHBlZFBvbGljeUl0ZW0gPSBhcmdzLnZpZXcuYmluZGluZ0NvbnRleHQ7XG5cbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvc2VhcmNoL3BvbGljeURldGFpbHNcIiwgdGFwcGVkUG9saWN5SXRlbS5pZF0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNsaWRlXCIsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgICAgICAgICAgICAgIGN1cnZlOiBcImVhc2VcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgcHVibGljIG9uQ2xlYXIoYXJncykge1xuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5zZWFyY2hQaHJhc2UgPSBcIlwiO1xuICAgIH1cblxuXG4gICAgcHVibGljIG9uTG9hZE1vcmVJdGVtc1JlcXVlc3RlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xuICAgICAgICBsZXQgbGlzdFZpZXc6IFJhZExpc3RWaWV3ID0gYXJncy5vYmplY3Q7XG4gICAgICAgIGlmKHRoaXMudG90YWxSZXN1bHRzLmxlbmd0aCA+IDEwICYmIHRoaXMudG90YWxSZXN1bHRzLmxlbmd0aCE9IHRoaXMubXlJdGVtcy5sZW5ndGgpe1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5pbmRleCsxLCBsZW4gPSAodGhpcy50b3RhbFJlc3VsdHMubGVuZ3RoID49IHRoaXMuaW5kZXggKyAxMCA/IHRoaXMuaW5kZXggKyAxMCA6IHRoaXMudG90YWxSZXN1bHRzLmxlbmd0aC0xKTsgaSA8PSBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMubXlJdGVtcy5wdXNoKHRoaXMudG90YWxSZXN1bHRzW2ldKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnRvdGFsUmVzdWx0cy5sZW5ndGg9PWkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsaXN0Vmlldy5sb2FkT25EZW1hbmRNb2RlID0gTGlzdFZpZXdMb2FkT25EZW1hbmRNb2RlW0xpc3RWaWV3TG9hZE9uRGVtYW5kTW9kZS5Ob25lXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuaW5kZXggKyAxMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9hZE1vZGVsVmlzaWJpbGl0eSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGFyZ3MucmV0dXJuVmFsdWUgPSB0cnVlO1xuICAgIH1cbn1cbiJdfQ==