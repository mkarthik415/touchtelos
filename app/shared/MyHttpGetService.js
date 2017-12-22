"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var MyHttpGetService = (function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlIdHRwR2V0U2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk15SHR0cEdldFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXdEO0FBRXhELGlDQUErQjtBQUMvQixnQ0FBOEI7QUFHOUI7SUFHSSwwQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFGdEIsY0FBUyxHQUFHLG9DQUFvQyxDQUFDO0lBRXZCLENBQUM7SUFFbkMsa0NBQU8sR0FBUCxVQUFRLFFBQVE7UUFDWixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFDLElBQUksQ0FBQyxTQUFTLEdBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUMsUUFBUSxDQUFDO2FBQ3hDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEdBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQTlDLENBQThDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsMENBQWUsR0FBZjtRQUNJLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO2FBQ3JELEVBQUUsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRU8sOENBQW1CLEdBQTNCO1FBQ0ksSUFBSSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUM1Qix3QkFBd0I7UUFDaEM7O3FFQUU2RDtRQUVyRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUExQlEsZ0JBQWdCO1FBRDVCLGlCQUFVLEVBQUU7eUNBSWlCLFdBQUk7T0FIckIsZ0JBQWdCLENBMkI1QjtJQUFELHVCQUFDO0NBQUEsQUEzQkQsSUEyQkM7QUEzQlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5cbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiO1xuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE15SHR0cEdldFNlcnZpY2Uge1xuICAgIHByaXZhdGUgc2VydmVyVXJsID0gXCJodHRwczovL2Nvbm5lY3QydGVsb3MuY29tL3RlbG9zd3MvXCI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxuXG4gICAgZ2V0RGF0YShlbmRwb2ludCkge1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIndlYnNlcnZpY2UgZW5kcG9pbnRcIit0aGlzLnNlcnZlclVybCtlbmRwb2ludCk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHRoaXMuc2VydmVyVXJsK2VuZHBvaW50KVxuICAgICAgICAgICAgLm1hcChyZXMgPT4gcmVzLnRleHQoKS5sZW5ndGggPjAgPyByZXMuanNvbigpIDogcmVzLnRleHQoKSk7XG4gICAgfVxuXG4gICAgZ2V0UmVzcG9uc2VJbmZvKCkge1xuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLnNlcnZlclVybCwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pXG4gICAgICAgICAgICAuZG8ocmVzID0+IHJlcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVSZXF1ZXN0SGVhZGVyKCkge1xuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgICAgIC8vIHNldCBoZWFkZXJzIGhlcmUgZS5nLlxuLyogICAgICAgIGhlYWRlcnMuYXBwZW5kKFwiQXV0aEtleVwiLCBcIm15LWtleVwiKTtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJBdXRoVG9rZW5cIiwgXCJteS10b2tlblwiKTtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpOyovXG5cbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgfVxufSJdfQ==