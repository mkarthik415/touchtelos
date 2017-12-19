import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { SnackBar } from "nativescript-snackbar";


@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "login.component.html",
})

export class LoginComponent{
    public input: any;
    public password: any;
    public username: any;


    public constructor(private router: RouterExtensions) { }

    public login() {

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
    }

}