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
        var that = new WeakRef(this);
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
        if (this.listView) {
            this.listView.loadOnDemandMode = listview_1.ListViewLoadOnDemandMode[listview_1.ListViewLoadOnDemandMode.Auto];
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
                _this.searchResponse.push(item);
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
        this._routerExtensions.navigate(["/search/policyDetails", tappedPolicyItem[0]], {
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
            that.get().listView = args.object;
            var initialNumberOfItems = that.get().intialNumber;
            for (var i = initialNumberOfItems; i < initialNumberOfItems + 4; i++) {
                if (i > that.get().totalResults.length - 1) {
                    that.get().listView.loadOnDemandMode = listview_1.ListViewLoadOnDemandMode[listview_1.ListViewLoadOnDemandMode.None];
                    break;
                }
                that.get().myItems.push(that.get().totalResults[i]);
                that.get().intialNumber++;
            }
            that.get().listView.notifyLoadOnDemandFinished();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBOEU7QUFDOUUsNkRBQTRGO0FBQzVGLGtFQUE4RTtBQUU5RSwrREFBMkQ7QUFDM0QsaURBQWlGO0FBQ2pGLGtEQUFnRTtBQUVoRSw2REFBc0Q7QUFDdEQsdUNBQXFDO0FBQ3JDLHlEQUFzRztBQUN0RywrQ0FBOEM7QUFDOUMsaUNBQW1DO0FBTW5DLDhDQUFnRDtBQVdoRDtJQTBESSx5QkFBMkIsU0FBMkIsRUFDM0IsaUJBQW1DLEVBQ25DLE1BQWdCO1FBRmhCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzNCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsV0FBTSxHQUFOLE1BQU0sQ0FBVTtRQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLCtCQUErQixDQUFDO1FBQ2xELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDeEgsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUE7UUFDM0IsR0FBRyxDQUFDLENBQVUsVUFBa0IsRUFBbEIsS0FBQSxJQUFJLENBQUMsYUFBYSxFQUFsQixjQUFrQixFQUFsQixJQUFrQjtZQUEzQixJQUFJLENBQUMsU0FBQTtZQUNOLElBQU0sSUFBSSxHQUFHLElBQUksZ0NBQWdCLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMs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USxDQUFDO2tDQUFrQixnQ0FBc0I7NERBQUM7SUFOcEQsZUFBZTtRQVAzQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7WUFDbkMsU0FBUyxFQUFFLENBQUMsbUNBQWdCLENBQUM7U0FDaEMsQ0FBQzt5Q0EyRHdDLG1DQUFnQjtZQUNSLHVDQUFnQjtZQUMzQixtQkFBUTtPQTVEbEMsZUFBZSxDQTBOM0I7SUFBRCxzQkFBQztDQUFBLEFBMU5ELElBME5DO0FBMU5ZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7RHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb259IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXJcIjtcbmltcG9ydCB7UmFkU2lkZURyYXdlckNvbXBvbmVudH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5cbmltcG9ydCB7TXlIdHRwR2V0U2VydmljZX0gZnJvbSBcIi4uL3NoYXJlZC9NeUh0dHBHZXRTZXJ2aWNlXCJcbmltcG9ydCB7d2ViU2VydmljZXMsIGRlc2NyaXB0aW9uLCBzZWFyY2hLZXlib2FyZFR5cGV9IGZyb20gXCIuLi9zaGFyZWQvQ29uc3RhbnRzXCI7XG5pbXBvcnQge1NlZ21lbnRlZEJhciwgU2VnbWVudGVkQmFySXRlbX0gZnJvbSBcInVpL3NlZ21lbnRlZC1iYXJcIjtcbmltcG9ydCB7U2VhcmNoQmFyfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zZWFyY2gtYmFyXCI7XG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3Ivc3dpdGNoTWFwXCI7XG5pbXBvcnQge0xpc3RWaWV3RXZlbnREYXRhLCBSYWRMaXN0VmlldywgTGlzdFZpZXdMb2FkT25EZW1hbmRNb2RlfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9saXN0dmlld1wiO1xuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tICcuLi9zaGFyZWQvdXNlckluZm8nO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gJ2FwcGxpY2F0aW9uJztcbmltcG9ydCB7T2JzZXJ2YWJsZUFycmF5fSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IFNlYXJjaEl0ZW0gfSBmcm9tIFwiLi4vLi4vYXBwL3NlYXJjaC9TZWFyY2hJdGVtXCI7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgc2V0SW50ZXJ2YWwsIHNldFRpbWVvdXQsIGNsZWFySW50ZXJ2YWwgfSBmcm9tIFwidGltZXJcIjtcbmltcG9ydCAqIGFzIFRpbWVyIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3RpbWVyXCI7XG5cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJTZWFyY2hcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2VhcmNoLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOiBbXCJzZWFyY2guY29tcG9uZW50LmNzc1wiXSxcbiAgICBwcm92aWRlcnM6IFtNeUh0dHBHZXRTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHNlYXJjaFJlc3BvbnNlOiBBcnJheTxhbnk+O1xuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBVc2UgdGhlIEBWaWV3Q2hpbGQgZGVjb3JhdG9yIHRvIGdldCBhIHJlZmVyZW5jZSB0byB0aGUgZHJhd2VyIGNvbXBvbmVudC5cbiAgICAqIEl0IGlzIHVzZWQgaW4gdGhlIFwib25EcmF3ZXJCdXR0b25UYXBcIiBmdW5jdGlvbiBiZWxvdyB0byBtYW5pcHVsYXRlIHRoZSBkcmF3ZXIuXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBAVmlld0NoaWxkKFwiZHJhd2VyXCIpIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcblxuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcbiAgICBwdWJsaWMgaG9zdDogc3RyaW5nO1xuICAgIHB1YmxpYyB1c2VyQWdlbnQ6IHN0cmluZztcbiAgICBwdWJsaWMgb3JpZ2luOiBzdHJpbmc7XG4gICAgcHVibGljIHVybDogc3RyaW5nO1xuICAgIHB1YmxpYyB0ZXN0dmFsdWU6IE9ic2VydmFibGU8YW55PjtcbiAgICBwdWJsaWMgbXlJdGVtczogQXJyYXk8YW55PjtcbiAgICBwdWJsaWMgdG90YWxSZXN1bHRzOiBBcnJheTxhbnk+O1xuICAgIHB1YmxpYyBzZWFyY2hFbmRQdDogYW55O1xuICAgIHB1YmxpYyBzZWFyY2hIaW50OiBzdHJpbmc7XG4gICAgcHVibGljIHNlYXJjaEtleWJvYXJkVHlwZTogYW55O1xuICAgIHB1YmxpYyBteUl0ZW1zczogQXJyYXk8U2VnbWVudGVkQmFySXRlbT47XG4gICAgcHVibGljIGJhckl0ZW1UaXRsZXM6IEFycmF5PHN0cmluZz47XG4gICAgcHVibGljIHJlc3VsdEluZm86IHN0cmluZztcbiAgICBwdWJsaWMgbGFiZWxWaXNpYmlsaXR5OiBib29sZWFuO1xuICAgIHB1YmxpYyBsb2FkTW9kZWxWaXNpYmlsaXR5OiBib29sZWFuO1xuICAgIHB1YmxpYyBzZWFyY2hQaHJhc2U6IHN0cmluZztcbiAgICBwdWJsaWMgYWN0aXZpdHlJbmRpY2F0b3I6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSByZXNwb25zZTogYm9vbGVhbjtcbiAgICBwcml2YXRlIGluZHVzdHJ5OiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBzZWFyY2hCYXI6IGFueTtcbiAgICBwcml2YXRlIGluZGV4OiBudW1iZXI7XG4gICAgcHVibGljIGxvYWRNb3JlOiBzdHJpbmc7XG4gICAgcHVibGljIHNlYXJjaFN0cmluZzogc3RyaW5nO1xuICAgIHByaXZhdGUgX2RhdGFJdGVtczogT2JzZXJ2YWJsZUFycmF5PGFueT47XG4gICAgcHJpdmF0ZSBzZWFyY2hSZXN1bHRzOiBTZWFyY2hJdGVtW107XG4gICAgcHJpdmF0ZSBpbnRpYWxOdW1iZXI6IG51bWJlcjtcbiAgICBwcml2YXRlIGxpc3RWaWV3OiBSYWRMaXN0VmlldzsgXG5cbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogVXNlIHRoZSBzaWRlRHJhd2VyVHJhbnNpdGlvbiBwcm9wZXJ0eSB0byBjaGFuZ2UgdGhlIG9wZW4vY2xvc2UgYW5pbWF0aW9uIG9mIHRoZSBkcmF3ZXIuXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xuICAgICAgICB0aGlzLmFjdGl2aXR5SW5kaWNhdG9yID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVzcG9uc2UgPSBmYWxzZTtcblxuICAgICAgICBhcHAub24oYXBwLm9yaWVudGF0aW9uQ2hhbmdlZEV2ZW50LCAoYXJnczogYXBwLk9yaWVudGF0aW9uQ2hhbmdlZEV2ZW50RGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5teWluZm8uY3VycmVudFNlYXJjaFN0cmluZy5zdWJzY3JpYmUocmVzdWx0cyA9PiB0aGlzLnNlYXJjaFN0cmluZyA9IHJlc3VsdHMpO1xuICAgICAgICAgICAgdGhpcy5teWluZm8uY3VycmVudEVuZFB0LnN1YnNjcmliZShyZXN1bHRzID0+IHRoaXMuc2VhcmNoRW5kUHQgPSByZXN1bHRzKTtcbiAgICAgICAgICAgIGlmIChhcmdzLm5ld1ZhbHVlID09PSAnbGFuZHNjYXBlJykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlQ2FsbCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VDYWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgbXlTZXJ2aWNlOiBNeUh0dHBHZXRTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgICAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICAgICAgICAgICAgICAgICBwcml2YXRlIG15aW5mbzogVXNlckluZm8pIHtcbiAgICAgICAgdGhpcy5yZXN1bHRJbmZvID0gXCIgU2VsZWN0IHNlYXJjaCBjcml0ZXJpYSAuLi4uLlwiO1xuICAgICAgICB0aGlzLmxhYmVsVmlzaWJpbGl0eSA9IHRydWU7XG4gICAgICAgIHRoaXMubG9hZE1vZGVsVmlzaWJpbGl0eSA9IHRydWU7XG4gICAgICAgIHRoaXMuYmFySXRlbVRpdGxlcyA9IFtcIlNlcmlhbCAjXCIsIFwiTmFtZVwiLCBcIlZlaGljbGUgI1wiLCBcIlBvbGljeSBJc3N1ZSBEYXRlXCIsIFwiUG9saWN5ICNcIiwgXCJUZWxlcGhvbmUgI1wiLCBcIkVtYWlsIEFkZHJlc3NcIl07XG4gICAgICAgIHRoaXMubXlJdGVtc3MgPSBbXTtcbiAgICAgICAgdGhpcy5sb2FkTW9yZSA9IFwiTG9hZCBNb3JlXCJcbiAgICAgICAgZm9yICh2YXIgaSBvZiB0aGlzLmJhckl0ZW1UaXRsZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBuZXcgU2VnbWVudGVkQmFySXRlbSgpO1xuICAgICAgICAgICAgaXRlbS50aXRsZSA9IGk7XG4gICAgICAgICAgICB0aGlzLm15SXRlbXNzLnB1c2goaXRlbSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGdldCBzaWRlRHJhd2VyVHJhbnNpdGlvbigpOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcbiAgICB9XG5cbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogQWNjb3JkaW5nIHRvIGd1aWRlbGluZXMsIGlmIHlvdSBoYXZlIGEgZHJhd2VyIG9uIHlvdXIgcGFnZSwgeW91IHNob3VsZCBhbHdheXNcbiAgICAqIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gVXNlIHRoZSBzaG93RHJhd2VyKCkgZnVuY3Rpb24gdG8gb3BlbiB0aGUgYXBwIGRyYXdlciBzZWN0aW9uLlxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25HZXREYXRhU3VjY2VzcyhyZXMpIHtcbiAgICAgICAgdmFyIHRoYXQgPSBuZXcgV2Vha1JlZih0aGlzKTtcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgICAgIHRoaXMuaW50aWFsTnVtYmVyID0gMDtcbiAgICAgICAgdGhpcy5teUl0ZW1zID0gbmV3IEFycmF5PGFueT4oKTtcbiAgICAgICAgdGhpcy50b3RhbFJlc3VsdHMgPSBuZXcgQXJyYXk8YW55PigpO1xuICAgICAgICB0aGlzLnRvdGFsUmVzdWx0cyA9IHJlcy5yZXZlcnNlKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSAgKHRoaXMudG90YWxSZXN1bHRzLmxlbmd0aCA+PSAxMCA/IDEwIDogdGhpcy50b3RhbFJlc3VsdHMubGVuZ3RoKTsgaSA8PSBsZW47IGkrKykge1xuICAgICAgICAgICAgdGhpcy5teUl0ZW1zLnB1c2godGhpcy50b3RhbFJlc3VsdHNbaV0pO1xuICAgICAgICAgICAgdGhpcy5pbmRleCA9IGk7XG4gICAgICAgICAgICB0aGlzLmludGlhbE51bWJlcisrO1xuICAgICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGUgc2l6ZSBvZiB0aGUgYXJyYXkgaXM6IFwiICsgdGhpcy5teUl0ZW1zLmxlbmd0aCk7XG4gICAgICAgIHRoaXMuYWN0aXZpdHlJbmRpY2F0b3IgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMubXlJdGVtcykge1xuICAgICAgICAgICAgdGhpcy5sYWJlbFZpc2liaWxpdHkgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubG9hZE1vZGVsVmlzaWJpbGl0eSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sYWJlbFZpc2liaWxpdHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sb2FkTW9kZWxWaXNpYmlsaXR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0SW5mbyA9IFwiIE5vIERhdGEgZm91bmQuXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5saXN0Vmlldyl7XG4gICAgICAgICAgICB0aGlzLmxpc3RWaWV3LmxvYWRPbkRlbWFuZE1vZGUgPSBMaXN0Vmlld0xvYWRPbkRlbWFuZE1vZGVbTGlzdFZpZXdMb2FkT25EZW1hbmRNb2RlLkF1dG9dOyAgXG4gICAgICAgICB9XG4vKiAgICAgICAgIGZvciAobGV0IG15SXRlbSBpbiB0aGlzLm15SXRlbXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG15SXRlbS5JTlNVUkVEX05BTUUpO1xuICAgICAgICB9ICovXG5cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xuICAgICAgICBjb25zdCBib2R5ID0gZXJyb3IuanNvbigpIHx8IFwiXCI7XG4gICAgICAgIGNvbnN0IGVyciA9IGJvZHkuZXJyb3IgfHwgSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gICAgICAgIHRoaXMuYWN0aXZpdHlJbmRpY2F0b3IgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sYWJlbFZpc2liaWxpdHkgPSB0cnVlO1xuICAgICAgICB0aGlzLmxvYWRNb2RlbFZpc2liaWxpdHkgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc3VsdEluZm8gPSBcIiBObyBEYXRhIGZvdW5kLlwiO1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uR2V0RGF0YUVycm9yOiBcIiArIGVycik7XG4gICAgfVxuXG4gICAgZXh0cmFjdERhdGEoYXJncykge1xuICAgICAgICB0aGlzLmFjdGl2aXR5SW5kaWNhdG9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLnNlYXJjaFN0cmluZyA9IHRoaXMuc2VhcmNoQmFyLnRleHQ7XG4gICAgICAgIHRoaXMubXlpbmZvLmNoYW5nZVNlYXJjaFN0cmluZyh0aGlzLnNlYXJjaFN0cmluZyk7XG4gICAgICAgIHRoaXMubXlpbmZvLmNoYW5nZWVFbmRQdCh0aGlzLnNlYXJjaEVuZFB0KTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlQ2FsbCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2VydmljZUNhbGwoKSB7XG4gICAgXG4gICAgICAgIHRoaXMuc2VhcmNoUmVzcG9uc2UgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0RGF0YSgodGhpcy5zZWFyY2hFbmRQdCArIFwiP1wiICsgd2ViU2VydmljZXNbdGhpcy5zZWFyY2hFbmRQdF0gKyBcIj1cIiArIHRoaXMuc2VhcmNoU3RyaW5nKSkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyB0aGUgZmlyc3QgYXJndW1lbnQgaXMgYSBmdW5jdGlvbiB3aGljaCBydW5zIG9uIHN1Y2Nlc3NcbiAgICAgICAgICAgIGRhdGEgPT4geyBjb25zb2xlLmxvZygnZG9uZSBsb2FkaW5nIGZvb2RzJyk7XG4gICAgICAgICAgICBkYXRhLnJlY29yZHMubWFwKGl0ZW0gPT4geyBcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaFJlc3BvbnNlLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlJbmRpY2F0b3IgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YVN1Y2Nlc3ModGhpcy5zZWFyY2hSZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhYmVsVmlzaWJpbGl0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZE1vZGVsVmlzaWJpbGl0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0SW5mbyA9IFwiIE5vIERhdGEgZm91bmQuXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlJdGVtcyA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHRoZSBzZWNvbmQgYXJndW1lbnQgaXMgYSBmdW5jdGlvbiB3aGljaCBydW5zIG9uIGVycm9yXG4gICAgICAgICAgICBlcnIgPT4gY29uc29sZS5lcnJvcihlcnIpLFxuICAgICAgICAgICAgLy8gdGhlIHRoaXJkIGFyZ3VtZW50IGlzIGEgZnVuY3Rpb24gd2hpY2ggcnVucyBvbiBjb21wbGV0aW9uXG4gICAgICAgICAgICAoKSA9PiBjb25zb2xlLmxvZygnZG9uZSBsb2FkaW5nIGZvb2RzJyt0aGlzLnNlYXJjaFJlc3VsdHNbMF0uQUdFTlROQU1FKVxuICAgICAgICAgICk7XG4gfVxuXG4gICAgcHVibGljIG9uU2VsZWN0ZWRJbmRleENoYW5nZShhcmdzKSB7XG4gICAgICAgIGxldCBzZWdtZXRlZEJhciA9IDxTZWdtZW50ZWRCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIHRoaXMuc2VhcmNoSGludCA9IFwiU2VhcmNoIEJ5IFwiICsgc2VnbWV0ZWRCYXIuaXRlbXNbc2VnbWV0ZWRCYXIuc2VsZWN0ZWRJbmRleF0udGl0bGU7XG4gICAgICAgIHRoaXMuc2VhcmNoRW5kUHQgPSBkZXNjcmlwdGlvbltzZWdtZXRlZEJhci5pdGVtc1tzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4XS50aXRsZV07XG4gICAgICAgIHRoaXMuc2VhcmNoS2V5Ym9hcmRUeXBlID0gc2VhcmNoS2V5Ym9hcmRUeXBlW3NlZ21ldGVkQmFyLml0ZW1zW3NlZ21ldGVkQmFyLnNlbGVjdGVkSW5kZXhdLnRpdGxlXTtcbiAgICAgICAgdGhpcy5zZWFyY2hQaHJhc2UgPSBcIlwiO1xuXG4gICAgfVxuXG4gICAgb25Qb2xpY3l0ZW1UYXAoYXJncykge1xuXG4gICAgICAgIGNvbnN0IHRhcHBlZFBvbGljeUl0ZW0gPSBhcmdzLnZpZXcuYmluZGluZ0NvbnRleHQ7XG5cbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvc2VhcmNoL3BvbGljeURldGFpbHNcIiwgdGFwcGVkUG9saWN5SXRlbVswXV0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNsaWRlXCIsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgICAgICAgICAgICAgIGN1cnZlOiBcImVhc2VcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgcHVibGljIG9uQ2xlYXIoYXJncykge1xuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5zZWFyY2hQaHJhc2UgPSBcIlwiO1xuICAgIH1cblxuXG4gICAgcHVibGljIG9uTG9hZE1vcmVJdGVtc1JlcXVlc3RlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xuICAgICAgICB2YXIgdGhhdCA9IG5ldyBXZWFrUmVmKHRoaXMpO1xuXG4gICAgICAgIFRpbWVyLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhhdC5nZXQoKS5saXN0VmlldyA9IGFyZ3Mub2JqZWN0O1xuICAgICAgICAgICAgdmFyIGluaXRpYWxOdW1iZXJPZkl0ZW1zID0gdGhhdC5nZXQoKS5pbnRpYWxOdW1iZXI7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBpbml0aWFsTnVtYmVyT2ZJdGVtczsgaSA8IGluaXRpYWxOdW1iZXJPZkl0ZW1zICsgNDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPiB0aGF0LmdldCgpLnRvdGFsUmVzdWx0cy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZ2V0KCkubGlzdFZpZXcubG9hZE9uRGVtYW5kTW9kZSA9IExpc3RWaWV3TG9hZE9uRGVtYW5kTW9kZVtMaXN0Vmlld0xvYWRPbkRlbWFuZE1vZGUuTm9uZV07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB0aGF0LmdldCgpLm15SXRlbXMucHVzaCh0aGF0LmdldCgpLnRvdGFsUmVzdWx0c1tpXSk7XG4gICAgICAgICAgICAgICAgdGhhdC5nZXQoKS5pbnRpYWxOdW1iZXIrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoYXQuZ2V0KCkubGlzdFZpZXcubm90aWZ5TG9hZE9uRGVtYW5kRmluaXNoZWQoKTtcbiAgICAgICAgfSwxMDAwKTtcbiAgICAgICAgYXJncy5yZXR1cm5WYWx1ZSA9IHRydWU7XG4gICAgfVxufVxuIl19