import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { AuthInfoStorage } from './auth-info-storage.service';

@Injectable()
export class AuthHttp {
    constructor(
        private authInfoStorage: AuthInfoStorage,
        private http: Http
    ) {}

    get(url: string, options: RequestOptionsArgs = {}) {
        this.appendAuthHeaders(options);
        return this.http.get(url, options);
    }

    post(url: string, body: any = {}, options: RequestOptionsArgs = {}) {
        this.appendAuthHeaders(options);
        return this.http.post(url, body, options);
    }

    put(url: string, body: any = {}, options: RequestOptionsArgs = {}) {
        this.appendAuthHeaders(options);
        return this.http.put(url, body, options);
    }

    private appendAuthHeaders(options: RequestOptionsArgs) {
        if (!options.headers) {
            options.headers = new Headers();
        }

        // options.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        options.headers.append('Authorization', `Bearer ${this.authInfoStorage.authInfo.token}`);
    }
}