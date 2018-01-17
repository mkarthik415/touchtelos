"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var UserInfo = (function () {
    function UserInfo() {
        this.messageSource = new BehaviorSubject_1.BehaviorSubject("default message");
        this.currentMessage = this.messageSource.asObservable();
    }
    UserInfo.prototype.changeMessage = function (message) {
        this.messageSource.next(message);
    };
    UserInfo = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], UserInfo);
    return UserInfo;
}());
exports.UserInfo = UserInfo;
