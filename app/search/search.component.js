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
var SearchComponent = (function () {
    function SearchComponent(myService, _routerExtensions) {
        this.myService = myService;
        this._routerExtensions = _routerExtensions;
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
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        this.activityIndicator = false;
        this.response = false;
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
        var _this = this;
        this.activityIndicator = true;
        this.searchBar = args.object;
        this.myService.getData((this.searchEndPt + "?" + Constants_1.webServices[this.searchEndPt] + "=" + this.searchBar.text))
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
        if (this.totalResults.length > 10) {
            for (var i = this.index + 1, len = (this.totalResults.length >= this.index + 10 ? this.index + 10 : this.totalResults.length); i <= len; i++) {
                this.myItems = [];
                this.myItems.push(this.totalResults[i]);
                if (this.totalResults.length == i) {
                    listView.notifyLoadOnDemandFinished();
                    this.loadModelVisibility = false;
                }
            }
            this.index = this.index + 10;
        }
        else {
            this.loadModelVisibility = false;
        }
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
            nativescript_angular_1.RouterExtensions])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
