import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppConfig } from '../../app.config';
import { AuthInfoStorage } from '../../auth/auth-info-storage.service';

/**
 * Implement methods for all account roles
 */
@Injectable()
export class AccountService {
    protected static TOKEN_PATH = `${AppConfig.SERVER}/token`;

    constructor(
        protected http: Http,
        protected authTokenService: AuthInfoStorage
    ) { }

    logout() {
        this.authTokenService.authInfo = null;
    }

    get isAuthorized() {
        if (this.authTokenService.authInfo) {
            return true;
        }

        return false;
    }
}