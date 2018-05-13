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
        this.items = [];
        this.barItemTitles = ["Personal Details", "Ins Company Details", "Policy Details", "Amount Details", "Documents", "Renewal Details"];
        // this.selectedIndex = 0;
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
        this.searchResponse = new Array();
        this.myService.getData("bySerialNumber?serialNumber" + "=" + this.mySerialNumber)
            .subscribe(function (result) {
            result.records.map(function (item) {
                _this.searchResponse.push(item);
            });
            _this.onGetDataSuccess(_this.searchResponse);
        }, function (error) {
            _this.onGetDataError(error);
        });
    };
    PolicyDetailsComponent.prototype.getDocumentsInfo = function () {
        var _this = this;
        this.myService.getData("documentsByClientId?serialNumber" + "=" + this.mySerialNumber)
            .subscribe(function (result) {
            _this.onGetDocumentsSuccess(result.records);
        }, function (error) {
            _this.onGetDataError(error);
        });
    };
    PolicyDetailsComponent.prototype.onGetDocumentsSuccess = function (documents) {
        this.dataItems = new Array();
        for (var _i = 0, documents_1 = documents; _i < documents_1.length; _i++) {
            var i = documents_1[_i];
            this.dataItems.push(i);
        }
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
        this.visibility = "Personal Details";
        this.policyInfo = res[0];
        this.policyType = this.policyInfo[13];
        this.selectedIndex = 0;
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
        this.serialArray = this.dataItems[0];
        this._routerExtensions.navigate(["/search/viewDocuments", this.serialArray[0]], {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5RGV0YWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb2xpY3lEZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCw2REFBOEY7QUFDOUYsa0VBQWdGO0FBQ2hGLDZEQUFpRTtBQUNqRSx1Q0FBcUM7QUFDckMsa0VBQStEO0FBQy9ELG1FQUFpRjtBQVdqRjtJQTZDSSxnQ0FBMkIsVUFBcUIsRUFDckIsU0FBMkIsRUFDM0IsaUJBQW1DO1FBRm5DLGVBQVUsR0FBVixVQUFVLENBQVc7UUFDckIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFDM0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUMxRCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsa0JBQWtCLEVBQUMscUJBQXFCLEVBQUMsZ0JBQWdCLEVBQUMsZ0JBQWdCLEVBQUMsV0FBVyxFQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDaEksMEJBQTBCO1FBQzFCLEdBQUcsQ0FBQyxDQUFVLFVBQWtCLEVBQWxCLEtBQUEsSUFBSSxDQUFDLGFBQWEsRUFBbEIsY0FBa0IsRUFBbEIsSUFBa0I7WUFBM0IsSUFBSSxDQUFDLFNBQUE7WUFDTixJQUFNLElBQUksR0FBRyxJQUFJLGdDQUFnQixFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QjtJQUVMLENBQUM7SUFyQ0Q7O2tFQUU4RDtJQUM5RCx5Q0FBUSxHQUFSO1FBQUEsaUJBb0JDO1FBbkJHLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLG1DQUFzQixFQUFFLENBQUM7UUFDMUQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMs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LElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDMUU7WUFDSSxRQUFRLEVBQUUsSUFBSTtZQUNkLFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsT0FBTztnQkFDYixRQUFRLEVBQUUsR0FBRztnQkFDYixLQUFLLEVBQUUsTUFBTTthQUNoQjtTQUNKLENBQUMsQ0FBQztJQUNYLENBQUM7SUFoSW9CO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFrQixnQ0FBc0I7bUVBQUM7SUFMcEQsc0JBQXNCO1FBUGxDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztZQUN6QyxTQUFTLEVBQUUsQ0FBQyxtQ0FBZ0IsQ0FBQztTQUNoQyxDQUFDO3lDQThDeUMsZ0NBQVM7WUFDVixtQ0FBZ0I7WUFDUix1Q0FBZ0I7T0EvQ3JELHNCQUFzQixDQXNJbEM7SUFBRCw2QkFBQztDQUFBLEFBdElELElBc0lDO0FBdElZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyXCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQge1BhZ2VSb3V0ZSwgUm91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9zd2l0Y2hNYXBcIjtcbmltcG9ydCB7TXlIdHRwR2V0U2VydmljZX0gZnJvbSBcIi4uLy4uL3NoYXJlZC9NeUh0dHBHZXRTZXJ2aWNlXCI7XG5pbXBvcnQge1NlZ21lbnRlZEJhciwgU2VnbWVudGVkQmFySXRlbX0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VnbWVudGVkLWJhclwiO1xuaW1wb3J0IHsgU2V0dXBJdGVtVmlld0FyZ3MgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlc1wiO1xuaW1wb3J0IHsgUG9saWN5SW5mbyB9IGZyb20gJy4vcG9saWN5SW5mbyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInBvbGljeURldGFpbHNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcG9saWN5RGV0YWlscy5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wicG9saWN5RGV0YWlsLmNvbXBvbmVudC5jc3NcIl0sXG4gICAgcHJvdmlkZXJzOiBbTXlIdHRwR2V0U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgUG9saWN5RGV0YWlsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFVzZSB0aGUgQFZpZXdDaGlsZCBkZWNvcmF0b3IgdG8gZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBkcmF3ZXIgY29tcG9uZW50LlxuICAgICogSXQgaXMgdXNlZCBpbiB0aGUgXCJvbkRyYXdlckJ1dHRvblRhcFwiIGZ1bmN0aW9uIGJlbG93IHRvIG1hbmlwdWxhdGUgdGhlIGRyYXdlci5cbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuXG4gICAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xuICAgIHB1YmxpYyBteVNlcmlhbE51bWJlcjogc3RyaW5nO1xuICAgIHB1YmxpYyBwb2xpY3lJbmZvOiBBcnJheTxhbnk+O1xuICAgIHB1YmxpYyBpdGVtczogQXJyYXk8U2VnbWVudGVkQmFySXRlbT47XG4gICAgcHVibGljIHNlbGVjdGVkSW5kZXg7XG4gICAgcHVibGljIHZpc2liaWxpdHk6IHN0cmluZztcbiAgICBwdWJsaWMgYmFySXRlbVRpdGxlczogQXJyYXk8c3RyaW5nPjtcbiAgICBwdWJsaWMgZGF0YUl0ZW1zOiBBcnJheTxhbnk+O1xuICAgIHB1YmxpYyBhY3Rpdml0eUluZGljYXRvcjogYm9vbGVhbjtcbiAgICBwdWJsaWMgcG9saWN5VHlwZTogc3RyaW5nO1xuICAgIHB1YmxpYyBzZWFyY2hSZXNwb25zZTogQXJyYXk8YW55PjtcbiAgICBwdWJsaWMgc2VyaWFsQXJyYXk6IEFycmF5PGFueT47XG5cbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogVXNlIHRoZSBzaWRlRHJhd2VyVHJhbnNpdGlvbiBwcm9wZXJ0eSB0byBjaGFuZ2UgdGhlIG9wZW4vY2xvc2UgYW5pbWF0aW9uIG9mIHRoZSBkcmF3ZXIuXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xuICAgICAgICB0aGlzLmFjdGl2aXR5SW5kaWNhdG9yID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3BhZ2VSb3V0ZS5hY3RpdmF0ZWRSb3V0ZVxuICAgICAgICAgICAgLnN3aXRjaE1hcCgoYWN0aXZhdGVkUm91dGUpID0+IGFjdGl2YXRlZFJvdXRlLnBhcmFtcylcbiAgICAgICAgICAgIC5mb3JFYWNoKChwYXJhbXMpID0+IHtcbiAgICAgICAgICAgICAgICAgdGhpcy5teVNlcmlhbE51bWJlciA9IHBhcmFtcy5pZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5hY3Rpdml0eUluZGljYXRvciA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuc2VhcmNoUmVzcG9uc2UgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgdGhpcy5teVNlcnZpY2UuZ2V0RGF0YShcImJ5U2VyaWFsTnVtYmVyP3NlcmlhbE51bWJlclwiICsgXCI9XCIgKyB0aGlzLm15U2VyaWFsTnVtYmVyKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnJlY29yZHMubWFwKGl0ZW0gPT4geyBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hSZXNwb25zZS5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YVN1Y2Nlc3ModGhpcy5zZWFyY2hSZXNwb25zZSk7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYWdlUm91dGU6IFBhZ2VSb3V0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgcHJpdmF0ZSBteVNlcnZpY2U6IE15SHR0cEdldFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLmJhckl0ZW1UaXRsZXMgPSBbXCJQZXJzb25hbCBEZXRhaWxzXCIsXCJJbnMgQ29tcGFueSBEZXRhaWxzXCIsXCJQb2xpY3kgRGV0YWlsc1wiLFwiQW1vdW50IERldGFpbHNcIixcIkRvY3VtZW50c1wiLFwiUmVuZXdhbCBEZXRhaWxzXCJdO1xuICAgICAgICAvLyB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICBmb3IgKHZhciBpIG9mIHRoaXMuYmFySXRlbVRpdGxlcykge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IG5ldyBTZWdtZW50ZWRCYXJJdGVtKCk7XG4gICAgICAgICAgICBpdGVtLnRpdGxlID0gaTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZ2V0RG9jdW1lbnRzSW5mbygpXG4gICAge1xuICAgICAgICB0aGlzLm15U2VydmljZS5nZXREYXRhKFwiZG9jdW1lbnRzQnlDbGllbnRJZD9zZXJpYWxOdW1iZXJcIisgXCI9XCIgKyB0aGlzLm15U2VyaWFsTnVtYmVyKVxuICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25HZXREb2N1bWVudHNTdWNjZXNzKHJlc3VsdC5yZWNvcmRzKTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25HZXREb2N1bWVudHNTdWNjZXNzKGRvY3VtZW50cylcbiAgICB7XG4gICAgICAgIHRoaXMuZGF0YUl0ZW1zID0gbmV3IEFycmF5KCk7XG4gICAgICAgIGZvcihsZXQgaSBvZiBkb2N1bWVudHMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YUl0ZW1zLnB1c2goaSk7XG4gICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uO1xuICAgIH1cblxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xuICAgICogaGF2ZSBhIGJ1dHRvbiB0aGF0IG9wZW5zIGl0LiBVc2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkdldERhdGFTdWNjZXNzKHJlcykge1xuICAgICAgICB0aGlzLmFjdGl2aXR5SW5kaWNhdG9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5ID0gXCJQZXJzb25hbCBEZXRhaWxzXCI7XG4gICAgICAgIHRoaXMucG9saWN5SW5mbyA9IHJlc1swXTtcbiAgICAgICAgdGhpcy5wb2xpY3lUeXBlID0gdGhpcy5wb2xpY3lJbmZvWzEzXTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xuICAgICAgICBjb25zdCBib2R5ID0gZXJyb3IuanNvbigpIHx8IFwiXCI7XG4gICAgICAgIGNvbnN0IGVyciA9IGJvZHkuZXJyb3IgfHwgSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25HZXREYXRhRXJyb3I6IFwiICsgZXJyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TZWxlY3RlZEluZGV4Q2hhbmdlKGFyZ3MpIHtcbiAgICAgICAgbGV0IHNlZ21ldGVkQmFyID0gPFNlZ21lbnRlZEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gc2VnbWV0ZWRCYXIuc2VsZWN0ZWRJbmRleDtcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5ID0gc2VnbWV0ZWRCYXIuaXRlbXNbc2VnbWV0ZWRCYXIuc2VsZWN0ZWRJbmRleF0udGl0bGU7XG4gICAgICAgIGlmKHRoaXMudmlzaWJpbGl0eSA9PSBcIkRvY3VtZW50c1wiKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmdldERvY3VtZW50c0luZm8oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2V0dXBJdGVtVmlldyhhcmdzOiBTZXR1cEl0ZW1WaWV3QXJncykge1xuICAgICAgICBhcmdzLnZpZXcuY29udGV4dC50aGlyZCA9IChhcmdzLmluZGV4ICUgMyA9PT0gMCk7XG4gICAgICAgIGFyZ3Mudmlldy5jb250ZXh0LmhlYWRlciA9ICgoYXJncy5pbmRleCArIDEpICUgdGhpcy5pdGVtcy5sZW5ndGggPT09IDEpO1xuICAgICAgICBhcmdzLnZpZXcuY29udGV4dC5mb290ZXIgPSAoYXJncy5pbmRleCArIDEgPT09IHRoaXMuaXRlbXMubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25JdGVtVGFwKGFyZ3MpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJJdGVtIFRhcHBlZCBhdCBjZWxsIGluZGV4OiBcIiArIGFyZ3MuaW5kZXgpO1xuICAgICAgICB0aGlzLnNlcmlhbEFycmF5ID0gdGhpcy5kYXRhSXRlbXNbMF07XG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3NlYXJjaC92aWV3RG9jdW1lbnRzXCIsIHRoaXMuc2VyaWFsQXJyYXlbMF1dLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGFuaW1hdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzbGlkZVwiLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgICAgICAgICAgICAgICBjdXJ2ZTogXCJlYXNlXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=