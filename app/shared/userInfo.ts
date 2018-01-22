import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class UserInfo {
    private messageSource = new BehaviorSubject<string>("default message");
    private searchResults = new BehaviorSubject<Array<any>>([]);
    private searchString = new BehaviorSubject<string>("");
    private endPt = new BehaviorSubject<string>("");

    currentMessage = this.messageSource.asObservable();
    currentSearchResults = this.searchResults.asObservable();
    currentSearchString = this.searchString.asObservable();
    currentEndPt = this.endPt.asObservable();

    constructor() {
    }

    changeMessage(message: string) {
        this.messageSource.next(message)
    }

    changeSearchResults(results: Array<any>) {
        this.searchResults.next(results)
    }

    changeSearchString(search: string) {
        this.searchString.next(search)
    }

    changeeEndPt(endPt: string) {
        this.endPt.next(endPt)
    }


}
