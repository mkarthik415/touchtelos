"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
var nativescript_angular_1 = require("nativescript-angular");
var MyHttpGetService_1 = require("../../shared/MyHttpGetService");
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "viewDocuments", loadChildren: "./viewDocuments/viewDocuments.module#ViewDocumentsModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
var ViewDocumentsComponent = (function () {
    function ViewDocumentsComponent(_pageRoute, myService) {
        this._pageRoute = _pageRoute;
        this.myService = myService;
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }
    ViewDocumentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        this._pageRoute.activatedRoute
            .switchMap(function (activatedRoute) { return activatedRoute.params; })
            .forEach(function (params) {
            _this.invoiceLink = params.id;
        });
        this.invoiceLink = "https://www.ets.org/Media/Tests/TOEFL/pdf/SampleQuestions.pdf";
    };
    Object.defineProperty(ViewDocumentsComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    ViewDocumentsComponent = __decorate([
        core_1.Component({
            selector: "ViewDocuments",
            moduleId: module.id,
            templateUrl: "./viewDocuments.component.html",
            providers: [MyHttpGetService_1.MyHttpGetService]
        }),
        __metadata("design:paramtypes", [nativescript_angular_1.PageRoute,
            MyHttpGetService_1.MyHttpGetService])
    ], ViewDocumentsComponent);
    return ViewDocumentsComponent;
}());
exports.ViewDocumentsComponent = ViewDocumentsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld0RvY3VtZW50cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2aWV3RG9jdW1lbnRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCw2REFBNEY7QUFFNUYsNkRBQWlFO0FBQ2pFLGtFQUErRDtBQUcvRDs7Ozs7OERBSzhEO0FBUTlEO0lBd0JJLGdDQUFvQixVQUFxQixFQUNyQixTQUEyQjtRQUQzQixlQUFVLEdBQVYsVUFBVSxDQUFXO1FBQ3JCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzNDOztzRUFFOEQ7SUFDbEUsQ0FBQztJQXBCRCx5Q0FBUSxHQUFSO1FBQUEsaUJBYUM7UUFaRzs7c0VBRThEO1FBQzlELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLG1DQUFzQixFQUFFLENBQUM7UUFFMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjO2FBQ3pCLFNBQVMsQ0FBQyxVQUFDLGNBQWMsSUFBSyxPQUFBLGNBQWMsQ0FBQyxNQUFNLEVBQXJCLENBQXFCLENBQUM7YUFDcEQsT0FBTyxDQUFDLFVBQUMsTUFBTTtZQUNaLEtBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztRQUVQLElBQUksQ0FBQyxXQUFXLEdBQUcsK0RBQStELENBQUM7SUFDdkYsQ0FBQztJQVNELHNCQUFJLHdEQUFvQjthQUF4QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFqQ1Esc0JBQXNCO1FBTmxDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxTQUFTLEVBQUUsQ0FBQyxtQ0FBZ0IsQ0FBQztTQUNoQyxDQUFDO3lDQXlCa0MsZ0NBQVM7WUFDVixtQ0FBZ0I7T0F6QnRDLHNCQUFzQixDQWtDbEM7SUFBRCw2QkFBQztDQUFBLEFBbENELElBa0NDO0FBbENZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7RHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb259IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXJcIjtcbmltcG9ydCB7UmFkU2lkZURyYXdlckNvbXBvbmVudH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQge1BhZ2VSb3V0ZSwgUm91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5pbXBvcnQge015SHR0cEdldFNlcnZpY2V9IGZyb20gXCIuLi8uLi9zaGFyZWQvTXlIdHRwR2V0U2VydmljZVwiO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuKiBCZWZvcmUgeW91IGNhbiBuYXZpZ2F0ZSB0byB0aGlzIHBhZ2UgZnJvbSB5b3VyIGFwcCwgeW91IG5lZWQgdG8gcmVmZXJlbmNlIHRoaXMgcGFnZSdzIG1vZHVsZSBpbiB0aGVcbiogZ2xvYmFsIGFwcCByb3V0ZXIgbW9kdWxlLiBBZGQgdGhlIGZvbGxvd2luZyBvYmplY3QgdG8gdGhlIGdsb2JhbCBhcnJheSBvZiByb3V0ZXM6XG4qIHsgcGF0aDogXCJ2aWV3RG9jdW1lbnRzXCIsIGxvYWRDaGlsZHJlbjogXCIuL3ZpZXdEb2N1bWVudHMvdmlld0RvY3VtZW50cy5tb2R1bGUjVmlld0RvY3VtZW50c01vZHVsZVwiIH1cbiogTm90ZSB0aGF0IHRoaXMgc2ltcGx5IHBvaW50cyB0aGUgcGF0aCB0byB0aGUgcGFnZSBtb2R1bGUgZmlsZS4gSWYgeW91IG1vdmUgdGhlIHBhZ2UsIHlvdSBuZWVkIHRvIHVwZGF0ZSB0aGUgcm91dGUgdG9vLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiVmlld0RvY3VtZW50c1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi92aWV3RG9jdW1lbnRzLmNvbXBvbmVudC5odG1sXCIsXG4gICAgcHJvdmlkZXJzOiBbTXlIdHRwR2V0U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgVmlld0RvY3VtZW50c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblxuICAgIHB1YmxpYyBpbnZvaWNlTGluazogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xuICAgIHB1YmxpYyBteVNlcmlhbE51bWJlcjogc3RyaW5nO1xuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAgICAgKiBVc2UgdGhlIFwibmdPbkluaXRcIiBoYW5kbGVyIHRvIGluaXRpYWxpemUgZGF0YSBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uID0gbmV3IFNsaWRlSW5PblRvcFRyYW5zaXRpb24oKTtcblxuICAgICAgICB0aGlzLl9wYWdlUm91dGUuYWN0aXZhdGVkUm91dGVcbiAgICAgICAgICAgIC5zd2l0Y2hNYXAoKGFjdGl2YXRlZFJvdXRlKSA9PiBhY3RpdmF0ZWRSb3V0ZS5wYXJhbXMpXG4gICAgICAgICAgICAuZm9yRWFjaCgocGFyYW1zKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnZvaWNlTGluayA9IHBhcmFtcy5pZDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaW52b2ljZUxpbmsgPSBcImh0dHBzOi8vd3d3LmV0cy5vcmcvTWVkaWEvVGVzdHMvVE9FRkwvcGRmL1NhbXBsZVF1ZXN0aW9ucy5wZGZcIjtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYWdlUm91dGU6IFBhZ2VSb3V0ZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIG15U2VydmljZTogTXlIdHRwR2V0U2VydmljZSkge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgY29uc3RydWN0b3IgdG8gaW5qZWN0IGFwcCBzZXJ2aWNlcyB0aGF0IHlvdSBuZWVkIGluIHRoaXMgY29tcG9uZW50LlxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIH1cblxuICAgIGdldCBzaWRlRHJhd2VyVHJhbnNpdGlvbigpOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcbiAgICB9XG59XG4iXX0=