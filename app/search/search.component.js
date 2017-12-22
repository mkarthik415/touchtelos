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
            _this.activityIndicator = false;
            if (result) {
                console.log("result from webservices: " + result);
                _this.onGetDataSuccess(result);
            }
            else {
                _this.labelVisibility = true;
                _this.resultInfo = " No Data found for selected search criteria";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsNkRBQTRGO0FBQzVGLGtFQUE4RTtBQUU5RSwrREFBMkQ7QUFDM0QsaURBQWlGO0FBQ2pGLGtEQUFnRTtBQUVoRSw2REFBc0Q7QUFDdEQsdUNBQXFDO0FBU3JDO0lBa0NJLHlCQUEyQixTQUEyQixFQUMzQixpQkFBbUM7UUFEbkMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFDM0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUMxRCxJQUFJLENBQUMsVUFBVSxHQUFHLDJEQUEyRCxDQUFDO1FBQzlFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3hILElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxDQUFVLFVBQWtCLEVBQWxCLEtBQUEsSUFBSSxDQUFDLGFBQWEsRUFBbEIsY0FBa0IsRUFBbEIsSUFBa0I7WUFBM0IsSUFBSSxDQUFDLFNBQUE7WUFDTixJQUFNLElBQUksR0FBRyxJQUFJLGdDQUFnQixFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFyQkQ7O2tFQUU4RDtJQUM5RCxrQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksbUNBQXNCLEVBQUUsQ0FBQztRQUMxRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQy9C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QztRQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBcElvQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBa0IsZ0NBQXNCOzREQUFDO0lBTHBELGVBQWU7UUFQM0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixDQUFDO1lBQ25DLFNBQVMsRUFBRSxDQUFDLG1DQUFnQixDQUFDO1NBQ2hDLENBQUM7eUNBbUN3QyxtQ0FBZ0I7WUFDUix1Q0FBZ0I7T0FuQ3JELGVBQWUsQ0EySTNCO0lBQUQsc0JBQUM7Q0FBQSxBQTNJRCxJQTJJQztBQTNJWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7RHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb259IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXJcIjtcbmltcG9ydCB7UmFkU2lkZURyYXdlckNvbXBvbmVudH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5cbmltcG9ydCB7TXlIdHRwR2V0U2VydmljZX0gZnJvbSBcIi4uL3NoYXJlZC9NeUh0dHBHZXRTZXJ2aWNlXCJcbmltcG9ydCB7d2ViU2VydmljZXMsIGRlc2NyaXB0aW9uLCBzZWFyY2hLZXlib2FyZFR5cGV9IGZyb20gXCIuLi9zaGFyZWQvQ29uc3RhbnRzXCI7XG5pbXBvcnQge1NlZ21lbnRlZEJhciwgU2VnbWVudGVkQmFySXRlbX0gZnJvbSBcInVpL3NlZ21lbnRlZC1iYXJcIjtcbmltcG9ydCB7U2VhcmNoQmFyfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zZWFyY2gtYmFyXCI7XG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3Ivc3dpdGNoTWFwXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIlNlYXJjaFwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zZWFyY2guY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcInNlYXJjaC5jb21wb25lbnQuY3NzXCJdLFxuICAgIHByb3ZpZGVyczogW015SHR0cEdldFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFVzZSB0aGUgQFZpZXdDaGlsZCBkZWNvcmF0b3IgdG8gZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBkcmF3ZXIgY29tcG9uZW50LlxuICAgICogSXQgaXMgdXNlZCBpbiB0aGUgXCJvbkRyYXdlckJ1dHRvblRhcFwiIGZ1bmN0aW9uIGJlbG93IHRvIG1hbmlwdWxhdGUgdGhlIGRyYXdlci5cbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuXG4gICAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xuICAgIHB1YmxpYyBob3N0OiBzdHJpbmc7XG4gICAgcHVibGljIHVzZXJBZ2VudDogc3RyaW5nO1xuICAgIHB1YmxpYyBvcmlnaW46IHN0cmluZztcbiAgICBwdWJsaWMgdXJsOiBzdHJpbmc7XG4gICAgcHVibGljIG15SXRlbXM6IEFycmF5PGFueT47XG4gICAgcHVibGljIHNlYXJjaEVuZFB0OiBhbnk7XG4gICAgcHVibGljIHNlYXJjaEhpbnQ6IHN0cmluZztcbiAgICBwdWJsaWMgc2VhcmNoS2V5Ym9hcmRUeXBlOiBhbnk7XG4gICAgcHVibGljIG15SXRlbXNzOiBBcnJheTxTZWdtZW50ZWRCYXJJdGVtPjtcbiAgICBwdWJsaWMgYmFySXRlbVRpdGxlczogQXJyYXk8c3RyaW5nPjtcbiAgICBwdWJsaWMgcmVzdWx0SW5mbzogc3RyaW5nO1xuICAgIHB1YmxpYyBsYWJlbFZpc2liaWxpdHk6IGJvb2xlYW47XG4gICAgcHVibGljIHNlYXJjaFBocmFzZTogc3RyaW5nO1xuICAgIHB1YmxpYyBhY3Rpdml0eUluZGljYXRvcjogYm9vbGVhbjtcbiAgICBwcml2YXRlIHJlc3BvbnNlOiBib29sZWFuO1xuXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFVzZSB0aGUgc2lkZURyYXdlclRyYW5zaXRpb24gcHJvcGVydHkgdG8gY2hhbmdlIHRoZSBvcGVuL2Nsb3NlIGFuaW1hdGlvbiBvZiB0aGUgZHJhd2VyLlxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uID0gbmV3IFNsaWRlSW5PblRvcFRyYW5zaXRpb24oKTtcbiAgICAgICAgdGhpcy5hY3Rpdml0eUluZGljYXRvciA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlc3BvbnNlID0gZmFsc2U7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBteVNlcnZpY2U6IE15SHR0cEdldFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHtcbiAgICAgICAgdGhpcy5yZXN1bHRJbmZvID0gXCIgU2VsZWN0IHNlYXJjaCBjcml0ZXJpYSBhbmQgaW5wdXQgdmFsdWVzIGluIHNlYXJjaCBmaWVsZC5cIjtcbiAgICAgICAgdGhpcy5sYWJlbFZpc2liaWxpdHkgPSB0cnVlO1xuICAgICAgICB0aGlzLmJhckl0ZW1UaXRsZXMgPSBbXCJTZXJpYWwgI1wiLCBcIk5hbWVcIiwgXCJWZWhpY2xlICNcIiwgXCJQb2xpY3kgSXNzdWUgRGF0ZVwiLCBcIlBvbGljeSAjXCIsIFwiVGVsZXBob25lICNcIiwgXCJFbWFpbCBBZGRyZXNzXCJdO1xuICAgICAgICB0aGlzLm15SXRlbXNzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgb2YgdGhpcy5iYXJJdGVtVGl0bGVzKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbmV3IFNlZ21lbnRlZEJhckl0ZW0oKTtcbiAgICAgICAgICAgIGl0ZW0udGl0bGUgPSBpO1xuICAgICAgICAgICAgdGhpcy5teUl0ZW1zcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uO1xuICAgIH1cblxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xuICAgICogaGF2ZSBhIGJ1dHRvbiB0aGF0IG9wZW5zIGl0LiBVc2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkdldERhdGFTdWNjZXNzKHJlcykge1xuICAgICAgICB0aGlzLm15SXRlbXMgPSByZXM7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGhlIHNpemUgb2YgdGhlIGFycmF5IGlzOiBcIiArIHRoaXMubXlJdGVtcy5sZW5ndGgpO1xuICAgICAgICB0aGlzLmFjdGl2aXR5SW5kaWNhdG9yID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLm15SXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWxWaXNpYmlsaXR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxhYmVsVmlzaWJpbGl0eSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJlc3VsdEluZm8gPSBcIiBObyBEYXRhIGZvdW5kIGZvciBzZWxlY3RlZCBzZWFyY2ggY3JpdGVyaWFcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhvc3QgPSByZXMuaGVhZGVycy5Ib3N0O1xuICAgICAgICB0aGlzLnVzZXJBZ2VudCA9IHJlcy5oZWFkZXJzW1wiVXNlci1BZ2VudFwiXTtcbiAgICAgICAgdGhpcy5vcmlnaW4gPSByZXMub3JpZ2luO1xuICAgICAgICB0aGlzLnVybCA9IHJlcy51cmw7XG4gICAgICAgIGZvciAobGV0IG15SXRlbSBpbiB0aGlzLm15SXRlbXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG15SXRlbSk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHByaXZhdGUgb25HZXREYXRhRXJyb3IoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBlcnJvci5qc29uKCkgfHwgXCJcIjtcbiAgICAgICAgY29uc3QgZXJyID0gYm9keS5lcnJvciB8fCBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICAgICAgdGhpcy5hY3Rpdml0eUluZGljYXRvciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxhYmVsVmlzaWJpbGl0eSA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzdWx0SW5mbyA9IFwiIE5vIERhdGEgZm91bmQgZm9yIHNlbGVjdGVkIHNlYXJjaCBjcml0ZXJpYVwiO1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uR2V0RGF0YUVycm9yOiBcIiArIGVycik7XG4gICAgfVxuXG4gICAgZXh0cmFjdERhdGEoYXJncykge1xuICAgICAgICB0aGlzLmFjdGl2aXR5SW5kaWNhdG9yID0gdHJ1ZTtcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldERhdGEoKHRoaXMuc2VhcmNoRW5kUHQgKyBcIj9cIiArIHdlYlNlcnZpY2VzW3RoaXMuc2VhcmNoRW5kUHRdICsgXCI9XCIgKyBzZWFyY2hCYXIudGV4dCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2aXR5SW5kaWNhdG9yID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzdWx0IGZyb20gd2Vic2VydmljZXM6IFwiICsgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhYmVsVmlzaWJpbGl0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0SW5mbyA9IFwiIE5vIERhdGEgZm91bmQgZm9yIHNlbGVjdGVkIHNlYXJjaCBjcml0ZXJpYVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uU2VsZWN0ZWRJbmRleENoYW5nZShhcmdzKSB7XG4gICAgICAgIGxldCBzZWdtZXRlZEJhciA9IDxTZWdtZW50ZWRCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIHRoaXMuc2VhcmNoSGludCA9IFwiU2VhcmNoIEJ5IFwiICsgc2VnbWV0ZWRCYXIuaXRlbXNbc2VnbWV0ZWRCYXIuc2VsZWN0ZWRJbmRleF0udGl0bGU7XG4gICAgICAgIHRoaXMuc2VhcmNoRW5kUHQgPSBkZXNjcmlwdGlvbltzZWdtZXRlZEJhci5pdGVtc1tzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4XS50aXRsZV07XG4gICAgICAgIHRoaXMuc2VhcmNoS2V5Ym9hcmRUeXBlID0gc2VhcmNoS2V5Ym9hcmRUeXBlW3NlZ21ldGVkQmFyLml0ZW1zW3NlZ21ldGVkQmFyLnNlbGVjdGVkSW5kZXhdLnRpdGxlXTtcbiAgICAgICAgdGhpcy5zZWFyY2hQaHJhc2UgPSBcIlwiO1xuXG4gICAgfVxuXG4gICAgb25Qb2xpY3l0ZW1UYXAoYXJncykge1xuXG4gICAgICAgIGNvbnN0IHRhcHBlZFBvbGljeUl0ZW0gPSBhcmdzLnZpZXcuYmluZGluZ0NvbnRleHQ7XG5cbiAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvc2VhcmNoL3BvbGljeURldGFpbHNcIiwgdGFwcGVkUG9saWN5SXRlbS5pZF0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNsaWRlXCIsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgICAgICAgICAgICAgIGN1cnZlOiBcImVhc2VcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgcHVibGljIG9uQ2xlYXIoYXJncykge1xuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5zZWFyY2hQaHJhc2UgPSBcIlwiO1xuICAgIH1cblxufVxuIl19