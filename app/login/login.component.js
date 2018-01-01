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
                (new nativescript_snackbar_1.SnackBar()).simple("Incorrect Credentials!" + this.password);
            }
        }
        else {
            (new nativescript_snackbar_1.SnackBar()).simple("All Fields Required!");
        }
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
            templateUrl: "login.component.html"
        }),
        core_1.Injectable(),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            userInfo_1.UserInfo])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQThEO0FBQzlELHNEQUErRDtBQUMvRCwrREFBaUQ7QUFDakQsK0NBQThDO0FBVzlDO0lBYUksd0JBQTJCLE1BQXdCLEVBQ3ZDLE1BQWdCO1FBREQsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDdkMsV0FBTSxHQUFOLE1BQU0sQ0FBVTtJQUFJLENBQUM7SUFSakMsaUNBQVEsR0FBUjtRQUNJOztzRUFFOEQ7UUFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUtNLDhCQUFLLEdBQVo7UUFFSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBRWpDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsQ0FBQyxJQUFJLGdDQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzlELENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxVQUFVLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNqRSxDQUFDLElBQUksZ0NBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDOUQsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLFVBQVUsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25FLENBQUMsSUFBSSxnQ0FBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUM5RCxDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0YsQ0FBQyxJQUFJLGdDQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEUsQ0FBQztRQUNMLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNGLENBQUMsSUFBSSxnQ0FBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBRUQ7Ozs7Ozs7OzttQkFTVztJQUNmLENBQUM7SUFuRFEsY0FBYztRQVAxQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSxzQkFBc0I7U0FDdEMsQ0FBQztRQUVELGlCQUFVLEVBQUU7eUNBYzBCLHlCQUFnQjtZQUMvQixtQkFBUTtPQWRuQixjQUFjLENBcUQxQjtJQUFELHFCQUFDO0NBQUEsQUFyREQsSUFxREM7QUFyRFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zbmFja2JhclwiO1xuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tICcuLi9zaGFyZWQvdXNlckluZm8nO1xuXG5cblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogXCJucy1sb2dpblwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImxvZ2luLmNvbXBvbmVudC5odG1sXCJcbn0pXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCB7XG4gICAgcHVibGljIGlucHV0OiBhbnk7XG4gICAgcHVibGljIHBhc3N3b3JkOiBhbnk7XG4gICAgcHVibGljIHVzZXJuYW1lOiBTdHJpbmc7XG4gICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZztcblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAgICAqIFVzZSB0aGUgTXlEcmF3ZXJDb21wb25lbnQgXCJvbkluaXRcIiBldmVudCBoYW5kbGVyIHRvIGluaXRpYWxpemUgdGhlIHByb3BlcnRpZXMgZGF0YSB2YWx1ZXMuXG4gICAgICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBsb2dnZWQgaW4gXCIgKyB0aGlzLm1lc3NhZ2UpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgcHJpdmF0ZSBteWluZm86IFVzZXJJbmZvKSB7IH1cblxuICAgIHB1YmxpYyBsb2dpbigpIHtcblxuICAgICAgICBpZiAodGhpcy51c2VybmFtZSAmJiB0aGlzLnBhc3N3b3JkKSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnBhc3N3b3JkID09ICdwb3BsYXI1JyAmJiB0aGlzLnVzZXJuYW1lID09ICdwb3BsYXI1Jykge1xuICAgICAgICAgICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiTG9naW4gU3VjY2VzZnVsIVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLm15aW5mby5jaGFuZ2VNZXNzYWdlKFwidGVzdFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvc2VhcmNoXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wYXNzd29yZCA9PSAnaHlkdGVsb3MnICYmIHRoaXMudXNlcm5hbWUgPT0gJ21ucmFvJykge1xuICAgICAgICAgICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiTG9naW4gU3VjY2VzZnVsIVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLm15aW5mby5jaGFuZ2VNZXNzYWdlKFwibW5yYW9cIik7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL3NlYXJjaFwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGFzc3dvcmQgPT0gJ2h5ZHRlbG9zJyAmJiB0aGlzLnVzZXJuYW1lID09ICdtcmdyYWp1Jykge1xuICAgICAgICAgICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiTG9naW4gU3VjY2VzZnVsIVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLm15aW5mby5jaGFuZ2VNZXNzYWdlKFwibXJncmFqdVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvc2VhcmNoXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiSW5jb3JyZWN0IENyZWRlbnRpYWxzIVwiICsgdGhpcy5wYXNzd29yZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkFsbCBGaWVsZHMgUmVxdWlyZWQhXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogICAgICAgIGlmKHRoaXMuaW5wdXQuZW1haWwgJiYgdGhpcy5pbnB1dC5wYXNzd29yZCkge1xuICAgICAgICAgICAgICAgICAgICAvISpsZXQgYWNjb3VudCA9IEpTT04ucGFyc2UoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRTdHJpbmcoXCJhY2NvdW50XCIsIFwie2VtYWlsPW1rYXJ0aGlrLHBhc3N3b3JkfVwiKSk7KiEvXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaW5wdXQuZW1haWwgPT0gJ01rYXJ0aGlrNDE1QGdtYWlsLmNvbScgJiYgdGhpcy5pbnB1dC5wYXNzd29yZCA9PSBcIjEybmFya2FyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgLyEqIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiTG9naW4gU3VjY2VzZnVsIVwiKTsqIS9cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiSW5jb3JyZWN0IENyZWRlbnRpYWxzIVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiQWxsIEZpZWxkcyBSZXF1aXJlZCFcIik7XG4gICAgICAgICAgICAgICAgfSovXG4gICAgfVxuXG59Il19