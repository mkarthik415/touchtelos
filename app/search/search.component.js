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
var SearchItem_1 = require("../../app/search/SearchItem");
var Timer = require("tns-core-modules/timer");
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
            _this.myinfo.currentSearchString.subscribe(function (results) { return _this.searchString = results; });
            _this.myinfo.currentEndPt.subscribe(function (results) { return _this.searchEndPt = results; });
            if (args.newValue === 'landscape') {
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
        this.intialNumber = 0;
        this.myItems = new Array();
        this.totalResults = new Array();
        this.totalResults = res.reverse();
        for (var i = 0, len = (this.totalResults.length >= 10 ? 10 : this.totalResults.length); i <= len; i++) {
            this.myItems.push(this.totalResults[i]);
            this.index = i;
            this.intialNumber++;
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
        /*         for (let myItem in this.myItems) {
                    console.log(myItem.INSURED_NAME);
                } */
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
        this.searchResponse = new Array();
        this.myService.getData((this.searchEndPt + "?" + Constants_1.webServices[this.searchEndPt] + "=" + this.searchString)).subscribe(
        // the first argument is a function which runs on success
        function (data) {
            console.log('done loading foods');
            data.records.map(function (item) {
                _this.searchResponse.push(new SearchItem_1.SearchItem(item[0], item[1], item[2], item[3], item[4], item[5], item[6]));
            });
            _this.activityIndicator = false;
            if (data) {
                _this.onGetDataSuccess(_this.searchResponse);
            }
            else {
                _this.labelVisibility = true;
                _this.loadModelVisibility = true;
                _this.resultInfo = " No Data found.";
                _this.myItems = null;
            }
        }, 
        // the second argument is a function which runs on error
        function (err) { return console.error(err); }, 
        // the third argument is a function which runs on completion
        function () { return console.log('done loading foods' + _this.searchResults[0].AGENTNAME); });
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
        var that = new WeakRef(this);
        Timer.setTimeout(function () {
            var listView = args.object;
            var initialNumberOfItems = that.get().intialNumber;
            for (var i = initialNumberOfItems; i < initialNumberOfItems + 4; i++) {
                if (i > that.get().totalResults.length - 1) {
                    listView.loadOnDemandMode = listview_1.ListViewLoadOnDemandMode[listview_1.ListViewLoadOnDemandMode.None];
                    break;
                }
                that.get().myItems.push(that.get().totalResults[i]);
                that.get().intialNumber++;
            }
            listView.notifyLoadOnDemandFinished();
        }, 1000);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBOEU7QUFDOUUsNkRBQTRGO0FBQzVGLGtFQUE4RTtBQUU5RSwrREFBMkQ7QUFDM0QsaURBQWlGO0FBQ2pGLGtEQUFnRTtBQUVoRSw2REFBc0Q7QUFDdEQsdUNBQXFDO0FBQ3JDLHlEQUFzRztBQUN0RywrQ0FBOEM7QUFDOUMsaUNBQW1DO0FBRW5DLDBEQUF5RDtBQUl6RCw4Q0FBZ0Q7QUFXaEQ7SUF5REkseUJBQTJCLFNBQTJCLEVBQzNCLGlCQUFtQyxFQUNuQyxNQUFnQjtRQUZoQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUMzQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLFdBQU0sR0FBTixNQUFNLENBQVU7UUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRywrQkFBK0IsQ0FBQztRQUNsRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3hILElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFBO1FBQzNCLEdBQUcsQ0FBQyxDQUFVLFVBQWtCLEVBQWxCLEtBQUEsSUFBSSxDQUFDLGFBQWEsRUFBbEIsY0FBa0IsRUFBbEIsSUFBa0I7WUFBM0IsSUFBSSxDQUFDLFNBQUE7WUFDTixJQUFNLElBQUksR0FBRyxJQUFJLGdDQUFnQixFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZixJQUFJLENB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QVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQ25DLFNBQVMsRUFBRSxDQUFDLG1DQUFnQixDQUFDO1NBQ2hDLENBQUM7eUNBMER3QyxtQ0FBZ0I7WUFDUix1Q0FBZ0I7WUFDM0IsbUJBQVE7T0EzRGxDLGVBQWUsQ0FzTjNCO0lBQUQsc0JBQUM7Q0FBQSxBQXRORCxJQXNOQztBQXROWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0RyYXdlclRyYW5zaXRpb25CYXNlLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9ufSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyXCI7XG5pbXBvcnQge1JhZFNpZGVEcmF3ZXJDb21wb25lbnR9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXIvYW5ndWxhclwiO1xuXG5pbXBvcnQge015SHR0cEdldFNlcnZpY2V9IGZyb20gXCIuLi9zaGFyZWQvTXlIdHRwR2V0U2VydmljZVwiXG5pbXBvcnQge3dlYlNlcnZpY2VzLCBkZXNjcmlwdGlvbiwgc2VhcmNoS2V5Ym9hcmRUeXBlfSBmcm9tIFwiLi4vc2hhcmVkL0NvbnN0YW50c1wiO1xuaW1wb3J0IHtTZWdtZW50ZWRCYXIsIFNlZ21lbnRlZEJhckl0ZW19IGZyb20gXCJ1aS9zZWdtZW50ZWQtYmFyXCI7XG5pbXBvcnQge1NlYXJjaEJhcn0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VhcmNoLWJhclwiO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL3N3aXRjaE1hcFwiO1xuaW1wb3J0IHtMaXN0Vmlld0V2ZW50RGF0YSwgUmFkTGlzdFZpZXcsIExpc3RWaWV3TG9hZE9uRGVtYW5kTW9kZX0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvbGlzdHZpZXdcIjtcbmltcG9ydCB7IFVzZXJJbmZvIH0gZnJvbSAnLi4vc2hhcmVkL3VzZXJJbmZvJztcbmltcG9ydCAqIGFzIGFwcCBmcm9tICdhcHBsaWNhdGlvbic7XG5pbXBvcnQge09ic2VydmFibGVBcnJheX0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBTZWFyY2hJdGVtIH0gZnJvbSBcIi4uLy4uL2FwcC9zZWFyY2gvU2VhcmNoSXRlbVwiO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCB7IHNldEludGVydmFsLCBzZXRUaW1lb3V0LCBjbGVhckludGVydmFsIH0gZnJvbSBcInRpbWVyXCI7XG5pbXBvcnQgKiBhcyBUaW1lciBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy90aW1lclwiO1xuXG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiU2VhcmNoXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3NlYXJjaC5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wic2VhcmNoLmNvbXBvbmVudC5jc3NcIl0sXG4gICAgcHJvdmlkZXJzOiBbTXlIdHRwR2V0U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBzZWFyY2hSZXNwb25zZTogYW55O1xuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBVc2UgdGhlIEBWaWV3Q2hpbGQgZGVjb3JhdG9yIHRvIGdldCBhIHJlZmVyZW5jZSB0byB0aGUgZHJhd2VyIGNvbXBvbmVudC5cbiAgICAqIEl0IGlzIHVzZWQgaW4gdGhlIFwib25EcmF3ZXJCdXR0b25UYXBcIiBmdW5jdGlvbiBiZWxvdyB0byBtYW5pcHVsYXRlIHRoZSBkcmF3ZXIuXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBAVmlld0NoaWxkKFwiZHJhd2VyXCIpIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcblxuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcbiAgICBwdWJsaWMgaG9zdDogc3RyaW5nO1xuICAgIHB1YmxpYyB1c2VyQWdlbnQ6IHN0cmluZztcbiAgICBwdWJsaWMgb3JpZ2luOiBzdHJpbmc7XG4gICAgcHVibGljIHVybDogc3RyaW5nO1xuICAgIHB1YmxpYyB0ZXN0dmFsdWU6IE9ic2VydmFibGU8YW55PjtcbiAgICBwdWJsaWMgbXlJdGVtczogQXJyYXk8YW55PjtcbiAgICBwdWJsaWMgdG90YWxSZXN1bHRzOiBBcnJheTxhbnk+O1xuICAgIHB1YmxpYyBzZWFyY2hFbmRQdDogYW55O1xuICAgIHB1YmxpYyBzZWFyY2hIaW50OiBzdHJpbmc7XG4gICAgcHVibGljIHNlYXJjaEtleWJvYXJkVHlwZTogYW55O1xuICAgIHB1YmxpYyBteUl0ZW1zczogQXJyYXk8U2VnbWVudGVkQmFySXRlbT47XG4gICAgcHVibGljIGJhckl0ZW1UaXRsZXM6IEFycmF5PHN0cmluZz47XG4gICAgcHVibGljIHJlc3VsdEluZm86IHN0cmluZztcbiAgICBwdWJsaWMgbGFiZWxWaXNpYmlsaXR5OiBib29sZWFuO1xuICAgIHB1YmxpYyBsb2FkTW9kZWxWaXNpYmlsaXR5OiBib29sZWFuO1xuICAgIHB1YmxpYyBzZWFyY2hQaHJhc2U6IHN0cmluZztcbiAgICBwdWJsaWMgYWN0aXZpdHlJbmRpY2F0b3I6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSByZXNwb25zZTogYm9vbGVhbjtcbiAgICBwcml2YXRlIGluZHVzdHJ5OiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBzZWFyY2hCYXI6IGFueTtcbiAgICBwcml2YXRlIGluZGV4OiBudW1iZXI7XG4gICAgcHVibGljIGxvYWRNb3JlOiBzdHJpbmc7XG4gICAgcHVibGljIHNlYXJjaFN0cmluZzogc3RyaW5nO1xuICAgIHByaXZhdGUgX2RhdGFJdGVtczogT2JzZXJ2YWJsZUFycmF5PGFueT47XG4gICAgcHJpdmF0ZSBzZWFyY2hSZXN1bHRzOiBTZWFyY2hJdGVtW107XG4gICAgcHJpdmF0ZSBpbnRpYWxOdW1iZXI6IG51bWJlcjtcblxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBVc2UgdGhlIHNpZGVEcmF3ZXJUcmFuc2l0aW9uIHByb3BlcnR5IHRvIGNoYW5nZSB0aGUgb3Blbi9jbG9zZSBhbmltYXRpb24gb2YgdGhlIGRyYXdlci5cbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbiA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuYWN0aXZpdHlJbmRpY2F0b3IgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXNwb25zZSA9IGZhbHNlO1xuXG4gICAgICAgIGFwcC5vbihhcHAub3JpZW50YXRpb25DaGFuZ2VkRXZlbnQsIChhcmdzOiBhcHAuT3JpZW50YXRpb25DaGFuZ2VkRXZlbnREYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm15aW5mby5jdXJyZW50U2VhcmNoU3RyaW5nLnN1YnNjcmliZShyZXN1bHRzID0+IHRoaXMuc2VhcmNoU3RyaW5nID0gcmVzdWx0cyk7XG4gICAgICAgICAgICB0aGlzLm15aW5mby5jdXJyZW50RW5kUHQuc3Vic2NyaWJlKHJlc3VsdHMgPT4gdGhpcy5zZWFyY2hFbmRQdCA9IHJlc3VsdHMpO1xuICAgICAgICAgICAgaWYgKGFyZ3MubmV3VmFsdWUgPT09ICdsYW5kc2NhcGUnKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VDYWxsKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZUNhbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBteVNlcnZpY2U6IE15SHR0cEdldFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgICAgICAgICAgICAgICAgIHByaXZhdGUgbXlpbmZvOiBVc2VySW5mbykge1xuICAgICAgICB0aGlzLnJlc3VsdEluZm8gPSBcIiBTZWxlY3Qgc2VhcmNoIGNyaXRlcmlhIC4uLi4uXCI7XG4gICAgICAgIHRoaXMubGFiZWxWaXNpYmlsaXR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2FkTW9kZWxWaXNpYmlsaXR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5iYXJJdGVtVGl0bGVzID0gW1wiU2VyaWFsICNcIiwgXCJOYW1lXCIsIFwiVmVoaWNsZSAjXCIsIFwiUG9saWN5IElzc3VlIERhdGVcIiwgXCJQb2xpY3kgI1wiLCBcIlRlbGVwaG9uZSAjXCIsIFwiRW1haWwgQWRkcmVzc1wiXTtcbiAgICAgICAgdGhpcy5teUl0ZW1zcyA9IFtdO1xuICAgICAgICB0aGlzLmxvYWRNb3JlID0gXCJMb2FkIE1vcmVcIlxuICAgICAgICBmb3IgKHZhciBpIG9mIHRoaXMuYmFySXRlbVRpdGxlcykge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IG5ldyBTZWdtZW50ZWRCYXJJdGVtKCk7XG4gICAgICAgICAgICBpdGVtLnRpdGxlID0gaTtcbiAgICAgICAgICAgIHRoaXMubXlJdGVtc3MucHVzaChpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uO1xuICAgIH1cblxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xuICAgICogaGF2ZSBhIGJ1dHRvbiB0aGF0IG9wZW5zIGl0LiBVc2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkdldERhdGFTdWNjZXNzKHJlcykge1xuICAgICAgICB0aGlzLmluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5pbnRpYWxOdW1iZXIgPSAwO1xuICAgICAgICB0aGlzLm15SXRlbXMgPSBuZXcgQXJyYXk8YW55PigpO1xuICAgICAgICB0aGlzLnRvdGFsUmVzdWx0cyA9IG5ldyBBcnJheTxhbnk+KCk7XG4gICAgICAgIHRoaXMudG90YWxSZXN1bHRzID0gcmVzLnJldmVyc2UoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9ICAodGhpcy50b3RhbFJlc3VsdHMubGVuZ3RoID49IDEwID8gMTAgOiB0aGlzLnRvdGFsUmVzdWx0cy5sZW5ndGgpOyBpIDw9IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLm15SXRlbXMucHVzaCh0aGlzLnRvdGFsUmVzdWx0c1tpXSk7XG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gaTtcbiAgICAgICAgICAgIHRoaXMuaW50aWFsTnVtYmVyKys7XG4gICAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcInRoZSBzaXplIG9mIHRoZSBhcnJheSBpczogXCIgKyB0aGlzLm15SXRlbXMubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5hY3Rpdml0eUluZGljYXRvciA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5teUl0ZW1zKSB7XG4gICAgICAgICAgICB0aGlzLmxhYmVsVmlzaWJpbGl0eSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sb2FkTW9kZWxWaXNpYmlsaXR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxhYmVsVmlzaWJpbGl0eSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxvYWRNb2RlbFZpc2liaWxpdHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRJbmZvID0gXCIgTm8gRGF0YSBmb3VuZC5cIjtcbiAgICAgICAgfVxuLyogICAgICAgICBmb3IgKGxldCBteUl0ZW0gaW4gdGhpcy5teUl0ZW1zKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhteUl0ZW0uSU5TVVJFRF9OQU1FKTtcbiAgICAgICAgfSAqL1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkdldERhdGFFcnJvcihlcnJvcjogUmVzcG9uc2UgfCBhbnkpIHtcbiAgICAgICAgY29uc3QgYm9keSA9IGVycm9yLmpzb24oKSB8fCBcIlwiO1xuICAgICAgICBjb25zdCBlcnIgPSBib2R5LmVycm9yIHx8IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICAgICAgICB0aGlzLmFjdGl2aXR5SW5kaWNhdG9yID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGFiZWxWaXNpYmlsaXR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sb2FkTW9kZWxWaXNpYmlsaXR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXN1bHRJbmZvID0gXCIgTm8gRGF0YSBmb3VuZC5cIjtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbkdldERhdGFFcnJvcjogXCIgKyBlcnIpO1xuICAgIH1cblxuICAgIGV4dHJhY3REYXRhKGFyZ3MpIHtcbiAgICAgICAgdGhpcy5hY3Rpdml0eUluZGljYXRvciA9IHRydWU7XG4gICAgICAgIHRoaXMuc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5zZWFyY2hTdHJpbmcgPSB0aGlzLnNlYXJjaEJhci50ZXh0O1xuICAgICAgICB0aGlzLm15aW5mby5jaGFuZ2VTZWFyY2hTdHJpbmcodGhpcy5zZWFyY2hTdHJpbmcpO1xuICAgICAgICB0aGlzLm15aW5mby5jaGFuZ2VlRW5kUHQodGhpcy5zZWFyY2hFbmRQdCk7XG4gICAgICAgIHRoaXMuc2VydmljZUNhbGwoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlcnZpY2VDYWxsKCkge1xuICAgIFxuICAgICAgICB0aGlzLnNlYXJjaFJlc3BvbnNlID0gbmV3IEFycmF5KCk7XG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldERhdGEoKHRoaXMuc2VhcmNoRW5kUHQgKyBcIj9cIiArIHdlYlNlcnZpY2VzW3RoaXMuc2VhcmNoRW5kUHRdICsgXCI9XCIgKyB0aGlzLnNlYXJjaFN0cmluZykpLnN1YnNjcmliZShcbiAgICAgICAgICAgIC8vIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBhIGZ1bmN0aW9uIHdoaWNoIHJ1bnMgb24gc3VjY2Vzc1xuICAgICAgICAgICAgZGF0YSA9PiB7IGNvbnNvbGUubG9nKCdkb25lIGxvYWRpbmcgZm9vZHMnKTtcbiAgICAgICAgICAgIGRhdGEucmVjb3Jkcy5tYXAoaXRlbSA9PiB7IFxuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoUmVzcG9uc2UucHVzaChuZXcgU2VhcmNoSXRlbSggXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1bMF0saXRlbVsxXSxpdGVtWzJdLGl0ZW1bM10saXRlbVs0XSxpdGVtWzVdLGl0ZW1bNl1cbiAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpdml0eUluZGljYXRvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhU3VjY2Vzcyh0aGlzLnNlYXJjaFJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFiZWxWaXNpYmlsaXR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkTW9kZWxWaXNpYmlsaXR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRJbmZvID0gXCIgTm8gRGF0YSBmb3VuZC5cIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5teUl0ZW1zID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gdGhlIHNlY29uZCBhcmd1bWVudCBpcyBhIGZ1bmN0aW9uIHdoaWNoIHJ1bnMgb24gZXJyb3JcbiAgICAgICAgICAgIGVyciA9PiBjb25zb2xlLmVycm9yKGVyciksXG4gICAgICAgICAgICAvLyB0aGUgdGhpcmQgYXJndW1lbnQgaXMgYSBmdW5jdGlvbiB3aGljaCBydW5zIG9uIGNvbXBsZXRpb25cbiAgICAgICAgICAgICgpID0+IGNvbnNvbGUubG9nKCdkb25lIGxvYWRpbmcgZm9vZHMnK3RoaXMuc2VhcmNoUmVzdWx0c1swXS5BR0VOVE5BTUUpXG4gICAgICAgICAgKTtcbiB9XG5cbiAgICBwdWJsaWMgb25TZWxlY3RlZEluZGV4Q2hhbmdlKGFyZ3MpIHtcbiAgICAgICAgbGV0IHNlZ21ldGVkQmFyID0gPFNlZ21lbnRlZEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5zZWFyY2hIaW50ID0gXCJTZWFyY2ggQnkgXCIgKyBzZWdtZXRlZEJhci5pdGVtc1tzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4XS50aXRsZTtcbiAgICAgICAgdGhpcy5zZWFyY2hFbmRQdCA9IGRlc2NyaXB0aW9uW3NlZ21ldGVkQmFyLml0ZW1zW3NlZ21ldGVkQmFyLnNlbGVjdGVkSW5kZXhdLnRpdGxlXTtcbiAgICAgICAgdGhpcy5zZWFyY2hLZXlib2FyZFR5cGUgPSBzZWFyY2hLZXlib2FyZFR5cGVbc2VnbWV0ZWRCYXIuaXRlbXNbc2VnbWV0ZWRCYXIuc2VsZWN0ZWRJbmRleF0udGl0bGVdO1xuICAgICAgICB0aGlzLnNlYXJjaFBocmFzZSA9IFwiXCI7XG5cbiAgICB9XG5cbiAgICBvblBvbGljeXRlbVRhcChhcmdzKSB7XG5cbiAgICAgICAgY29uc3QgdGFwcGVkUG9saWN5SXRlbSA9IGFyZ3Mudmlldy5iaW5kaW5nQ29udGV4dDtcblxuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9zZWFyY2gvcG9saWN5RGV0YWlsc1wiLCB0YXBwZWRQb2xpY3lJdGVtLmlkXSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhbmltYXRlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVcIixcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMCxcbiAgICAgICAgICAgICAgICAgICAgY3VydmU6IFwiZWFzZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgb25DbGVhcihhcmdzKSB7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLnNlYXJjaFBocmFzZSA9IFwiXCI7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgb25Mb2FkTW9yZUl0ZW1zUmVxdWVzdGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgICAgIHZhciB0aGF0ID0gbmV3IFdlYWtSZWYodGhpcyk7XG5cbiAgICAgICAgVGltZXIuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbGlzdFZpZXc6IFJhZExpc3RWaWV3ID0gYXJncy5vYmplY3Q7XG4gICAgICAgICAgICB2YXIgaW5pdGlhbE51bWJlck9mSXRlbXMgPSB0aGF0LmdldCgpLmludGlhbE51bWJlcjtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGluaXRpYWxOdW1iZXJPZkl0ZW1zOyBpIDwgaW5pdGlhbE51bWJlck9mSXRlbXMgKyA0OyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA+IHRoYXQuZ2V0KCkudG90YWxSZXN1bHRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdFZpZXcubG9hZE9uRGVtYW5kTW9kZSA9IExpc3RWaWV3TG9hZE9uRGVtYW5kTW9kZVtMaXN0Vmlld0xvYWRPbkRlbWFuZE1vZGUuTm9uZV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB0aGF0LmdldCgpLm15SXRlbXMucHVzaCh0aGF0LmdldCgpLnRvdGFsUmVzdWx0c1tpXSk7XG4gICAgICAgICAgICAgICAgdGhhdC5nZXQoKS5pbnRpYWxOdW1iZXIrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpc3RWaWV3Lm5vdGlmeUxvYWRPbkRlbWFuZEZpbmlzaGVkKCk7XG4gICAgICAgIH0sMTAwMCk7XG4gICAgICAgIGFyZ3MucmV0dXJuVmFsdWUgPSB0cnVlO1xuICAgIH1cbn1cbiJdfQ==