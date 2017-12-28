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
        this.invoiceLink = 'https://www.ets.org/Media/Tests/TOEFL/pdf/SampleQuestions.pdf';
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
        this._routerExtensions.navigate(["/search/viewDocuments", "testting"], {
            animated: true,
            transition: {
                name: "slideTop",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5RGV0YWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb2xpY3lEZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCw2REFBOEY7QUFDOUYsa0VBQWdGO0FBQ2hGLDZEQUFpRTtBQUNqRSx1Q0FBcUM7QUFDckMsa0VBQStEO0FBQy9ELG1FQUFpRjtBQVVqRjtJQXFDSSxnQ0FBMkIsVUFBcUIsRUFDckIsU0FBMkIsRUFDM0IsaUJBQW1DO1FBRm5DLGVBQVUsR0FBVixVQUFVLENBQVc7UUFDckIsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFDM0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQTVCdkQsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUE2QnJCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxrQkFBa0IsRUFBQyxxQkFBcUIsRUFBQyxnQkFBZ0IsRUFBQyxnQkFBZ0IsRUFBQyxXQUFXLEVBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNoSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLGtCQUFrQixDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxDQUFVLFVBQWtCLEVBQWxCLEtBQUEsSUFBSSxDQUFDLGFBQWEsRUFBbEIsY0FBa0IsRUFBbEIsSUFBa0I7WUFBM0IsSUFBSSxDQUFDLFNBQUE7WUFDTixJQUFNLElBQUksR0FBRyxJQUFJLGdDQUFnQixFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6QjtJQUVMLENBQUM7SUFqQ0Q7O2tFQUU4RDtJQUM5RCx5Q0FBUSxHQUFSO1FBQUEsaUJBZUM7UUFkRyxJQUFJLENBQUMs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LENBQUM7eUNBc0N5QyxnQ0FBUztZQUNWLG1DQUFnQjtZQUNSLHVDQUFnQjtPQXZDckQsc0JBQXNCLENBdUhsQztJQUFELDZCQUFDO0NBQUEsQUF2SEQsSUF1SEM7QUF2SFksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXJcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcbmltcG9ydCB7UGFnZVJvdXRlLCBSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL3N3aXRjaE1hcFwiO1xuaW1wb3J0IHtNeUh0dHBHZXRTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2hhcmVkL015SHR0cEdldFNlcnZpY2VcIjtcbmltcG9ydCB7U2VnbWVudGVkQmFyLCBTZWdtZW50ZWRCYXJJdGVtfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zZWdtZW50ZWQtYmFyXCI7XG5pbXBvcnQgeyBTZXR1cEl0ZW1WaWV3QXJncyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInBvbGljeURldGFpbHNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcG9saWN5RGV0YWlscy5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wicG9saWN5RGV0YWlsLmNvbXBvbmVudC5jc3NcIl0sXG4gICAgcHJvdmlkZXJzOiBbTXlIdHRwR2V0U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgUG9saWN5RGV0YWlsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFVzZSB0aGUgQFZpZXdDaGlsZCBkZWNvcmF0b3IgdG8gZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBkcmF3ZXIgY29tcG9uZW50LlxuICAgICogSXQgaXMgdXNlZCBpbiB0aGUgXCJvbkRyYXdlckJ1dHRvblRhcFwiIGZ1bmN0aW9uIGJlbG93IHRvIG1hbmlwdWxhdGUgdGhlIGRyYXdlci5cbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuXG4gICAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xuICAgIHB1YmxpYyBteVNlcmlhbE51bWJlcjogc3RyaW5nO1xuICAgIHB1YmxpYyBwb2xpY3lJbmZvOiBBcnJheTxhbnk+O1xuICAgIHB1YmxpYyBpdGVtczogQXJyYXk8U2VnbWVudGVkQmFySXRlbT47XG4gICAgcHVibGljIHNlbGVjdGVkSW5kZXggPSAwO1xuICAgIHB1YmxpYyB2aXNpYmlsaXR5OiBzdHJpbmc7XG4gICAgcHVibGljIGJhckl0ZW1UaXRsZXM6IEFycmF5PHN0cmluZz47XG4gICAgcHVibGljIGRhdGFJdGVtczogQXJyYXk8YW55PjtcbiAgICBwdWJsaWMgaW52b2ljZUxpbms6IHN0cmluZztcblxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBVc2UgdGhlIHNpZGVEcmF3ZXJUcmFuc2l0aW9uIHByb3BlcnR5IHRvIGNoYW5nZSB0aGUgb3Blbi9jbG9zZSBhbmltYXRpb24gb2YgdGhlIGRyYXdlci5cbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbiA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuX3BhZ2VSb3V0ZS5hY3RpdmF0ZWRSb3V0ZVxuICAgICAgICAgICAgLnN3aXRjaE1hcCgoYWN0aXZhdGVkUm91dGUpID0+IGFjdGl2YXRlZFJvdXRlLnBhcmFtcylcbiAgICAgICAgICAgIC5mb3JFYWNoKChwYXJhbXMpID0+IHtcbiAgICAgICAgICAgICAgICAgdGhpcy5teVNlcmlhbE51bWJlciA9IHBhcmFtcy5pZDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldERhdGEoXCJieVNlcmlhbE51bWJlcj9zZXJpYWxOdW1iZXJcIisgXCI9XCIgKyB0aGlzLm15U2VyaWFsTnVtYmVyKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFTdWNjZXNzKHJlc3VsdCk7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5pbnZvaWNlTGluayA9ICdodHRwczovL3d3dy5ldHMub3JnL01lZGlhL1Rlc3RzL1RPRUZML3BkZi9TYW1wbGVRdWVzdGlvbnMucGRmJztcbiAgICB9XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZVJvdXRlOiBQYWdlUm91dGUsXG4gICAgICAgICAgICAgICAgICAgICAgIHByaXZhdGUgbXlTZXJ2aWNlOiBNeUh0dHBHZXRTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgICAgICBwcml2YXRlIF9yb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5iYXJJdGVtVGl0bGVzID0gW1wiUGVyc29uYWwgRGV0YWlsc1wiLFwiSW5zIENvbXBhbnkgRGV0YWlsc1wiLFwiUG9saWN5IERldGFpbHNcIixcIkFtb3VudCBEZXRhaWxzXCIsXCJEb2N1bWVudHNcIixcIlJlbmV3YWwgRGV0YWlsc1wiXTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5ID0gXCJQZXJzb25hbCBEZXRhaWxzXCI7XG4gICAgICAgIGZvciAodmFyIGkgb2YgdGhpcy5iYXJJdGVtVGl0bGVzKSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbmV3IFNlZ21lbnRlZEJhckl0ZW0oKTtcbiAgICAgICAgICAgIGl0ZW0udGl0bGUgPSBpO1xuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBnZXREb2N1bWVudHNJbmZvKClcbiAgICB7XG4gICAgICAgIHRoaXMubXlTZXJ2aWNlLmdldERhdGEoXCJkb2N1bWVudHNCeUNsaWVudD9pZFwiKyBcIj1cIiArIHRoaXMubXlTZXJpYWxOdW1iZXIpXG4gICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkdldERvY3VtZW50c1N1Y2Nlc3MocmVzdWx0KTtcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uR2V0RGF0YUVycm9yKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25HZXREb2N1bWVudHNTdWNjZXNzKGRvY3VtZW50cylcbiAgICB7XG4gICAgICAgIHRoaXMuZGF0YUl0ZW1zID0gZG9jdW1lbnRzO1xuICAgICAgICBjb25zb2xlLmxvZyhcInJlc3VsdHMgYXJlIFwiK3RoaXMuZGF0YUl0ZW1zWzBdKTtcbiAgICB9XG5cbiAgICBnZXQgc2lkZURyYXdlclRyYW5zaXRpb24oKTogRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XG4gICAgfVxuXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIEFjY29yZGluZyB0byBndWlkZWxpbmVzLCBpZiB5b3UgaGF2ZSBhIGRyYXdlciBvbiB5b3VyIHBhZ2UsIHlvdSBzaG91bGQgYWx3YXlzXG4gICAgKiBoYXZlIGEgYnV0dG9uIHRoYXQgb3BlbnMgaXQuIFVzZSB0aGUgc2hvd0RyYXdlcigpIGZ1bmN0aW9uIHRvIG9wZW4gdGhlIGFwcCBkcmF3ZXIgc2VjdGlvbi5cbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR2V0RGF0YVN1Y2Nlc3MocmVzKSB7XG4gICAgICAgIHRoaXMucG9saWN5SW5mbyA9IHJlcztcbiAgICAgICAgY29uc29sZS5sb2coXCJyZXN1bHRzIGFyZSBcIit0aGlzLnBvbGljeUluZm9bMF0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25HZXREYXRhRXJyb3IoZXJyb3I6IFJlc3BvbnNlIHwgYW55KSB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBlcnJvci5qc29uKCkgfHwgXCJcIjtcbiAgICAgICAgY29uc3QgZXJyID0gYm9keS5lcnJvciB8fCBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbkdldERhdGFFcnJvcjogXCIgKyBlcnIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblNlbGVjdGVkSW5kZXhDaGFuZ2UoYXJncykge1xuICAgICAgICBsZXQgc2VnbWV0ZWRCYXIgPSA8U2VnbWVudGVkQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4O1xuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSBzZWdtZXRlZEJhci5pdGVtc1tzZWdtZXRlZEJhci5zZWxlY3RlZEluZGV4XS50aXRsZTtcbiAgICAgICAgaWYodGhpcy52aXNpYmlsaXR5ID09IFwiRG9jdW1lbnRzXCIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0RG9jdW1lbnRzSW5mbygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25TZXR1cEl0ZW1WaWV3KGFyZ3M6IFNldHVwSXRlbVZpZXdBcmdzKSB7XG4gICAgICAgIGFyZ3Mudmlldy5jb250ZXh0LnRoaXJkID0gKGFyZ3MuaW5kZXggJSAzID09PSAwKTtcbiAgICAgICAgYXJncy52aWV3LmNvbnRleHQuaGVhZGVyID0gKChhcmdzLmluZGV4ICsgMSkgJSB0aGlzLml0ZW1zLmxlbmd0aCA9PT0gMSk7XG4gICAgICAgIGFyZ3Mudmlldy5jb250ZXh0LmZvb3RlciA9IChhcmdzLmluZGV4ICsgMSA9PT0gdGhpcy5pdGVtcy5sZW5ndGgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkl0ZW1UYXAoYXJncykge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkl0ZW0gVGFwcGVkIGF0IGNlbGwgaW5kZXg6IFwiICsgYXJncy5pbmRleCk7XG4gICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL3NlYXJjaC92aWV3RG9jdW1lbnRzXCIsIFwidGVzdHRpbmdcIl0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNsaWRlVG9wXCIsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgICAgICAgICAgICAgIGN1cnZlOiBcImVhc2VcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==