import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { LoginComponent} from "../login/login.component";
import { NativeScriptFormsModule} from "nativescript-angular";
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        HomeRoutingModule,
        NativeScriptUISideDrawerModule,
        SharedModule
    ],
    declarations: [
        HomeComponent,
        LoginComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
