import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "dashboard", loadChildren: "./dashboard/dashboard.module#DashboardModule" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "settings", loadChildren: "./settings/settings.module#SettingsModule" },
    { path: "search", loadChildren: "./search/search.module#SearchModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
