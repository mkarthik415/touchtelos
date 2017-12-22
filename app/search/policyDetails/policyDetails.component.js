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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5RGV0YWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwb2xpY3lEZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCw2REFBOEY7QUFDOUYsa0VBQWdGO0FBQ2hGLDZEQUErQztBQUMvQyx1Q0FBcUM7QUFDckMsa0VBQStEO0FBQy9ELG1FQUFpRjtBQVNqRjtJQXlDSSxnQ0FBMkIsVUFBcUIsRUFDckIsU0FBMkI7UUFEM0IsZUFBVSxHQUFWLFVBQVUsQ0FBVztRQUNyQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQS9CL0Msa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFFbEIsZ0JBQVcsR0FBRyxJQUFJLENBQUM7UUFDbkIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUF5QnZCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLGtJQUFrSTtRQUNsSSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsa0JBQWtCLEVBQUMscUJBQXFCLEVBQUMsZ0JBQWdCLEVBQUMsZ0JBQWdCLEVBQUMsV0FBVyxFQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDaEksR0FBRyxDQUFDLENBQVUsVUFBa0IsRUFBbEIsS0FBQSxJQUFJLENBQUMsYUFBYSxFQUFsQixjQUFrQixFQUFsQixJQUFrQjtZQUEzQixJQUFJLENBQUMsU0FBQTtZQUNOLElBQU0sSUFBSSxHQUFHLElBQUksZ0NBQWdCLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsSUFBSSxD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LFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLG1DQUFnQixDQUFDO1NBQ2hDLENBQUM7eUNBMEN5QyxnQ0FBUztZQUNWLG1DQUFnQjtPQTFDN0Msc0JBQXNCLENBK0ZsQztJQUFELDZCQUFDO0NBQUEsQUEvRkQsSUErRkM7QUEvRlksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXJcIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcbmltcG9ydCB7UGFnZVJvdXRlfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL3N3aXRjaE1hcFwiO1xuaW1wb3J0IHtNeUh0dHBHZXRTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2hhcmVkL015SHR0cEdldFNlcnZpY2VcIjtcbmltcG9ydCB7U2VnbWVudGVkQmFyLCBTZWdtZW50ZWRCYXJJdGVtfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zZWdtZW50ZWQtYmFyXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInBvbGljeURldGFpbHNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcG9saWN5RGV0YWlscy5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczogW1wicG9saWN5RGV0YWlsLmNvbXBvbmVudC5jc3NcIl0sXG4gICAgcHJvdmlkZXJzOiBbTXlIdHRwR2V0U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgUG9saWN5RGV0YWlsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFVzZSB0aGUgQFZpZXdDaGlsZCBkZWNvcmF0b3IgdG8gZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBkcmF3ZXIgY29tcG9uZW50LlxuICAgICogSXQgaXMgdXNlZCBpbiB0aGUgXCJvbkRyYXdlckJ1dHRvblRhcFwiIGZ1bmN0aW9uIGJlbG93IHRvIG1hbmlwdWxhdGUgdGhlIGRyYXdlci5cbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuXG4gICAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xuICAgIHB1YmxpYyBteVNlcmlhbE51bWJlcjogc3RyaW5nO1xuICAgIHB1YmxpYyBwb2xpY3lJbmZvOiBBcnJheTxhbnk+O1xuICAgIHB1YmxpYyBpdGVtczogQXJyYXk8U2VnbWVudGVkQmFySXRlbT47XG4gICAgcHVibGljIHNlbGVjdGVkSW5kZXggPSAwO1xuICAgIHB1YmxpYyB2aXNpYmlsaXR5O1xuICAgIHB1YmxpYyB2aXNpYmlsaXR5MSA9IHRydWU7XG4gICAgcHVibGljIHZpc2liaWxpdHkyID0gZmFsc2U7XG4gICAgcHVibGljIHZpc2liaWxpdHkzID0gZmFsc2U7XG4gICAgcHVibGljIHZpc2liaWxpdHk0ID0gZmFsc2U7XG4gICAgcHVibGljIHZpc2liaWxpdHk1ID0gZmFsc2U7XG4gICAgcHVibGljIHZpc2liaWxpdHk2ID0gZmFsc2U7XG4gICAgcHVibGljIHZpc2liaWxpdHlBcnJheSA6IEFycmF5PHN0cmluZz47XG4gICAgcHVibGljIGJhckl0ZW1UaXRsZXM6IEFycmF5PHN0cmluZz47XG5cbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogVXNlIHRoZSBzaWRlRHJhd2VyVHJhbnNpdGlvbiBwcm9wZXJ0eSB0byBjaGFuZ2UgdGhlIG9wZW4vY2xvc2UgYW5pbWF0aW9uIG9mIHRoZSBkcmF3ZXIuXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xuICAgICAgICB0aGlzLl9wYWdlUm91dGUuYWN0aXZhdGVkUm91dGVcbiAgICAgICAgICAgIC5zd2l0Y2hNYXAoKGFjdGl2YXRlZFJvdXRlKSA9PiBhY3RpdmF0ZWRSb3V0ZS5wYXJhbXMpXG4gICAgICAgICAgICAuZm9yRWFjaCgocGFyYW1zKSA9PiB7XG4gICAgICAgICAgICAgICAgIHRoaXMubXlTZXJpYWxOdW1iZXIgPSBwYXJhbXMuaWQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm15U2VydmljZS5nZXREYXRhKFwiYnlTZXJpYWxOdW1iZXI/c2VyaWFsTnVtYmVyXCIrIFwiPVwiICsgdGhpcy5teVNlcmlhbE51bWJlcilcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub25HZXREYXRhU3VjY2VzcyhyZXN1bHQpO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkdldERhdGFFcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZVJvdXRlOiBQYWdlUm91dGUsXG4gICAgICAgICAgICAgICAgICAgICAgIHByaXZhdGUgbXlTZXJ2aWNlOiBNeUh0dHBHZXRTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgLy8gdGhpcy52aXNpYmlsaXR5QXJyYXkgPSBbdGhpcy52aXNpYmlsaXR5MSx0aGlzLnZpc2liaWxpdHkyLHRoaXMudmlzaWJpbGl0eTMsdGhpcy52aXNpYmlsaXR5NCx0aGlzLnZpc2liaWxpdHk1LHRoaXMudmlzaWJpbGl0eTZdO1xuICAgICAgICB0aGlzLmJhckl0ZW1UaXRsZXMgPSBbXCJQZXJzb25hbCBEZXRhaWxzXCIsXCJJbnMgQ29tcGFueSBEZXRhaWxzXCIsXCJQb2xpY3kgRGV0YWlsc1wiLFwiQW1vdW50IERldGFpbHNcIixcIkRvY3VtZW50c1wiLFwiUmVuZXdhbCBEZXRhaWxzXCJdO1xuICAgICAgICBmb3IgKHZhciBpIG9mIHRoaXMuYmFySXRlbVRpdGxlcyApIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBuZXcgU2VnbWVudGVkQmFySXRlbSgpO1xuICAgICAgICAgICAgaXRlbS50aXRsZSA9IGk7XG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5MSA9IHRydWU7XG4gICAgfVxuXG4gICAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uO1xuICAgIH1cblxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xuICAgICogaGF2ZSBhIGJ1dHRvbiB0aGF0IG9wZW5zIGl0LiBVc2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkdldERhdGFTdWNjZXNzKHJlcykge1xuICAgICAgICB0aGlzLnBvbGljeUluZm8gPSByZXM7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVzdWx0cyBhcmUgXCIrdGhpcy5wb2xpY3lJbmZvWzBdKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uR2V0RGF0YUVycm9yKGVycm9yOiBSZXNwb25zZSB8IGFueSkge1xuICAgICAgICBjb25zdCBib2R5ID0gZXJyb3IuanNvbigpIHx8IFwiXCI7XG4gICAgICAgIGNvbnN0IGVyciA9IGJvZHkuZXJyb3IgfHwgSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25HZXREYXRhRXJyb3I6IFwiICsgZXJyKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TZWxlY3RlZEluZGV4Q2hhbmdlKGFyZ3MpIHtcbiAgICAgICAgbGV0IHNlZ21ldGVkQmFyID0gPFNlZ21lbnRlZEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gc2VnbWV0ZWRCYXIuc2VsZWN0ZWRJbmRleDtcbiAgICAgICAgZm9yKHZhciBpIGluIHRoaXMudmlzaWJpbGl0eUFycmF5KVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbGVjdGVkIHNlZ21lbnQgaXMgOiBcIiArdGhpcy5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgIGlmKGkgPT0gdGhpcy5zZWxlY3RlZEluZGV4LnRvU3RyaW5nKCkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBc3NpZ25lZCB2YWx1ZSBpcyA6IFwiICt0aGlzLnZpc2liaWxpdHkraS50b1N0cmluZyk7XG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5K2kudG9TdHJpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmlsaXR5QXJyYXlbaV0gPSBcImZhbHNlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=