"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var LoginComponent = (function () {
    function LoginComponent(router) {
        this.router = router;
    }
    LoginComponent.prototype.login = function () {
        this.router.navigate(["/dashboard"], { clearHistory: true });
        /*        if(this.password == '12narkar' && this.username == 'Mkarthik415') {
                    (new SnackBar()).simple("Login Succesful!");
                    this.router.navigate(["/dashboard"], { clearHistory: true });
                } else {
                    (new SnackBar()).simple("Incorrect Credentials!"+this.password);
                }*/
        /*        if(this.input.email && this.input.password) {
                    /!*let account = JSON.parse(ApplicationSettings.getString("account", "{email=mkarthik,password}"));*!/
                    if(this.input.email == 'Mkarthik415@gmail.com' && this.input.password == "12narkar") {
                       /!* (new SnackBar()).simple("Login Succesful!");*!/
                    } else {
                        (new SnackBar()).simple("Incorrect Credentials!");
                    }
                } else {
                    (new SnackBar()).simple("All Fields Required!");
                }*/
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-login",
            templateUrl: "login.component.html",
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
