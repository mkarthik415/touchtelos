import { Component, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";

@Component({
    selector: "Dashboard",
    moduleId: module.id,
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"]
})

export class DashboardComponent{
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/

    public item: any;
    
    public constructor() {
        this.item = {
            "CreatedBy": "Karthik",
            "UpdatedDate": "Marupeddi",
            "Title": "XXX",
            "Summary": "Batman wants to be friends?"
        }
        this._sideDrawerTransition = new SlideInOnTopTransition();

    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
}