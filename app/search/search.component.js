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
        this.resultInfo = " Select search criteria and input values in search field.";
        this.labelVisibility = true;
        this.barItemTitles = ["Serial #", "Name", "Vehicle #", "Policy Issue Date", "Policy #", "Telephone #", "Email Address"];
        this.myItemss = [];
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
        this.myItems = res;
        console.log("the size of the array is: " + this.myItems.length);
        this.activityIndicator = false;
        if (this.myItems) {
            this.labelVisibility = false;
        }
        else {
            this.labelVisibility = true;
            this.resultInfo = " No Data found for selected search criteria";
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
        this.resultInfo = " No Data found for selected search criteria";
        console.log("onGetDataError: " + err);
    };
    SearchComponent.prototype.extractData = function (args) {
        var _this = this;
        this.activityIndicator = true;
        var searchBar = args.object;
        this.myService.getData((this.searchEndPt + "?" + Constants_1.webServices[this.searchEndPt] + "=" + searchBar.text))
            .subscribe(function (result) {
            _this.response = true;
            console.log("result from webservices: " + result);
            _this.onGetDataSuccess(result);
        }, function (error) {
            _this.onGetDataError(error);
        });
        if (!this.response) {
            this.activityIndicator = false;
            this.labelVisibility = true;
            this.resultInfo = " No Data found for selected search criteria";
        }
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
        searchBar.text = "";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsNkRBQTRGO0FBQzVGLGtFQUE4RTtBQUU5RSwrREFBMkQ7QUFDM0QsaURBQWlGO0FBQ2pGLGtEQUFnRTtBQUVoRSw2REFBc0Q7QUFDdEQsdUNBQXFDO0FBU3JDO0lBa0NJLHlCQUEyQixTQUEyQixFQUMzQixpQkFBbUM7UUFEbkMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFDM0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUMxRCxJQUFJLENBQUMsVUFBVSxHQUFFLDJEQUEyRCxDQUFDO1FBQzdFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLFdBQVcsRUFBQyxtQkFBbUIsRUFBQyxVQUFVLEVBQUMsYUFBYSxFQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2xILElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxDQUFVLFVBQWtCLEVBQWxCLEtBQUEsSUFBSSxDQUFDLGFBQWEsRUFBbEIsY0FBa0IsRUFBbEIsSUFBa0I7WUFBM0IsSUFBSSxDQUFDLFNBQUE7WUFDTixJQUFNLElBQUksR0FBRyxJQUFJLGdDQUFnQixFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQztJQUNMLENBQUM7SUFyQkQ7O2tFQUU4RDtJQUM5RCxrQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksbUNBQXNCLEVBQUUsQ0FBQztRQUMxRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQy9C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QUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFuSW9CO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFrQixnQ0FBc0I7NERBQUM7SUFMcEQsZUFBZTtRQVAzQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7WUFDbkMsU0FBUyxFQUFFLENBQUMsbUNBQWdCLENBQUM7U0FDaEMsQ0FBQzt5Q0FtQ3dDLG1DQUFnQjtZQUNSLHVDQUFnQjtPQW5DckQsZUFBZSxDQTBJM0I7SUFBRCxzQkFBQztDQUFBLEFBMUlELElBMElDO0FBMUlZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtEcmF3ZXJUcmFuc2l0aW9uQmFzZSwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbn0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlclwiO1xuaW1wb3J0IHtSYWRTaWRlRHJhd2VyQ29tcG9uZW50fSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcblxuaW1wb3J0IHtNeUh0dHBHZXRTZXJ2aWNlfSBmcm9tIFwiLi4vc2hhcmVkL015SHR0cEdldFNlcnZpY2VcIlxuaW1wb3J0IHt3ZWJTZXJ2aWNlcywgZGVzY3JpcHRpb24sIHNlYXJjaEtleWJvYXJkVHlwZX0gZnJvbSBcIi4uL3NoYXJlZC9Db25zdGFudHNcIjtcbmltcG9ydCB7U2VnbWVudGVkQmFyLCBTZWdtZW50ZWRCYXJJdGVtfSBmcm9tIFwidWkvc2VnbWVudGVkLWJhclwiO1xuaW1wb3J0IHtTZWFyY2hCYXJ9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXJcIjtcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9zd2l0Y2hNYXBcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiU2VhcmNoXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3NlYXJjaC5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wic2VhcmNoLmNvbXBvbmVudC5jc3NcIl0sXG4gICAgcHJvdmlkZXJzOiBbTXlIdHRwR2V0U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogVXNlIHRoZSBAVmlld0NoaWxkIGRlY29yYXRvciB0byBnZXQgYSByZWZlcmVuY2UgdG8gdGhlIGRyYXdlciBjb21wb25lbnQuXG4gICAgKiBJdCBpcyB1c2VkIGluIHRoZSBcIm9uRHJhd2VyQnV0dG9uVGFwXCIgZnVuY3Rpb24gYmVsb3cgdG8gbWFuaXB1bGF0ZSB0aGUgZHJhd2VyLlxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgQFZpZXdDaGlsZChcImRyYXdlclwiKSBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG5cbiAgICBwcml2YXRlIF9zaWRlRHJhd2VyVHJhbnNpdGlvbjogRHJhd2VyVHJhbnNpdGlvbkJhc2U7XG4gICAgcHVibGljIGhvc3Q6IHN0cmluZztcbiAgICBwdWJsaWMgdXNlckFnZW50OiBzdHJpbmc7XG4gICAgcHVibGljIG9yaWdpbjogc3RyaW5nO1xuICAgIHB1YmxpYyB1cmw6IHN0cmluZztcbiAgICBwdWJsaWMgbXlJdGVtczogQXJyYXk8YW55PjtcbiAgICBwdWJsaWMgc2VhcmNoRW5kUHQ6IGFueTtcbiAgICBwdWJsaWMgc2VhcmNoSGludDogc3RyaW5nO1xuICAgIHB1YmxpYyBzZWFyY2hLZXlib2FyZFR5cGU6IGFueTtcbiAgICBwdWJsaWMgbXlJdGVtc3M6IEFycmF5PFNlZ21lbnRlZEJhckl0ZW0+O1xuICAgIHB1YmxpYyBiYXJJdGVtVGl0bGVzOiBBcnJheTxzdHJpbmc+O1xuICAgIHB1YmxpYyByZXN1bHRJbmZvOiBzdHJpbmc7XG4gICAgcHVibGljIGxhYmVsVmlzaWJpbGl0eSA6Ym9vbGVhbjtcbiAgICBwdWJsaWMgc2VhcmNoUGhyYXNlOiBzdHJpbmc7XG4gICAgcHVibGljIGFjdGl2aXR5SW5kaWNhdG9yOiBib29sZWFuO1xuICAgIHByaXZhdGUgcmVzcG9uc2U6IGJvb2xlYW47XG5cbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogVXNlIHRoZSBzaWRlRHJhd2VyVHJhbnNpdGlvbiBwcm9wZXJ0eSB0byBjaGFuZ2UgdGhlIG9wZW4vY2xvc2UgYW5pbWF0aW9uIG9mIHRoZSBkcmF3ZXIuXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xuICAgICAgICB0aGlzLmFjdGl2aXR5SW5kaWNhdG9yID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVzcG9uc2UgPSBmYWxzZTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIG15U2VydmljZTogTXlIdHRwR2V0U2VydmljZSxcbiAgICAgICAgICAgICAgICAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xuICAgICAgICB0aGlzLnJlc3VsdEluZm89IFwiIFNlbGVjdCBzZWFyY2ggY3JpdGVyaWEgYW5kIGlucHV0IHZhbHVlcyBpbiBzZWFyY2ggZmllbGQuXCI7XG4gICAgICAgIHRoaXMubGFiZWxWaXNpYmlsaXR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5iYXJJdGVtVGl0bGVzID0gW1wiU2VyaWFsICNcIixcIk5hbWVcIixcIlZlaGljbGUgI1wiLFwiUG9saWN5IElzc3VlIERhdGVcIixcIlBvbGljeSAjXCIsXCJUZWxlcGhvbmUgI1wiLFwiRW1haWwgQWRkcmVzc1wiXTtcbiAgICAgICAgdGhpcy5teUl0ZW1zcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpIG9mIHRoaXMuYmFySXRlbVRpdGxlcyApIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBuZXcgU2VnbWVudGVkQmFySXRlbSgpO1xuICAgICAgICAgICAgICAgIGl0ZW0udGl0bGUgPSBpO1xuICAgICAgICAgICAgICAgIHRoaXMubXlJdGVtc3MucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBzaWRlRHJhd2VyVHJhbnNpdGlvbigpOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcbiAgICB9XG5cbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogQWNjb3JkaW5nIHRvIGd1aWRlbGluZXMsIGlmIHlvdSBoYXZlIGEgZHJhd2VyIG9uIHlvdXIgcGFnZSwgeW91IHNob3VsZCBhbHdheXNcbiAgICAqIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gVXNlIHRoZSBzaG93RHJhd2VyKCkgZnVuY3Rpb24gdG8gb3BlbiB0aGUgYXBwIGRyYXdlciBzZWN0aW9uLlxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25HZXREYXRhU3VjY2VzcyhyZXMpIHtcbiAgICAgICAgdGhpcy5teUl0ZW1zID0gcmVzO1xuICAgICAgICBjb25zb2xlLmxvZyhcInRoZSBzaXplIG9mIHRoZSBhcnJheSBpczogXCIgKyB0aGlzLm15SXRlbXMubGVuZ3RoICk7XG4gICAgICAgIHRoaXMuYWN0aXZpdHlJbmRpY2F0b3IgPSBmYWxzZTtcbiAgICAgICAgaWYodGhpcy5teUl0ZW1zKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmxhYmVsVmlzaWJpbGl0eSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sYWJlbFZpc2liaWxpdHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRJbmZvID1cIiBObyBEYXRhIGZvdW5kIGZvciBzZWxlY3RlZCBzZWFyY2ggY3JpdGVyaWFcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhvc3QgPSByZXMuaGVhZGVycy5Ib3N0O1xuICAgICAgICB0aGlzLnVzZXJBZ2VudCA9IHJlcy5oZWFkZXJzW1wiVXNlci1BZ2VudFwiXTtcbiAgICAgICAgdGhpcy5vcmlnaW4gPSByZXMub3JpZ2luO1xuICAgICAgICB0aGlzLnVybCA9IHJlcy51cmw7XG4gICAgICAgIGZvciAobGV0IG15SXRlbSBpbiB0aGlzLm15SXRlbXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG15SXRlbSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHByaXZhdGUgb25HZXREYXRhRXJyb3IoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBlcnJvci5qc29uKCkgfHwgXCJcIjtcbiAgICAgICAgY29uc3QgZXJyID0gYm9keS5lcnJvciB8fCBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICAgICAgdGhpcy5hY3Rpdml0eUluZGljYXRvciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxhYmVsVmlzaWJpbGl0eSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdWx0SW5mbyA9XCIgTm8gRGF0YSBmb3VuZCBmb3Igc2VsZWN0ZWQgc2VhcmNoIGNyaXRlcmlhXCI7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25HZXREYXRhRXJyb3I6IFwiICsgZXJyKTtcbiAgICB9XG5cbiAgICBleHRyYWN0RGF0YShhcmdzKSB7XG4gICAgICAgIHRoaXMuYWN0aXZpdHlJbmRpY2F0b3IgPSB0cnVlO1xuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0RGF0YSgodGhpcy5zZWFyY2hFbmRQdCArIFwiP1wiICsgd2ViU2VydmljZXNbdGhpcy5zZWFyY2hFbmRQdF0gKyBcIj1cIiArIHNlYXJjaEJhci50ZXh0KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2U9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZXN1bHQgZnJvbSB3ZWJzZXJ2aWNlczogXCIgKyByZXN1bHQpO1xuICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgaWYoIXRoaXMucmVzcG9uc2Upe1xuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eUluZGljYXRvciA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sYWJlbFZpc2liaWxpdHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yZXN1bHRJbmZvID1cIiBObyBEYXRhIGZvdW5kIGZvciBzZWxlY3RlZCBzZWFyY2ggY3JpdGVyaWFcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBvblNlbGVjdGVkSW5kZXhDaGFuZ2UoYXJncykge1xuICAgICAgICBsZXQgc2VnbWV0ZWRCYXIgPSA8U2VnbWVudGVkQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLnNlYXJjaEhpbnQgPSBcIlNlYXJjaCBCeSBcIiArIHNlZ21ldGVkQmFyLml0ZW1zW3NlZ21ldGVkQmFyLnNlbGVjdGVkSW5kZXhdLnRpdGxlO1xuICAgICAgICB0aGlzLnNlYXJjaEVuZFB0ID0gZGVzY3JpcHRpb25bc2VnbWV0ZWRCYXIuaXRlbXNbc2VnbWV0ZWRCYXIuc2VsZWN0ZWRJbmRleF0udGl0bGVdO1xuICAgICAgICB0aGlzLnNlYXJjaEtleWJvYXJkVHlwZSA9IHNlYXJjaEtleWJvYXJkVHlwZVtzZWdtZXRlZEJhci5pdGVtc1tzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4XS50aXRsZV07XG4gICAgICAgIHRoaXMuc2VhcmNoUGhyYXNlID0gXCJcIjtcblxuICAgIH1cblxuICAgIG9uUG9saWN5dGVtVGFwKGFyZ3MpIHtcblxuICAgICAgICBjb25zdCB0YXBwZWRQb2xpY3lJdGVtID0gYXJncy52aWV3LmJpbmRpbmdDb250ZXh0O1xuXG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3NlYXJjaC9wb2xpY3lEZXRhaWxzXCIsIHRhcHBlZFBvbGljeUl0ZW0uaWRdLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGFuaW1hdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzbGlkZVwiLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgICAgICAgICAgICAgICBjdXJ2ZTogXCJlYXNlXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBvbkNsZWFyKGFyZ3MpIHtcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIHNlYXJjaEJhci50ZXh0ID0gXCJcIjtcbiAgICB9XG5cbn1cbiJdfQ==