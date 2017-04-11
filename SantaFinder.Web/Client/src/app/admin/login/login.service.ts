import { Injectable } from '@angular/core';
import { LoginModel } from './login.model';
import { Http, Headers } from '@angular/http';
import { AuthInfoStorage, IAuthInfo } from 'app/core/auth';
import { AppConfig } from 'app/app.config';
import { UserType } from 'app/core/enums';

@Injectable()
export class LoginService {
    protected TOKEN_PATH = `${this.config.server}/token`;

    constructor(
        private http: Http,
        private authTokenService: AuthInfoStorage,
        private config: AppConfig
    ) { }

    login(loginInfo: LoginModel) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const body = `grant_type=password&username=${loginInfo.email}&password=${loginInfo.password}&usertype=${UserType.admin}`;

        return this.http.post(this.TOKEN_PATH, body, {
            headers: headers
        }).map(res => res.json()).map(data => {
            const tokenInfo: IAuthInfo = {
                token: data['access_token'],
                tokenType: data['token_type'],
                email: data['email'],
                id: data['userId'],
                userType: <UserType>(+data['userType'])
            };

            this.authTokenService.authInfo = tokenInfo;
            return tokenInfo;
        });
    }

    logout() {
        this.authTokenService.authInfo = null;
    }
}
