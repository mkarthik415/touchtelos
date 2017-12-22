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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBWSxXQVFYO0FBUkQsV0FBWSxXQUFXO0lBQ25CLDhCQUFjLENBQUE7SUFDZCw4Q0FBNkIsQ0FBQTtJQUM3QixnREFBK0IsQ0FBQTtJQUMvQixpQ0FBZ0IsQ0FBQTtJQUNoQiw4Q0FBNkIsQ0FBQTtJQUM3Qiw0Q0FBMkIsQ0FBQTtJQUMzQixvQ0FBbUIsQ0FBQTtBQUN2QixDQUFDLEVBUlcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFRdEI7QUFFRCxJQUFZLFdBUVg7QUFSRCxXQUFZLFdBQVc7SUFDbkIsMENBQTRCLENBQUE7SUFDNUIsOEJBQWdCLENBQUE7SUFDaEIsNENBQThCLENBQUE7SUFDOUIsOENBQWdDLENBQUE7SUFDaEMsMENBQTRCLENBQUE7SUFDNUIsNENBQThCLENBQUE7SUFDOUIsMENBQTRCLENBQUE7QUFDaEMsQ0FBQyxFQVJXLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBUXRCO0FBRUQsSUFBWSxrQkFRWDtBQVJELFdBQVksa0JBQWtCO0lBQzFCLHNDQUFrQixDQUFBO0lBQ2xCLGtDQUFjLENBQUE7SUFDZCwwQ0FBc0IsQ0FBQTtJQUN0QixvREFBZ0MsQ0FBQTtJQUNoQyxzQ0FBa0IsQ0FBQTtJQUNsQiwyQ0FBdUIsQ0FBQTtJQUN2Qiw2Q0FBeUIsQ0FBQTtBQUM3QixDQUFDLEVBUlcsa0JBQWtCLEdBQWxCLDBCQUFrQixLQUFsQiwwQkFBa0IsUUFRN0IiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZW51bSB3ZWJTZXJ2aWNlcyB7XG4gICAgYnlOYW1lID1cIm5hbWVcIixcbiAgICBieVNlcmlhbE51bWJlcj1cInNlcmlhbE51bWJlclwiLFxuICAgIGJ5VmVoaWNsZU51bWJlcj1cInZlaGljbGVOdW1iZXJcIixcbiAgICBzdGFydERhdGU9XCJuYW1lXCIsXG4gICAgYnlQb2xpY3lOdW1iZXI9XCJwb2xpY3lOdW1iZXJcIixcbiAgICBieVBob25lTnVtYmVyPVwicGhvbmVOdW1iZXJcIixcbiAgICBieUVtYWlsSWQ9XCJlbWFpbElkXCJcbn1cblxuZXhwb3J0IGVudW0gZGVzY3JpcHRpb24ge1xuICAgIFwiU2VyaWFsICNcIiA9XCJieVNlcmlhbE51bWJlclwiLFxuICAgIFwiTmFtZVwiID1cImJ5TmFtZVwiLFxuICAgIFwiVmVoaWNsZSAjXCIgPVwiYnlWZWhpY2xlTnVtYmVyXCIsXG4gICAgXCJQb2xpY3kgSXNzdWUgRGF0ZVwiID1cInN0YXJ0RGF0ZVwiLFxuICAgIFwiUG9saWN5ICNcIiA9XCJieVBvbGljeU51bWJlclwiLFxuICAgIFwiVGVsZXBob25lICNcIiA9XCJieVBob25lTnVtYmVyXCIsXG4gICAgXCJFbWFpbCBBZGRyZXNzXCIgPVwiYnlFbWFpbElkXCJcbn1cblxuZXhwb3J0IGVudW0gc2VhcmNoS2V5Ym9hcmRUeXBlIHtcbiAgICBcIlNlcmlhbCAjXCIgPSBcInVybFwiLFxuICAgIFwiTmFtZVwiID0gXCJ1cmxcIixcbiAgICBcIlZlaGljbGUgI1wiID0gXCJudW1iZXJcIixcbiAgICBcIlBvbGljeSBJc3N1ZSBEYXRlXCIgPSBcImRhdGV0aW1lXCIsXG4gICAgXCJQb2xpY3kgI1wiID0gXCJ1cmxcIixcbiAgICBcIlRlbGVwaG9uZSAjXCIgPSBcInBob25lXCIsXG4gICAgXCJFbWFpbCBBZGRyZXNzXCIgPSBcImVtYWlsXCJcbn0iXX0=