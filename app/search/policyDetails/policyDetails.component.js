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
    function PolicyDetailsComponent(_pageRoute, myService, _routerExtensions) {
        this._pageRoute = _pageRoute;
        this.myService = myService;
        this._routerExtensions = _routerExtensions;
        this.selectedIndex = 0;
        this.items = [];
        this.barItemTitles = ["Personal Details", "Ins Company Details", "Policy Details", "Amount Details", "Documents", "Renewal Details"];
        this.selectedIndex = 0;
        this.visibility = "Personal Details";
        this.policyType = "Fire";
        for (var _i = 0, _a = this.barItemTitles; _i < _a.length; _i++) {
            var i = _a[_i];
            var item = new segmented_bar_1.SegmentedBarItem();
            item.title = i;
            this.items.push(item);
        }
    }
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    PolicyDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        this.activityIndicator = false;
        this._pageRoute.activatedRoute
            .switchMap(function (activatedRoute) { return activatedRoute.params; })
            .forEach(function (params) {
            _this.mySerialNumber = params.id;
        });
        this.activityIndicator = false;
        this.myService.getData("bySerialNumber?serialNumber" + "=" + this.mySerialNumber)
            .subscribe(function (result) {
            _this.onGetDataSuccess(result);
        }, function (error) {
            _this.onGetDataError(error);
        });
    };
    PolicyDetailsComponent.prototype.getDocumentsInfo = function () {
        var _this = this;
        this.myService.getData("documentsByClient?id" + "=" + this.mySerialNumber)
            .subscribe(function (result) {
            _this.onGetDocumentsSuccess(result);
        }, function (error) {
            _this.onGetDataError(error);
        });
    };
    PolicyDetailsComponent.prototype.onGetDocumentsSuccess = function (documents) {
        this.dataItems = documents;
        console.log("results are " + this.dataItems[0]);
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
        this.activityIndicator = true;
        this.policyInfo = res;
        this.policyType = this.policyInfo[0].department;
        console.log("results are " + this.policyInfo[0].clientName);
    };
    PolicyDetailsComponent.prototype.onGetDataError = function (error) {
        var body = error.json() || "";
        var err = body.error || JSON.stringify(body);
        console.log("onGetDataError: " + err);
    };
    PolicyDetailsComponent.prototype.onSelectedIndexChange = function (args) {
        var segmetedBar = args.object;
        this.selectedIndex = segmetedBar.selectedIndex;
        this.visibility = segmetedBar.items[segmetedBar.selectedIndex].title;
        if (this.visibility == "Documents") {
            this.getDocumentsInfo();
        }
    };
    PolicyDetailsComponent.prototype.onSetupItemView = function (args) {
        args.view.context.third = (args.index % 3 === 0);
        args.view.context.header = ((args.index + 1) % this.items.length === 1);
        args.view.context.footer = (args.index + 1 === this.items.length);
    };
    PolicyDetailsComponent.prototype.onItemTap = function (args) {
        console.log("Item Tapped at cell index: " + args.index);
        this._routerExtensions.navigate(["/search/viewDocuments", this.dataItems[args.index].id], {
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });
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
            MyHttpGetService_1.MyHttpGetService,
            nativescript_angular_1.RouterExtensions])
    ], PolicyDetailsComponent);
    return PolicyDetailsComponent;
}());
exports.PolicyDetailsComponent = PolicyDetailsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5RGV0YWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb2xpY3lEZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCw2REFBOEY7QUFDOUYsa0VBQWdGO0FBQ2hGLDZEQUFpRTtBQUNqRSx1Q0FBcUM7QUFDckMsa0VBQStEO0FBQy9ELG1FQUFpRjtBQVVqRjtJQXdDSSxnQ0FBMkIsVUFBcUIsRUFDckIsU0FBMkIsRUFDM0IsaUJBQW1DO1FBRm5DLGVBQVUsR0FBVixVQUFVLENBQVc7UUFDckIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFDM0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQS9CdkQsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFnQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxrQkFBa0IsRUFBQyxxQkFBcUIsRUFBQyxnQkFBZ0IsRUFBQyxnQkFBZ0IsRUFBQyxXQUFXLEVBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNoSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLGtCQUFrQixDQUFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLEdBQUcsQ0FBQyxDQUFVLFVBQWtCLEVBQWxCLEtBQUEsSUFBSSxDQUFDLGFBQWEsRUFBbEIsY0FBa0IsRUFBbEIsSUFBa0I7WUFBM0IsSUFBSSxDQUFDLFNBQUE7WUFDTixJQUFNLElBQUksR0FBRyxJQUFJLGdDQUFnQixFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QjtJQUVMLENBQUM7SUFuQ0Q7O2tFQUU4RDtJQUM5RCx5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QUNYLENBQUM7SUF2SG9CO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFrQixnQ0FBc0I7bUVBQUM7SUFMcEQsc0JBQXNCO1FBUGxDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztZQUN6QyxTQUFTLEVBQUUsQ0FBQyxtQ0FBZ0IsQ0FBQztTQUNoQyxDQUFDO3lDQXlDeUMsZ0NBQVM7WUFDVixtQ0FBZ0I7WUFDUix1Q0FBZ0I7T0ExQ3JELHNCQUFzQixDQTZIbEM7SUFBRCw2QkFBQztDQUFBLEFBN0hELElBNkhDO0FBN0hZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyXCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQge1BhZ2VSb3V0ZSwgUm91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9zd2l0Y2hNYXBcIjtcbmltcG9ydCB7TXlIdHRwR2V0U2VydmljZX0gZnJvbSBcIi4uLy4uL3NoYXJlZC9NeUh0dHBHZXRTZXJ2aWNlXCI7XG5pbXBvcnQge1NlZ21lbnRlZEJhciwgU2VnbWVudGVkQmFySXRlbX0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VnbWVudGVkLWJhclwiO1xuaW1wb3J0IHsgU2V0dXBJdGVtVmlld0FyZ3MgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJwb2xpY3lEZXRhaWxzXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BvbGljeURldGFpbHMuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6IFtcInBvbGljeURldGFpbC5jb21wb25lbnQuY3NzXCJdLFxuICAgIHByb3ZpZGVyczogW015SHR0cEdldFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFBvbGljeURldGFpbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBVc2UgdGhlIEBWaWV3Q2hpbGQgZGVjb3JhdG9yIHRvIGdldCBhIHJlZmVyZW5jZSB0byB0aGUgZHJhd2VyIGNvbXBvbmVudC5cbiAgICAqIEl0IGlzIHVzZWQgaW4gdGhlIFwib25EcmF3ZXJCdXR0b25UYXBcIiBmdW5jdGlvbiBiZWxvdyB0byBtYW5pcHVsYXRlIHRoZSBkcmF3ZXIuXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBAVmlld0NoaWxkKFwiZHJhd2VyXCIpIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcblxuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcbiAgICBwdWJsaWMgbXlTZXJpYWxOdW1iZXI6IHN0cmluZztcbiAgICBwdWJsaWMgcG9saWN5SW5mbzogQXJyYXk8YW55PjtcbiAgICBwdWJsaWMgaXRlbXM6IEFycmF5PFNlZ21lbnRlZEJhckl0ZW0+O1xuICAgIHB1YmxpYyBzZWxlY3RlZEluZGV4ID0gMDtcbiAgICBwdWJsaWMgdmlzaWJpbGl0eTogc3RyaW5nO1xuICAgIHB1YmxpYyBiYXJJdGVtVGl0bGVzOiBBcnJheTxzdHJpbmc+O1xuICAgIHB1YmxpYyBkYXRhSXRlbXM6IEFycmF5PGFueT47XG4gICAgcHVibGljIGludm9pY2VMaW5rOiBzdHJpbmc7XG4gICAgcHVibGljIGFjdGl2aXR5SW5kaWNhdG9yOiBib29sZWFuO1xuICAgIHB1YmxpYyBwb2xpY3lUeXBlOiBzdHJpbmc7XG5cbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogVXNlIHRoZSBzaWRlRHJhd2VyVHJhbnNpdGlvbiBwcm9wZXJ0eSB0byBjaGFuZ2UgdGhlIG9wZW4vY2xvc2UgYW5pbWF0aW9uIG9mIHRoZSBkcmF3ZXIuXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xuICAgICAgICB0aGlzLmFjdGl2aXR5SW5kaWNhdG9yID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3BhZ2VSb3V0ZS5hY3RpdmF0ZWRSb3V0ZVxuICAgICAgICAgICAgLnN3aXRjaE1hcCgoYWN0aXZhdGVkUm91dGUpID0+IGFjdGl2YXRlZFJvdXRlLnBhcmFtcylcbiAgICAgICAgICAgIC5mb3JFYWNoKChwYXJhbXMpID0+IHtcbiAgICAgICAgICAgICAgICAgdGhpcy5teVNlcmlhbE51bWJlciA9IHBhcmFtcy5pZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eUluZGljYXRvciA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldERhdGEoXCJieVNlcmlhbE51bWJlcj9zZXJpYWxOdW1iZXJcIisgXCI9XCIgKyB0aGlzLm15U2VyaWFsTnVtYmVyKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCk7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYWdlUm91dGU6IFBhZ2VSb3V0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgcHJpdmF0ZSBteVNlcnZpY2U6IE15SHR0cEdldFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLmJhckl0ZW1UaXRsZXMgPSBbXCJQZXJzb25hbCBEZXRhaWxzXCIsXCJJbnMgQ29tcGFueSBEZXRhaWxzXCIsXCJQb2xpY3kgRGV0YWlsc1wiLFwiQW1vdW50IERldGFpbHNcIixcIkRvY3VtZW50c1wiLFwiUmVuZXdhbCBEZXRhaWxzXCJdO1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSBcIlBlcnNvbmFsIERldGFpbHNcIjtcbiAgICAgICAgdGhpcy5wb2xpY3lUeXBlID0gXCJGaXJlXCI7XG4gICAgICAgIGZvciAodmFyIGkgb2YgdGhpcy5iYXJJdGVtVGl0bGVzKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbmV3IFNlZ21lbnRlZEJhckl0ZW0oKTtcbiAgICAgICAgICAgIGl0ZW0udGl0bGUgPSBpO1xuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXREb2N1bWVudHNJbmZvKClcbiAgICB7XG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldERhdGEoXCJkb2N1bWVudHNCeUNsaWVudD9pZFwiKyBcIj1cIiArIHRoaXMubXlTZXJpYWxOdW1iZXIpXG4gICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkdldERvY3VtZW50c1N1Y2Nlc3MocmVzdWx0KTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25HZXREb2N1bWVudHNTdWNjZXNzKGRvY3VtZW50cylcbiAgICB7XG4gICAgICAgIHRoaXMuZGF0YUl0ZW1zID0gZG9jdW1lbnRzO1xuICAgICAgICBjb25zb2xlLmxvZyhcInJlc3VsdHMgYXJlIFwiK3RoaXMuZGF0YUl0ZW1zWzBdKTtcbiAgICB9XG5cbiAgICBnZXQgc2lkZURyYXdlclRyYW5zaXRpb24oKTogRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XG4gICAgfVxuXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIEFjY29yZGluZyB0byBndWlkZWxpbmVzLCBpZiB5b3UgaGF2ZSBhIGRyYXdlciBvbiB5b3VyIHBhZ2UsIHlvdSBzaG91bGQgYWx3YXlzXG4gICAgKiBoYXZlIGEgYnV0dG9uIHRoYXQgb3BlbnMgaXQuIFVzZSB0aGUgc2hvd0RyYXdlcigpIGZ1bmN0aW9uIHRvIG9wZW4gdGhlIGFwcCBkcmF3ZXIgc2VjdGlvbi5cbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR2V0RGF0YVN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIHRoaXMuYWN0aXZpdHlJbmRpY2F0b3IgPSB0cnVlO1xuICAgICAgICB0aGlzLnBvbGljeUluZm8gPSByZXM7XG4gICAgICAgIHRoaXMucG9saWN5VHlwZSA9IHRoaXMucG9saWN5SW5mb1swXS5kZXBhcnRtZW50O1xuICAgICAgICBjb25zb2xlLmxvZyhcInJlc3VsdHMgYXJlIFwiK3RoaXMucG9saWN5SW5mb1swXS5jbGllbnROYW1lKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xuICAgICAgICBjb25zdCBib2R5ID0gZXJyb3IuanNvbigpIHx8IFwiXCI7XG4gICAgICAgIGNvbnN0IGVyciA9IGJvZHkuZXJyb3IgfHwgSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25HZXREYXRhRXJyb3I6IFwiICsgZXJyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TZWxlY3RlZEluZGV4Q2hhbmdlKGFyZ3MpIHtcbiAgICAgICAgbGV0IHNlZ21ldGVkQmFyID0gPFNlZ21lbnRlZEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gc2VnbWV0ZWRCYXIuc2VsZWN0ZWRJbmRleDtcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5ID0gc2VnbWV0ZWRCYXIuaXRlbXNbc2VnbWV0ZWRCYXIuc2VsZWN0ZWRJbmRleF0udGl0bGU7XG4gICAgICAgIGlmKHRoaXMudmlzaWJpbGl0eSA9PSBcIkRvY3VtZW50c1wiKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmdldERvY3VtZW50c0luZm8oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2V0dXBJdGVtVmlldyhhcmdzOiBTZXR1cEl0ZW1WaWV3QXJncykge1xuICAgICAgICBhcmdzLnZpZXcuY29udGV4dC50aGlyZCA9IChhcmdzLmluZGV4ICUgMyA9PT0gMCk7XG4gICAgICAgIGFyZ3Mudmlldy5jb250ZXh0LmhlYWRlciA9ICgoYXJncy5pbmRleCArIDEpICUgdGhpcy5pdGVtcy5sZW5ndGggPT09IDEpO1xuICAgICAgICBhcmdzLnZpZXcuY29udGV4dC5mb290ZXIgPSAoYXJncy5pbmRleCArIDEgPT09IHRoaXMuaXRlbXMubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25JdGVtVGFwKGFyZ3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJJdGVtIFRhcHBlZCBhdCBjZWxsIGluZGV4OiBcIiArIGFyZ3MuaW5kZXgpO1xuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9zZWFyY2gvdmlld0RvY3VtZW50c1wiLCB0aGlzLmRhdGFJdGVtc1thcmdzLmluZGV4XS5pZF0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNsaWRlXCIsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgICAgICAgICAgICAgIGN1cnZlOiBcImVhc2VcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==