"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var search_component_1 = require("./search.component");
var policyDetails_component_1 = require("./policyDetails/policyDetails.component");
var viewDocuments_component_1 = require("./viewDocuments/viewDocuments.component");
var routes = [
    { path: "", component: search_component_1.SearchComponent },
    { path: "policyDetails/:id", component: policyDetails_component_1.PolicyDetailsComponent },
    { path: "viewDocuments/:id", component: viewDocuments_component_1.ViewDocumentsComponent }
];
var SearchRoutingModule = (function () {
    function SearchRoutingModule() {
    }
    SearchRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], SearchRoutingModule);
    return SearchRoutingModule;
}());
exports.SearchRoutingModule = SearchRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJvdXRpbmcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VhcmNoLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBRXpDLHNEQUF1RTtBQUV2RSx1REFBcUQ7QUFDckQsbUZBQStFO0FBQy9FLG1GQUErRTtBQUUvRSxJQUFNLE1BQU0sR0FBVztJQUNuQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLGtDQUFlLEVBQUU7SUFDeEMsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLGdEQUFzQixFQUFFO0lBQ2hFLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRSxnREFBc0IsRUFBRTtDQUNuRSxDQUFDO0FBTUY7SUFBQTtJQUFtQyxDQUFDO0lBQXZCLG1CQUFtQjtRQUovQixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7U0FDdEMsQ0FBQztPQUNXLG1CQUFtQixDQUFJO0lBQUQsMEJBQUM7Q0FBQSxBQUFwQyxJQUFvQztBQUF2QixrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7IFNlYXJjaENvbXBvbmVudCB9IGZyb20gXCIuL3NlYXJjaC5jb21wb25lbnRcIjtcbmltcG9ydCB7UG9saWN5RGV0YWlsc0NvbXBvbmVudH0gZnJvbSBcIi4vcG9saWN5RGV0YWlscy9wb2xpY3lEZXRhaWxzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtWaWV3RG9jdW1lbnRzQ29tcG9uZW50fSBmcm9tIFwiLi92aWV3RG9jdW1lbnRzL3ZpZXdEb2N1bWVudHMuY29tcG9uZW50XCI7XG5cbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xuICAgIHsgcGF0aDogXCJcIiwgY29tcG9uZW50OiBTZWFyY2hDb21wb25lbnQgfSxcbiAgICB7IHBhdGg6IFwicG9saWN5RGV0YWlscy86aWRcIiwgY29tcG9uZW50OiBQb2xpY3lEZXRhaWxzQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcInZpZXdEb2N1bWVudHMvOmlkXCIsIGNvbXBvbmVudDogVmlld0RvY3VtZW50c0NvbXBvbmVudCB9XG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKV0sXG4gICAgZXhwb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZV1cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoUm91dGluZ01vZHVsZSB7IH1cbiJdfQ==