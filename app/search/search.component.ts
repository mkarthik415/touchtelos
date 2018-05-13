import {Component, OnInit, ViewChild, ChangeDetectorRef} from "@angular/core";
import {DrawerTransitionBase, SlideInOnTopTransition} from "nativescript-pro-ui/sidedrawer";
import {RadSideDrawerComponent} from "nativescript-pro-ui/sidedrawer/angular";

import {MyHttpGetService} from "../shared/MyHttpGetService"
import {webServices, description, searchKeyboardType} from "../shared/Constants";
import {SegmentedBar, SegmentedBarItem} from "ui/segmented-bar";
import {SearchBar} from "tns-core-modules/ui/search-bar";
import {RouterExtensions} from "nativescript-angular";
import "rxjs/add/operator/switchMap";
import {ListViewEventData, RadListView, ListViewLoadOnDemandMode} from "nativescript-pro-ui/listview";
import { UserInfo } from '../shared/userInfo';
import * as app from 'application';
import {ObservableArray} from "tns-core-modules/data/observable-array";
import { SearchItem } from "../../app/search/SearchItem";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs/Observable";
import { setInterval, setTimeout, clearInterval } from "timer";
import * as Timer from "tns-core-modules/timer";



@Component({
    selector: "Search",
    moduleId: module.id,
    templateUrl: "./search.component.html",
    styleUrls: ["search.component.css"],
    providers: [MyHttpGetService]
})
export class SearchComponent implements OnInit {
    searchResponse: any;
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
    public testvalue: Observable<any>;
    public myItems: Array<any>;
    public totalResults: Array<any>;
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
    public loadMore: string;
    public searchString: string;
    private _dataItems: ObservableArray<any>;
    private searchResults: SearchItem[];
    private intialNumber: number;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.activityIndicator = false;
        this.response = false;

        app.on(app.orientationChangedEvent, (args: app.OrientationChangedEventData) => {
            this.myinfo.currentSearchString.subscribe(results => this.searchString = results);
            this.myinfo.currentEndPt.subscribe(results => this.searchEndPt = results);
            if (args.newValue === 'landscape') {

                this.serviceCall();
            } else {
                this.serviceCall();
            }
        });
    }


    public constructor(private myService: MyHttpGetService,
                       private _routerExtensions: RouterExtensions,
                       private myinfo: UserInfo) {
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
        this.intialNumber = 0;
        this.myItems = new Array<any>();
        this.totalResults = new Array<any>();
        this.totalResults = res.reverse();
        for (var i = 0, len =  (this.totalResults.length >= 10 ? 10 : this.totalResults.length); i <= len; i++) {
            this.myItems.push(this.totalResults[i]);
            this.index = i;
            this.intialNumber++;
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
/*         for (let myItem in this.myItems) {
            console.log(myItem.INSURED_NAME);
        } */

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
        this.searchString = this.searchBar.text;
        this.myinfo.changeSearchString(this.searchString);
        this.myinfo.changeeEndPt(this.searchEndPt);
        this.serviceCall();
    }

    private serviceCall() {
    
        this.searchResponse = new Array();
        this.myService.getData((this.searchEndPt + "?" + webServices[this.searchEndPt] + "=" + this.searchString)).subscribe(
            // the first argument is a function which runs on success
            data => { console.log('done loading foods');
            data.records.map(item => { 
                this.searchResponse.push(new SearchItem( 
                    item[0],item[1],item[2],item[3],item[4],item[5],item[6]
                ));
              });
                this.activityIndicator = false;
                if (data) {
                    this.onGetDataSuccess(this.searchResponse);
                }
                else {
                    this.labelVisibility = true;
                    this.loadModelVisibility = true;
                    this.resultInfo = " No Data found.";
                    this.myItems = null;
                }
            },
            // the second argument is a function which runs on error
            err => console.error(err),
            // the third argument is a function which runs on completion
            () => console.log('done loading foods'+this.searchResults[0].AGENTNAME)
          );
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
        var that = new WeakRef(this);

        Timer.setTimeout(function () {
            var listView: RadListView = args.object;
            var initialNumberOfItems = that.get().intialNumber;
            
            for (var i = initialNumberOfItems; i < initialNumberOfItems + 4; i++) {
                if (i > that.get().totalResults.length - 1) {
                    listView.loadOnDemandMode = ListViewLoadOnDemandMode[ListViewLoadOnDemandMode.None];
                    break;
                }
                    

                that.get().myItems.push(that.get().totalResults[i]);
                that.get().intialNumber++;
            }
            listView.notifyLoadOnDemandFinished();
        },1000);
        args.returnValue = true;
    }
}
