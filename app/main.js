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
platform_1.platformNativeScriptDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwR0FBMEc7QUFDMUcsMERBQTRFO0FBRTVFLDJDQUF5QztBQUN6QywrREFBZ0Q7QUFDaEQsMEVBQXNFO0FBQ3RFO2dGQUNnRjtBQUNoRixrQ0FBZSxDQUFDLFVBQVUsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsUUFBUSxFQUF6QyxDQUF5QyxDQUFDLENBQUM7QUFDN0Usa0NBQWUsQ0FBQyxTQUFTLEVBQUUsY0FBTSxPQUFBLCtCQUFPLEVBQVAsQ0FBTyxDQUFDLENBQUM7QUFFMUMsc0NBQTJCLEVBQUUsQ0FBQyxlQUFlLENBQUMsc0JBQVMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdGhpcyBpbXBvcnQgc2hvdWxkIGJlIGZpcnN0IGluIG9yZGVyIHRvIGxvYWQgc29tZSByZXF1aXJlZCBzZXR0aW5ncyAobGlrZSBnbG9iYWxzIGFuZCByZWZsZWN0LW1ldGFkYXRhKVxuaW1wb3J0IHsgcGxhdGZvcm1OYXRpdmVTY3JpcHREeW5hbWljIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3BsYXRmb3JtXCI7XG5cbmltcG9ydCB7IEFwcE1vZHVsZSB9IGZyb20gXCIuL2FwcC5tb2R1bGVcIjtcbmltcG9ydCB7IFBERlZpZXcgfSBmcm9tICduYXRpdmVzY3JpcHQtcGRmLXZpZXcnO1xuaW1wb3J0IHtyZWdpc3RlckVsZW1lbnR9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG4vKiBcbnJlZ2lzdGVyRWxlbWVudChcIkNhcmRWaWV3XCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtY2FyZHZpZXdcIikuQ2FyZFZpZXcpOyAqL1xucmVnaXN0ZXJFbGVtZW50KFwiR3JhZGllbnRcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1ncmFkaWVudFwiKS5HcmFkaWVudCk7XG5yZWdpc3RlckVsZW1lbnQoJ1BERlZpZXcnLCAoKSA9PiBQREZWaWV3KTtcblxucGxhdGZvcm1OYXRpdmVTY3JpcHREeW5hbWljKCkuYm9vdHN0cmFwTW9kdWxlKEFwcE1vZHVsZSk7XG4iXX0=