"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var shared_module_1 = require("../shared/shared.module");
var settings_routing_module_1 = require("./settings-routing.module");
var settings_component_1 = require("./settings.component");
var SettingsModule = (function () {
    function SettingsModule() {
    }
    SettingsModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                settings_routing_module_1.SettingsRoutingModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                settings_component_1.SettingsComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], SettingsModule);
    return SettingsModule;
}());
exports.SettingsModule = SettingsModule;
