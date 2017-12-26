"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var shared_module_1 = require("../shared/shared.module");
var search_routing_module_1 = require("./search-routing.module");
var search_component_1 = require("./search.component");
var angular_1 = require("nativescript-pro-ui/listview/angular");
var forms_1 = require("nativescript-angular/forms");
var policyDetails_component_1 = require("./policyDetails/policyDetails.component");
var viewDocuments_component_1 = require("./policyDetails/viewDocuments/viewDocuments.component");
var SearchModule = (function () {
    function SearchModule() {
    }
    SearchModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                search_routing_module_1.SearchRoutingModule,
                shared_module_1.SharedModule,
                angular_1.NativeScriptUIListViewModule,
                nativescript_module_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule
            ],
            declarations: [
                search_component_1.SearchComponent,
                policyDetails_component_1.PolicyDetailsComponent,
                viewDocuments_component_1.ViewDocumentsComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], SearchModule);
    return SearchModule;
}());
exports.SearchModule = SearchModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBRTlFLHlEQUF1RDtBQUN2RCxpRUFBOEQ7QUFDOUQsdURBQXFEO0FBQ3JELGdFQUFrRjtBQUNsRixvREFBcUU7QUFDckUsbUZBQStFO0FBQy9FLGlHQUErRjtBQXFCL0Y7SUFBQTtJQUE0QixDQUFDO0lBQWhCLFlBQVk7UUFsQnhCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ2xCLDJDQUFtQjtnQkFDbkIsNEJBQVk7Z0JBQ1osc0NBQTRCO2dCQUM1Qix3Q0FBa0I7Z0JBQ2xCLCtCQUF1QjthQUMxQjtZQUNELFlBQVksRUFBRTtnQkFDVixrQ0FBZTtnQkFDZixnREFBc0I7Z0JBQ3RCLGdEQUFzQjthQUN6QjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csWUFBWSxDQUFJO0lBQUQsbUJBQUM7Q0FBQSxBQUE3QixJQUE2QjtBQUFoQixvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5cbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gXCIuLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xuaW1wb3J0IHsgU2VhcmNoUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL3NlYXJjaC1yb3V0aW5nLm1vZHVsZVwiO1xuaW1wb3J0IHsgU2VhcmNoQ29tcG9uZW50IH0gZnJvbSBcIi4vc2VhcmNoLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9saXN0dmlldy9hbmd1bGFyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtQb2xpY3lEZXRhaWxzQ29tcG9uZW50fSBmcm9tIFwiLi9wb2xpY3lEZXRhaWxzL3BvbGljeURldGFpbHMuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBWaWV3RG9jdW1lbnRzQ29tcG9uZW50IH0gZnJvbSBcIi4vcG9saWN5RGV0YWlscy92aWV3RG9jdW1lbnRzL3ZpZXdEb2N1bWVudHMuY29tcG9uZW50XCI7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgU2VhcmNoUm91dGluZ01vZHVsZSxcbiAgICAgICAgU2hhcmVkTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgU2VhcmNoQ29tcG9uZW50LFxuICAgICAgICBQb2xpY3lEZXRhaWxzQ29tcG9uZW50LFxuICAgICAgICBWaWV3RG9jdW1lbnRzQ29tcG9uZW50XG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaE1vZHVsZSB7IH1cbiJdfQ==