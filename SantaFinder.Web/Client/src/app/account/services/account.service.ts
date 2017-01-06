import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppConfig } from '../../app.config';
import { IAuthInfo } from '../../auth/auth-info';
import { AuthInfoStorage } from '../../auth/auth-info-storage.service';
import { LoginModel } from '../shared/login/login.model';
import { UserType } from '../../auth/user-type';
import { ClientRegisterModel } from '../client/register/client-register.model';
import { SantaRegisterModel } from '../santa/register/santa-register.model';

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

    register(regInfoRaw: ClientRegisterModel | SantaRegisterModel) {
        let registerBody = { };
        let registerUri = '';

        // todo register body for different types
        if (this.getRegisterModelType(regInfoRaw) === UserType.client) {
            let clientRegInfo = <ClientRegisterModel>regInfoRaw;
            registerUri = 'client/register';
            registerBody = {
                email: clientRegInfo.email,
                password: clientRegInfo.passwords.password,
                confirmPassword: clientRegInfo.passwords.passwordConfirmation,
                name: clientRegInfo.name,
                address: clientRegInfo.address
            };
        } else {
            let santaRegInfo = <SantaRegisterModel>regInfoRaw;
            registerUri = 'santa/register';
            registerBody = {
                email: santaRegInfo.email,
                password: santaRegInfo.passwords.password,
                confirmPassword: santaRegInfo.passwords.passwordConfirmation,
                name: santaRegInfo.name,
            };
        }

        return this.http.post(`${AppConfig.API_PATH}/account/${registerUri}`, registerBody)
            .map(res => res.status);
    }

    login(loginInfo: LoginModel, userType: UserType) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let body = `grant_type=password&username=${loginInfo.email}&password=${loginInfo.password}&usertype=${userType}`;

        return this.http.post(AccountService.TOKEN_PATH, body, {
            headers: headers
        }).map(res => res.json()).map(data => {
            let tokenInfo: IAuthInfo = {
                token: data['access_token'],
                tokenType: data['token_type'],
                email: data['email'],
                id: data['userId']
            };

            this.authTokenService.authInfo = tokenInfo;
            return tokenInfo;
        });
    }

    logout() {
        this.authTokenService.authInfo = null;
    }

    get isAuthorized() {
        if (this.authTokenService.authInfo) {
            return true;
        }

        return false;
    }

    private getRegisterModelType(regInfo: ClientRegisterModel | SantaRegisterModel): UserType  {
        if ((regInfo as any).address !== undefined) {
            return UserType.client;
        } else {
            return UserType.santa;
        }
    }
}