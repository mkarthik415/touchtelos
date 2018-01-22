"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var UserInfo = (function () {
    function UserInfo() {
        this.messageSource = new BehaviorSubject_1.BehaviorSubject("default message");
        this.searchResults = new BehaviorSubject_1.BehaviorSubject([]);
        this.searchString = new BehaviorSubject_1.BehaviorSubject("");
        this.endPt = new BehaviorSubject_1.BehaviorSubject("");
        this.currentMessage = this.messageSource.asObservable();
        this.currentSearchResults = this.searchResults.asObservable();
        this.currentSearchString = this.searchString.asObservable();
        this.currentEndPt = this.endPt.asObservable();
    }
    UserInfo.prototype.changeMessage = function (message) {
        this.messageSource.next(message);
    };
    UserInfo.prototype.changeSearchResults = function (results) {
        this.searchResults.next(results);
    };
    UserInfo.prototype.changeSearchString = function (search) {
        this.searchString.next(search);
    };
    UserInfo.prototype.changeeEndPt = function (endPt) {
        this.endPt.next(endPt);
    };
    UserInfo = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], UserInfo);
    return UserInfo;
}());
exports.UserInfo = UserInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckluZm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VySW5mby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6Qyx3REFBcUQ7QUFJckQ7SUFXSTtRQVZRLGtCQUFhLEdBQUcsSUFBSSxpQ0FBZSxDQUFTLGlCQUFpQixDQUFDLENBQUM7UUFDL0Qsa0JBQWEsR0FBRyxJQUFJLGlDQUFlLENBQWEsRUFBRSxDQUFDLENBQUM7UUFDcEQsaUJBQVksR0FBRyxJQUFJLGlDQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7UUFDL0MsVUFBSyxHQUFHLElBQUksaUNBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztRQUVoRCxtQkFBYyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDbkQseUJBQW9CLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6RCx3QkFBbUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZELGlCQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUd6QyxDQUFDO0lBRUQsZ0NBQWEsR0FBYixVQUFjLE9BQWU7UUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUVELHNDQUFtQixHQUFuQixVQUFvQixPQUFtQjtRQUNuQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBRUQscUNBQWtCLEdBQWxCLFVBQW1CLE1BQWM7UUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDbEMsQ0FBQztJQUVELCtCQUFZLEdBQVosVUFBYSxLQUFhO1FBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzFCLENBQUM7SUE1QlEsUUFBUTtRQURwQixpQkFBVSxFQUFFOztPQUNBLFFBQVEsQ0ErQnBCO0lBQUQsZUFBQztDQUFBLEFBL0JELElBK0JDO0FBL0JZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0fSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFVzZXJJbmZvIHtcbiAgICBwcml2YXRlIG1lc3NhZ2VTb3VyY2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oXCJkZWZhdWx0IG1lc3NhZ2VcIik7XG4gICAgcHJpdmF0ZSBzZWFyY2hSZXN1bHRzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBcnJheTxhbnk+PihbXSk7XG4gICAgcHJpdmF0ZSBzZWFyY2hTdHJpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oXCJcIik7XG4gICAgcHJpdmF0ZSBlbmRQdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPihcIlwiKTtcblxuICAgIGN1cnJlbnRNZXNzYWdlID0gdGhpcy5tZXNzYWdlU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIGN1cnJlbnRTZWFyY2hSZXN1bHRzID0gdGhpcy5zZWFyY2hSZXN1bHRzLmFzT2JzZXJ2YWJsZSgpO1xuICAgIGN1cnJlbnRTZWFyY2hTdHJpbmcgPSB0aGlzLnNlYXJjaFN0cmluZy5hc09ic2VydmFibGUoKTtcbiAgICBjdXJyZW50RW5kUHQgPSB0aGlzLmVuZFB0LmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgY2hhbmdlTWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlU291cmNlLm5leHQobWVzc2FnZSlcbiAgICB9XG5cbiAgICBjaGFuZ2VTZWFyY2hSZXN1bHRzKHJlc3VsdHM6IEFycmF5PGFueT4pIHtcbiAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHRzLm5leHQocmVzdWx0cylcbiAgICB9XG5cbiAgICBjaGFuZ2VTZWFyY2hTdHJpbmcoc2VhcmNoOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hTdHJpbmcubmV4dChzZWFyY2gpXG4gICAgfVxuXG4gICAgY2hhbmdlZUVuZFB0KGVuZFB0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5lbmRQdC5uZXh0KGVuZFB0KVxuICAgIH1cblxuXG59XG4iXX0=