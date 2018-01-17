import {Component, OnInit, ViewChild} from "@angular/core";
import {DrawerTransitionBase, SlideInOnTopTransition} from "nativescript-pro-ui/sidedrawer";
import {RadSideDrawerComponent} from "nativescript-pro-ui/sidedrawer/angular";

import {MyHttpGetService} from "../shared/MyHttpGetService"
import {webServices, description, searchKeyboardType} from "../shared/Constants";
import {SegmentedBar, SegmentedBarItem} from "ui/segmented-bar";
import {SearchBar} from "tns-core-modules/ui/search-bar";
import {RouterExtensions} from "nativescript-angular";
import "rxjs/add/operator/switchMap";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import {ListViewEventData, RadListView} from "nativescript-pro-ui/listview";

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
    public totalResults:Array<any>;
    public searchEndPt: any;
    public searchHint: string;
    public searchKeyboardType: any;
    public myItemss: Array<SegmentedBarItem>;
    public barItemTitles: Array<string>;
    public resultInfo: string;
    public labelVisibility: boolean;
    public loadModelVisibility: boolean;
    public searchPhrase: string;
    public activityIndicator: boolean;
    private response: boolean;
    private industry: string;
    private searchBar: any;
    private index: number;
    private loadMore: string;

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
        this.resultInfo = " Select search criteria .....";
        this.labelVisibility = true;
        this.loadModelVisibility = true;
        this.barItemTitles = ["Serial #", "Name", "Vehicle #", "Policy Issue Date", "Policy #", "Telephone #", "Email Address"];
        this.myItemss = [];
        this.loadMore = "Load More"
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
        this.index = 0;
        this.myItems = [];
        this.totalResults = res.records.reverse();
        for (var i = 0, len =  (this.totalResults.length >= 10 ? 10 : this.totalResults.length); i <= len; i++) {
            this.myItems.push(this.totalResults[i]);
            this.index = i;
          }
        console.log("the size of the array is: " + this.myItems.length);
        this.activityIndicator = false;
        if (this.myItems) {
            this.labelVisibility = false;
            this.loadModelVisibility = false;
        }
        else {
            this.labelVisibility = true;
            this.loadModelVisibility = true;
            this.resultInfo = " No Data found.";
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
        this.loadModelVisibility = true;
        this.resultInfo = " No Data found.";
        console.log("onGetDataError: " + err);
    }

    extractData(args) {
        this.activityIndicator = true;
        this.searchBar = <SearchBar>args.object;
        this.myService.getData((this.searchEndPt + "?" + webServices[this.searchEndPt] + "=" + this.searchBar.text))
            .subscribe((result) => {
                this.activityIndicator = false;
                if (result) {
                    this.onGetDataSuccess(result);
                }
                else {
                    this.labelVisibility = true;
                    this.loadModelVisibility = true;
                    this.resultInfo = " No Data found.";
                    this.myItems = null;
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
        this.searchPhrase = "";
    }


    public onLoadMoreItemsRequested(args: ListViewEventData) {
        let listView: RadListView = args.object;
        if(this.totalResults.length > 10){

            for (var i = this.index+1, len = (this.totalResults.length >= this.index + 10 ? this.index + 10 : this.totalResults.length); i <= len; i++) {
                this.myItems = [];
                this.myItems.push(this.totalResults[i]);
                if(this.totalResults.length==i)
                {
                    listView.notifyLoadOnDemandFinished();
                    this.loadModelVisibility = false;
                }
            }
            this.index = this.index + 10;
        }
        else {
            this.loadModelVisibility = false;
        }
    }
}
