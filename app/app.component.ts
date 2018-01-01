import { Component } from "@angular/core";
import { UserInfo } from "./shared/userInfo";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
    providers: [UserInfo]
})
export class AppComponent { }
