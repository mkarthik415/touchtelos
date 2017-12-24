"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var MyHttpGetService = (function () {
    /*     private serverUrl = "http://localhost:8080/"; */
    function MyHttpGetService(http) {
        this.http = http;
        this.serverUrl = "https://connect2telos.com/telosws/";
    }
    MyHttpGetService.prototype.getData = function (endpoint) {
        var headers = this.createRequestHeader();
        console.log("webservice endpoint" + this.serverUrl + endpoint);
        return this.http.get(this.serverUrl + endpoint)
            .map(function (res) { return res.text().length > 0 ? res.json() : res.text(); });
    };
    MyHttpGetService.prototype.getResponseInfo = function () {
        var headers = this.createRequestHeader();
        return this.http.get(this.serverUrl, { headers: headers })
            .do(function (res) { return res; });
    };
    MyHttpGetService.prototype.createRequestHeader = function () {
        var headers = new http_1.Headers();
        // set headers here e.g.
        /*        headers.append("AuthKey", "my-key");
                headers.append("AuthToken", "my-token");
                headers.append("Content-Type", "application/json");*/
        return headers;
    };
    MyHttpGetService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], MyHttpGetService);
    return MyHttpGetService;
}());
exports.MyHttpGetService = MyHttpGetService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlIdHRwR2V0U2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk15SHR0cEdldFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXdEO0FBRXhELGlDQUErQjtBQUMvQixnQ0FBOEI7QUFHOUI7SUFFQSx1REFBdUQ7SUFFbkQsMEJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBSHBCLGNBQVMsR0FBRyxvQ0FBb0MsQ0FBQztJQUd6QixDQUFDO0lBRW5DLGtDQUFPLEdBQVAsVUFBUSxRQUFRO1FBQ1osSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsR0FBQyxJQUFJLENBQUMsU0FBUyxHQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFDLFFBQVEsQ0FBQzthQUN4QyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxFQUE5QyxDQUE4QyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELDBDQUFlLEdBQWY7UUFDSSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUNyRCxFQUFFLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVPLDhDQUFtQixHQUEzQjtRQUNJLElBQUksT0FBTyxHQUFHLElBQUksY0FBTyxFQUFFLENBQUM7UUFDNUIsd0JBQXdCO1FBQ2hDOztxRUFFNkQ7UUFFckQsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBM0JRLGdCQUFnQjtRQUQ1QixpQkFBVSxFQUFFO3lDQUtpQixXQUFJO09BSnJCLGdCQUFnQixDQTRCNUI7SUFBRCx1QkFBQztDQUFBLEFBNUJELElBNEJDO0FBNUJZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuXG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNeUh0dHBHZXRTZXJ2aWNlIHtcbiAgICAgIHByaXZhdGUgc2VydmVyVXJsID0gXCJodHRwczovL2Nvbm5lY3QydGVsb3MuY29tL3RlbG9zd3MvXCI7XG4vKiAgICAgcHJpdmF0ZSBzZXJ2ZXJVcmwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9cIjsgKi9cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkgeyB9XG5cbiAgICBnZXREYXRhKGVuZHBvaW50KSB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwid2Vic2VydmljZSBlbmRwb2ludFwiK3RoaXMuc2VydmVyVXJsK2VuZHBvaW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5zZXJ2ZXJVcmwrZW5kcG9pbnQpXG4gICAgICAgICAgICAubWFwKHJlcyA9PiByZXMudGV4dCgpLmxlbmd0aCA+MCA/IHJlcy5qc29uKCkgOiByZXMudGV4dCgpKTtcbiAgICB9XG5cbiAgICBnZXRSZXNwb25zZUluZm8oKSB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuc2VydmVyVXJsLCB7IGhlYWRlcnM6IGhlYWRlcnMgfSlcbiAgICAgICAgICAgIC5kbyhyZXMgPT4gcmVzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVJlcXVlc3RIZWFkZXIoKSB7XG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgICAgICAgLy8gc2V0IGhlYWRlcnMgaGVyZSBlLmcuXG4vKiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJBdXRoS2V5XCIsIFwibXkta2V5XCIpO1xuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkF1dGhUb2tlblwiLCBcIm15LXRva2VuXCIpO1xuICAgICAgICBoZWFkZXJzLmFwcGVuZChcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7Ki9cblxuICAgICAgICByZXR1cm4gaGVhZGVycztcbiAgICB9XG59Il19