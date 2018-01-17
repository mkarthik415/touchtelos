"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var platform_1 = require("nativescript-angular/platform");
var app_module_1 = require("./app.module");
var nativescript_pdf_view_1 = require("nativescript-pdf-view");
var element_registry_1 = require("nativescript-angular/element-registry");
/*
registerElement("CardView", () => require("nativescript-cardview").CardView); */
element_registry_1.registerElement("Gradient", function () { return require("nativescript-gradient").Gradient; });
element_registry_1.registerElement('PDFView', function () { return nativescript_pdf_view_1.PDFView; });
element_registry_1.registerElement("Fab", function () { return require("nativescript-floatingactionbutton").Fab; });
platform_1.platformNativeScriptDynamic().bootstrapModule(app_module_1.AppModule);
