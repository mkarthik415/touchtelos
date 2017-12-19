"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var search_component_1 = require("./search.component");
var policyDetails_component_1 = require("./policyDetails/policyDetails.component");
var routes = [
    { path: "", component: search_component_1.SearchComponent },
    { path: "policyDetails/:id", component: policyDetails_component_1.PolicyDetailsComponent },
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
