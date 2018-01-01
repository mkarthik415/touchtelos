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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VySW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyx3REFBdUQ7QUFJdkQ7SUFJSTtRQUhRLGtCQUFhLEdBQUcsSUFBSSxpQ0FBZSxDQUFTLGlCQUFpQixDQUFDLENBQUM7UUFDdkUsbUJBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBRW5DLENBQUM7SUFFakIsZ0NBQWEsR0FBYixVQUFjLE9BQWU7UUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDbEMsQ0FBQztJQVJNLFFBQVE7UUFEcEIsaUJBQVUsRUFBRTs7T0FDQSxRQUFRLENBVXBCO0lBQUQsZUFBQztDQUFBLEFBVkQsSUFVQztBQVZZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VySW5mbyB7XG4gICAgcHJpdmF0ZSBtZXNzYWdlU291cmNlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+KFwiZGVmYXVsdCBtZXNzYWdlXCIpO1xuICAgIGN1cnJlbnRNZXNzYWdlID0gdGhpcy5tZXNzYWdlU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIGNoYW5nZU1lc3NhZ2UobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZVNvdXJjZS5uZXh0KG1lc3NhZ2UpXG4gICAgICB9XG5cbn1cbiJdfQ==