"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var nativescript_snackbar_1 = require("nativescript-snackbar");
var userInfo_1 = require("../shared/userInfo");
var LoginComponent = (function () {
    function LoginComponent(router, myinfo) {
        this.router = router;
        this.myinfo = myinfo;
    }
    LoginComponent.prototype.ngOnInit = function () {
        /* ***********************************************************
        * Use the MyDrawerComponent "onInit" event handler to initialize the properties data values.
        *************************************************************/
        console.log("User logged in " + this.message);
    };
    LoginComponent.prototype.login = function () {
        if (this.username && this.password) {
            if (this.password == 'poplar5' && this.username == 'poplar5') {
                (new nativescript_snackbar_1.SnackBar()).simple("Login Succesful!");
                this.myinfo.changeMessage("test");
                this.router.navigate(["/search"], { clearHistory: true });
            }
            else if (this.password == 'hydtelos' && this.username == 'mnrao') {
                (new nativescript_snackbar_1.SnackBar()).simple("Login Succesful!");
                this.myinfo.changeMessage("mnrao");
                this.router.navigate(["/search"], { clearHistory: true });
            }
            else if (this.password == 'hydtelos' && this.username == 'mrgraju') {
                (new nativescript_snackbar_1.SnackBar()).simple("Login Succesful!");
                this.myinfo.changeMessage("mrgraju");
                this.router.navigate(["/search"], { clearHistory: true });
            }
            else {
                (new nativescript_snackbar_1.SnackBar()).simple("Incorrect Credentials! ");
            }
        }
        else {
            (new nativescript_snackbar_1.SnackBar()).simple("All Fields Required!");
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-login",
            templateUrl: "login.component.html"
        }),
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            userInfo_1.UserInfo])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
