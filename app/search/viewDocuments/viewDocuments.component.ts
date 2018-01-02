import {Component, OnInit, ViewChild} from "@angular/core";
import {DrawerTransitionBase, SlideInOnTopTransition} from "nativescript-pro-ui/sidedrawer";
import {RadSideDrawerComponent} from "nativescript-pro-ui/sidedrawer/angular";
import {PageRoute, RouterExtensions} from "nativescript-angular";
import {MyHttpGetService} from "../../shared/MyHttpGetService";
import {ActivatedRoute} from "@angular/router";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "viewDocuments", loadChildren: "./viewDocuments/viewDocuments.module#ViewDocumentsModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "ViewDocuments",
    moduleId: module.id,
    templateUrl: "./viewDocuments.component.html",
    providers: [MyHttpGetService]
})
export class ViewDocumentsComponent implements OnInit {


    public invoiceLink: string;

    private _sideDrawerTransition: DrawerTransitionBase;
    public mySerialNumber: string;


    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
                this.mySerialNumber = params.id;
            });

        this.myService.getData("documentsById?id"+ "=" + this.mySerialNumber)
            .subscribe((result) => {
                this.onGetDocumentsSuccess(result);
            }, (error) => {
                this.onGetDataError(error);
            });
    }

    onGetDocumentsSuccess(documents)
    {
        this.invoiceLink = (documents[0].url).split(' ').join('%20');
    }

    constructor(private _pageRoute: PageRoute,
                private myService: MyHttpGetService) {
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    private onGetDataError(error: Response | any) {
        const body = error.json() || "";
        const err = body.error || JSON.stringify(body);
        console.log("onGetDataError: " + err);
    }
}
