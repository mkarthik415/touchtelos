"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var LoginComponent = (function () {
    function LoginComponent(router) {
        this.router = router;
    }
    LoginComponent.prototype.login = function () {
        this.router.navigate(["/search"], { clearHistory: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUErRDtBQVUvRDtJQU1JLHdCQUEyQixNQUF3QjtRQUF4QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtJQUFJLENBQUM7SUFFakQsOEJBQUssR0FBWjtRQUVJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUVsRTs7Ozs7bUJBS1c7UUFFWDs7Ozs7Ozs7O21CQVNXO0lBQ1AsQ0FBQztJQTdCUSxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLHNCQUFzQjtTQUN0QyxDQUFDO3lDQVFxQyx5QkFBZ0I7T0FOMUMsY0FBYyxDQStCMUI7SUFBRCxxQkFBQztDQUFBLEFBL0JELElBK0JDO0FBL0JZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zbmFja2JhclwiO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6IFwibnMtbG9naW5cIixcbiAgICB0ZW1wbGF0ZVVybDogXCJsb2dpbi5jb21wb25lbnQuaHRtbFwiLFxufSlcblxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50e1xuICAgIHB1YmxpYyBpbnB1dDogYW55O1xuICAgIHB1YmxpYyBwYXNzd29yZDogYW55O1xuICAgIHB1YmxpYyB1c2VybmFtZTogYW55O1xuXG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMpIHsgfVxuXG4gICAgcHVibGljIGxvZ2luKCkge1xuXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9zZWFyY2hcIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuXG4vKiAgICAgICAgaWYodGhpcy5wYXNzd29yZCA9PSAnMTJuYXJrYXInICYmIHRoaXMudXNlcm5hbWUgPT0gJ01rYXJ0aGlrNDE1Jykge1xuICAgICAgICAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoXCJMb2dpbiBTdWNjZXNmdWwhXCIpO1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2Rhc2hib2FyZFwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkluY29ycmVjdCBDcmVkZW50aWFscyFcIit0aGlzLnBhc3N3b3JkKTtcbiAgICAgICAgfSovXG5cbi8qICAgICAgICBpZih0aGlzLmlucHV0LmVtYWlsICYmIHRoaXMuaW5wdXQucGFzc3dvcmQpIHtcbiAgICAgICAgICAgIC8hKmxldCBhY2NvdW50ID0gSlNPTi5wYXJzZShBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcImFjY291bnRcIiwgXCJ7ZW1haWw9bWthcnRoaWsscGFzc3dvcmR9XCIpKTsqIS9cbiAgICAgICAgICAgIGlmKHRoaXMuaW5wdXQuZW1haWwgPT0gJ01rYXJ0aGlrNDE1QGdtYWlsLmNvbScgJiYgdGhpcy5pbnB1dC5wYXNzd29yZCA9PSBcIjEybmFya2FyXCIpIHtcbiAgICAgICAgICAgICAgIC8hKiAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkxvZ2luIFN1Y2Nlc2Z1bCFcIik7KiEvXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiSW5jb3JyZWN0IENyZWRlbnRpYWxzIVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiQWxsIEZpZWxkcyBSZXF1aXJlZCFcIik7XG4gICAgICAgIH0qL1xuICAgIH1cblxufSJdfQ==