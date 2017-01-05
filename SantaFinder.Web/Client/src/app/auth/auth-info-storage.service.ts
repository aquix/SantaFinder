import { Injectable } from '@angular/core';
import { IAuthInfo } from './auth-info';

@Injectable()
export class AuthInfoStorage {
    private _authInfo: IAuthInfo;

    constructor() {
        console.log('auth info ctor');
    }

    get authInfo() {
        return this._authInfo;
    }

    set authInfo(value: IAuthInfo) {
        this._authInfo = value;
    }
}