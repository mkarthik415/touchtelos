import { Component, OnInit, Injectable } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { SnackBar } from "nativescript-snackbar";
import { UserInfo } from '../shared/userInfo';



@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "login.component.html"
})

@Injectable()
export class LoginComponent {
    public input: any;
    public password: any;
    public username: String;
    public message: string;

    ngOnInit(): void {
        /* ***********************************************************
        * Use the MyDrawerComponent "onInit" event handler to initialize the properties data values.
        *************************************************************/
        console.log("User logged in " + this.message);
    }

    public constructor(private router: RouterExtensions,
        private myinfo: UserInfo) { }

    public login() {

        if (this.username && this.password) {

            if (this.password == 'poplar5' && this.username == 'poplar5') {
                (new SnackBar()).simple("Login Succesful!");
                this.myinfo.changeMessage("test");
                this.router.navigate(["/search"], { clearHistory: true });
            } else if (this.password == 'hydtelos' && this.username == 'mnrao') {
                (new SnackBar()).simple("Login Succesful!");
                this.myinfo.changeMessage("mnrao");
                this.router.navigate(["/search"], { clearHistory: true });
            } else if (this.password == 'hydtelos' && this.username == 'mrgraju') {
                (new SnackBar()).simple("Login Succesful!");
                this.myinfo.changeMessage("mrgraju");
                this.router.navigate(["/search"], { clearHistory: true });
            }
            else {
                (new SnackBar()).simple("Incorrect Credentials!" + this.password);
            }
        }
        else {
            (new SnackBar()).simple("All Fields Required!");
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
    }

}