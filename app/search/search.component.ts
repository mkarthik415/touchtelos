import {Component, OnInit, ViewChild} from "@angular/core";
import {DrawerTransitionBase, SlideInOnTopTransition} from "nativescript-pro-ui/sidedrawer";
import {RadSideDrawerComponent} from "nativescript-pro-ui/sidedrawer/angular";

import {MyHttpGetService} from "../shared/MyHttpGetService"
import {webServices, description, searchKeyboardType} from "../shared/Constants";
import {SegmentedBar, SegmentedBarItem} from "ui/segmented-bar";
import {SearchBar} from "tns-core-modules/ui/search-bar";
import {RouterExtensions} from "nativescript-angular";
import "rxjs/add/operator/switchMap";

@Component({
    selector: "Search",
    moduleId: module.id,
    templateUrl: "./search.component.html",
    styleUrls: ["search.component.css"],
    providers: [MyHttpGetService]
})
export class SearchComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;
    public host: string;
    public userAgent: string;
    public origin: string;
    public url: string;
    public myItems: Array<any>;
    public searchEndPt: any;
    public searchHint: string;
    public searchKeyboardType: any;
    public myItemss: Array<SegmentedBarItem>;
    public barItemTitles: Array<string>;
    public resultInfo: string;
    public labelVisibility: boolean;
    public searchPhrase: string;
    public activityIndicator: boolean;
    private response: boolean;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.activityIndicator = false;
        this.response = false;
    }


    public constructor(private myService: MyHttpGetService,
                       private _routerExtensions: RouterExtensions) {
        this.resultInfo = " Select search criteria and input values in search field.";
        this.labelVisibility = true;
        this.barItemTitles = ["Serial #", "Name", "Vehicle #", "Policy Issue Date", "Policy #", "Telephone #", "Email Address"];
        this.myItemss = [];
        for (var i of this.barItemTitles) {
            const item = new SegmentedBarItem();
            item.title = i;
            this.myItemss.push(item);
        }
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
        this.myItems = res;
        console.log("the size of the array is: " + this.myItems.length);
        this.activityIndicator = false;
        if (this.myItems) {
            this.labelVisibility = false;
        }
        else {
            this.labelVisibility = true;
            this.resultInfo = " No Data found for selected search criteria";
        }
        this.host = res.headers.Host;
        this.userAgent = res.headers["User-Agent"];
        this.origin = res.origin;
        this.url = res.url;
        for (let myItem in this.myItems) {
            console.log(myItem);
        }

    }

    private onGetDataError(error: Response | any) {
        const body = error.json() || "";
        const err = body.error || JSON.stringify(body);
        this.activityIndicator = false;
        this.labelVisibility = true;
        this.resultInfo = " No Data found for selected search criteria";
        console.log("onGetDataError: " + err);
    }

    extractData(args) {
        this.activityIndicator = true;
        let searchBar = <SearchBar>args.object;
        this.myService.getData((this.searchEndPt + "?" + webServices[this.searchEndPt] + "=" + searchBar.text))
            .subscribe((result) => {
                this.activityIndicator = false;
                if (result) {

                    console.log("result from webservices: " + result);
                    this.onGetDataSuccess(result);
                }
                else {
                    this.labelVisibility = true;
                    this.resultInfo = " No Data found for selected search criteria";
                }
            }, (error) => {
                this.onGetDataError(error);
            });
    }

    public onSelectedIndexChange(args) {
        let segmetedBar = <SegmentedBar>args.object;
        this.searchHint = "Search By " + segmetedBar.items[segmetedBar.selectedIndex].title;
        this.searchEndPt = description[segmetedBar.items[segmetedBar.selectedIndex].title];
        this.searchKeyboardType = searchKeyboardType[segmetedBar.items[segmetedBar.selectedIndex].title];
        this.searchPhrase = "";

    }

    onPolicytemTap(args) {

        const tappedPolicyItem = args.view.bindingContext;

        this._routerExtensions.navigate(["/search/policyDetails", tappedPolicyItem.id],
            {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
    }


    public onClear(args) {
        let searchBar = <SearchBar>args.object;
        searchBar.text = "";
    }

}
