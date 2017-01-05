import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AccountService } from './account.service';
import { IAuthInfo } from '../../auth/auth-info';
import { AppConfig } from '../../app.config';
import { SantaRegisterModel } from '../santa/register/santa-register.model';
import { SantaLoginModel } from '../santa/login/santa-login.model';

@Injectable()
export class SantaAccountService extends AccountService {
    register(regInfo: SantaRegisterModel) {
        return this.http.post(`${AppConfig.API_PATH}/account/register`, {
            email: regInfo.email,
            password: regInfo.passwords.password,
            confirmPassword: regInfo.passwords.passwordConfirmation,
            name: regInfo.name
        }).map(res => res.status);
    }

    login(loginInfo: SantaLoginModel) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let body = `grant_type=password&username=${loginInfo.email}&password=${loginInfo.password}`;

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
}