import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SearchComponent } from "./search.component";
import {PolicyDetailsComponent} from "./policyDetails/policyDetails.component";

const routes: Routes = [
    { path: "", component: SearchComponent },
    { path: "policyDetails/:id", component: PolicyDetailsComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SearchRoutingModule { }
