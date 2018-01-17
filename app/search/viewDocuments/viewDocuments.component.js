"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
var nativescript_angular_1 = require("nativescript-angular");
var MyHttpGetService_1 = require("../../shared/MyHttpGetService");
var SocialShare = require("nativescript-social-share");
/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "viewDocuments", loadChildren: "./viewDocuments/viewDocuments.module#ViewDocumentsModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/
var ViewDocumentsComponent = (function () {
    function ViewDocumentsComponent(_pageRoute, myService) {
        this._pageRoute = _pageRoute;
        this.myService = myService;
        /* ***********************************************************
        * Use the constructor to inject app services that you need in this component.
        *************************************************************/
    }
    ViewDocumentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for this component.
        *************************************************************/
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        this._pageRoute.activatedRoute
            .switchMap(function (activatedRoute) { return activatedRoute.params; })
            .forEach(function (params) {
            _this.mySerialNumber = params.id;
        });
        this.myService.getData("documentsById?id" + "=" + this.mySerialNumber)
            .subscribe(function (result) {
            _this.onGetDocumentsSuccess(result);
        }, function (error) {
            _this.onGetDataError(error);
        });
    };
    ViewDocumentsComponent.prototype.onGetDocumentsSuccess = function (documents) {
        this.invoiceLink = (documents[0].url).split(' ').join('%20');
    };
    Object.defineProperty(ViewDocumentsComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    ViewDocumentsComponent.prototype.onGetDataError = function (error) {
        var body = error.json() || "";
        var err = body.error || JSON.stringify(body);
        console.log("onGetDataError: " + err);
    };
    ViewDocumentsComponent.prototype.shareImage = function () {
        SocialShare.shareUrl(this.invoiceLink, "Use link to download the document.", "Use link to download the document.");
    };
    ViewDocumentsComponent = __decorate([
        core_1.Component({
            selector: "ViewDocuments",
            moduleId: module.id,
            templateUrl: "./viewDocuments.component.html",
            providers: [MyHttpGetService_1.MyHttpGetService]
        }),
        __metadata("design:paramtypes", [nativescript_angular_1.PageRoute,
            MyHttpGetService_1.MyHttpGetService])
    ], ViewDocumentsComponent);
    return ViewDocumentsComponent;
}());
exports.ViewDocumentsComponent = ViewDocumentsComponent;
