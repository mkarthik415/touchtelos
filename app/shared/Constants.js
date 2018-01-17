"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webServices;
(function (webServices) {
    webServices["byName"] = "name";
    webServices["bySerialNumber"] = "serialNumber";
    webServices["byVehicleNumber"] = "vehicleNumber";
    webServices["startDate"] = "name";
    webServices["byPolicyNumber"] = "policyNumber";
    webServices["byPhoneNumber"] = "phoneNumber";
    webServices["byEmailId"] = "emailId";
})(webServices = exports.webServices || (exports.webServices = {}));
var description;
(function (description) {
    description["Serial #"] = "bySerialNumber";
    description["Name"] = "byName";
    description["Vehicle #"] = "byVehicleNumber";
    description["Policy Issue Date"] = "startDate";
    description["Policy #"] = "byPolicyNumber";
    description["Telephone #"] = "byPhoneNumber";
    description["Email Address"] = "byEmailId";
})(description = exports.description || (exports.description = {}));
var searchKeyboardType;
(function (searchKeyboardType) {
    searchKeyboardType["Serial #"] = "url";
    searchKeyboardType["Name"] = "url";
    searchKeyboardType["Vehicle #"] = "number";
    searchKeyboardType["Policy Issue Date"] = "datetime";
    searchKeyboardType["Policy #"] = "url";
    searchKeyboardType["Telephone #"] = "phone";
    searchKeyboardType["Email Address"] = "email";
})(searchKeyboardType = exports.searchKeyboardType || (exports.searchKeyboardType = {}));
