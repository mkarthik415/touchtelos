import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { SearchRoutingModule } from "./search-routing.module";
import { SearchComponent } from "./search.component";
import {NativeScriptUIListViewModule} from "nativescript-pro-ui/listview/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import {PolicyDetailsComponent} from "./policyDetails/policyDetails.component";
import {ViewDocumentsComponent} from "./viewDocuments/viewDocuments.component";


@NgModule({
    imports: [
        NativeScriptModule,
        SearchRoutingModule,
        SharedModule,
        NativeScriptUIListViewModule,
        NativeScriptModule,
        NativeScriptFormsModule
    ],
    declarations: [
        SearchComponent,
        PolicyDetailsComponent,
        ViewDocumentsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SearchModule { }
