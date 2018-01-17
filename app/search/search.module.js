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
var viewDocuments_component_1 = require("./viewDocuments/viewDocuments.component");
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
