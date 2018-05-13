import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import {Observable} from 'rxjs';
import { Request } from '@angular/http';
// import { SearchItem } from "../../app/search/SearchItem";


interface SearchItem {
    id: string;
    INSURED_NAME: string;
    TOTAL_PREMIUM: string,
    INSURANCE_TO: string,
    AGENTNAME: string,
    INDUSTRY: string,
    DEPARTMENT: string
}

@Injectable()
export class MyHttpGetService {
      private serverUrl = "https://connect2telos.com/telosws-0.0.1/";
    //   private serverUrl = "https://connect2telos.com/telosws/";
      private results: Observable<SearchItem>;
    constructor(private http: HttpClient) { }

    getData(endpoint): Observable<any>{
        console.log("webservice endpoint"+this.serverUrl+endpoint);
        {
            console.log("Webservice response is"+this.http.get(this.serverUrl + endpoint))
            return this.http.get(this.serverUrl + endpoint);
        }
    }
}