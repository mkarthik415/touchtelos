"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var my_drawer_item_component_1 = require("./my-drawer-item/my-drawer-item.component");
var my_drawer_component_1 = require("./my-drawer/my-drawer.component");
var SharedModule = (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                angular_1.NativeScriptUISideDrawerModule
            ],
            declarations: [
                my_drawer_component_1.MyDrawerComponent,
                my_drawer_item_component_1.MyDrawerItemComponent
            ],
            exports: [
                my_drawer_component_1.MyDrawerComponent,
                angular_1.NativeScriptUISideDrawerModule
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
