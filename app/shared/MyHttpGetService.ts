import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class MyHttpGetService {
    private serverUrl = "https://connect2telos.com/telosws/";

    constructor(private http: Http) { }

    getData(endpoint) {
        let headers = this.createRequestHeader();
        console.log("webservice endpoint"+this.serverUrl+endpoint);
        return this.http.get(this.serverUrl+endpoint)
            .map(res => res.json());
    }

    getResponseInfo() {
        let headers = this.createRequestHeader();
        return this.http.get(this.serverUrl, { headers: headers })
            .do(res => res);
    }

    private createRequestHeader() {
        let headers = new Headers();
        // set headers here e.g.
/*        headers.append("AuthKey", "my-key");
        headers.append("AuthToken", "my-token");
        headers.append("Content-Type", "application/json");*/

        return headers;
    }
}