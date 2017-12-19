import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import {DashboardComponent} from  "./dashboard.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";

@NgModule({
    imports: [
        NativeScriptModule,
        DashboardRoutingModule,
        SharedModule
    ],
    declarations: [
        DashboardComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class DashboardModule {
}
