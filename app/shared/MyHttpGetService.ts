import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class MyHttpGetService {
      private serverUrl = "https://connect2telos.com/telosws-0.0.1/";

    constructor(private http: Http) { }

    getData(endpoint) {
        let headers = this.createRequestHeader();
        console.log("webservice endpoint"+this.serverUrl+endpoint);
        console.log("result from webservices are "+(this.http.get(this.serverUrl+endpoint)
            .map(res => res.text().length >0 ? res.json() : res.text())));
        return this.http.get(this.serverUrl+endpoint)
            .map(res => res.text().length >0 ? res.json() : res.text());

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