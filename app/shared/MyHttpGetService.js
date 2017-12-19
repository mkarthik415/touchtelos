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
            .map(function (res) { return res.json(); });
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
