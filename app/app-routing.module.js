"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "dashboard", loadChildren: "./dashboard/dashboard.module#DashboardModule" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "settings", loadChildren: "./settings/settings.module#SettingsModule" },
    { path: "search", loadChildren: "./search/search.module#SearchModule" }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
