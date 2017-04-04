import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { IAuthInfo } from './auth-info';

@Injectable()
export class AuthInfoStorage {
    private _authInfo: IAuthInfo;

    constructor(
        private cookies: CookieService
    ) {
        let authInfoJson = cookies.get('auth-info');
        try {
            this._authInfo = JSON.parse(authInfoJson);
        } catch (ex) { }
    }

    get authInfo() {
        return this._authInfo;
    }

    set authInfo(value: IAuthInfo) {
        this._authInfo = value;

        // TODO save encrypted
        this.cookies.put('auth-info', JSON.stringify(value));
    }

    get isAuthorized() {
        if (this.authInfo) {
            return true;
        }

        return false;
    }
}