import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import {PageRoute, RouterExtensions} from "nativescript-angular";
import "rxjs/add/operator/switchMap";
import {MyHttpGetService} from "../../shared/MyHttpGetService";
import {SegmentedBar, SegmentedBarItem} from "tns-core-modules/ui/segmented-bar";
import { SetupItemViewArgs } from "nativescript-angular/directives";

@Component({
    selector: "policyDetails",
    moduleId: module.id,
    templateUrl: "./policyDetails.component.html",
    styleUrls: ["policyDetail.component.css"],
    providers: [MyHttpGetService]
})
export class PolicyDetailsComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;
    public mySerialNumber: string;
    public policyInfo: Array<any>;
    public items: Array<SegmentedBarItem>;
    public selectedIndex = 0;
    public visibility: string;
    public barItemTitles: Array<string>;
    public dataItems: Array<any>;
    public invoiceLink: string;
    public activityIndicator: boolean;
    public policyType: string;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.activityIndicator = false;
        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
                 this.mySerialNumber = params.id;
            });
            this.activityIndicator = false;

        this.myService.getData("bySerialNumber?serialNumber"+ "=" + this.mySerialNumber)
            .subscribe((result) => {
                this.onGetDataSuccess(result);
            }, (error) => {
                this.onGetDataError(error);
            });
    }

    public constructor(private _pageRoute: PageRoute,
                       private myService: MyHttpGetService,
                       private _routerExtensions: RouterExtensions) {
        this.items = [];
        this.barItemTitles = ["Personal Details","Ins Company Details","Policy Details","Amount Details","Documents","Renewal Details"];
        this.selectedIndex = 0;
        for (var i of this.barItemTitles) {
            const item = new SegmentedBarItem();
            item.title = i;
            this.items.push(item);
        }

    }

    getDocumentsInfo()
    {
        this.myService.getData("documentsByClient?id"+ "=" + this.mySerialNumber)
        .subscribe((result) => {
            this.onGetDocumentsSuccess(result);
        }, (error) => {
            this.onGetDataError(error);
        });
    }

    onGetDocumentsSuccess(documents)
    {
        this.dataItems = documents;
        console.log("results are "+this.dataItems[0]);
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

    private onGetDataSuccess(res) {
        this.activityIndicator = true;
        this.visibility = "Personal Details";
        this.policyInfo = res;
        this.policyType = this.policyInfo[0].department;
        console.log("results are "+this.policyInfo[0].clientName);
    }

    private onGetDataError(error: Response | any) {
        const body = error.json() || "";
        const err = body.error || JSON.stringify(body);
        console.log("onGetDataError: " + err);
    }

    public onSelectedIndexChange(args) {
        let segmetedBar = <SegmentedBar>args.object;
        this.selectedIndex = segmetedBar.selectedIndex;
        this.visibility = segmetedBar.items[segmetedBar.selectedIndex].title;
        if(this.visibility == "Documents")
        {
            this.getDocumentsInfo();
        }
    }

    onSetupItemView(args: SetupItemViewArgs) {
        args.view.context.third = (args.index % 3 === 0);
        args.view.context.header = ((args.index + 1) % this.items.length === 1);
        args.view.context.footer = (args.index + 1 === this.items.length);
    }

    public onItemTap(args) {
        console.log("Item Tapped at cell index: " + args.index);
        this._routerExtensions.navigate(["/search/viewDocuments", this.dataItems[args.index].id],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
    }
}
