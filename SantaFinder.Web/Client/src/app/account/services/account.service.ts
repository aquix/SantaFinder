import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppConfig } from '../../app.config';
import { LoginModel } from '../shared/login/login.model';
import { UserType } from '../../core/enums';
import { ClientRegisterModel } from '../client/register/client-register.model';
import { SantaRegisterModel } from '../santa/register/santa-register.model';
import { AuthHttp, AuthInfoStorage, IAuthInfo } from '../../core/auth';
import { GeocodingService } from '../../core/helper-services';
import { SantaProfileChangeModel } from '../../santa/profile/santa-profile-change.model';
import { ClientProfileChangeModel } from '../../client/profile/client-profile-change.model';

/**
 * Implement methods for all account roles
 */
@Injectable()
export class AccountService {
    protected TOKEN_PATH = `${this.config.server}/token`;

    constructor(
        private http: Http,
        private authHttp: AuthHttp,
        private authTokenService: AuthInfoStorage,
        private geocodingService: GeocodingService,
        private config: AppConfig
    ) { }

    register(regInfoRaw: ClientRegisterModel | SantaRegisterModel ) {
        let registerBody = { };
        let registerUri = '';

        // todo register body for different types
        if (this.getRegisterModelType(regInfoRaw) === UserType.client) {
            const clientRegInfo = <ClientRegisterModel>regInfoRaw;
            registerUri = 'client/register';
            return this.geocodingService.getCoordsFromAddress(clientRegInfo.address).switchMap(location => {
                registerBody = {
                    email: clientRegInfo.email,
                    password: clientRegInfo.passwords.password,
                    confirmPassword: clientRegInfo.passwords.passwordConfirmation,
                    name: clientRegInfo.name,
                    address: clientRegInfo.address,
                    location: location
                };

                return this.http.post(`${this.config.apiPath}/account/${registerUri}`, registerBody)
                    .map(res => res.status);
            });
        } else {
            const santaRegInfo = <SantaRegisterModel>regInfoRaw;
            registerUri = 'santa/register';
            const formDataContent = {
                email: santaRegInfo.email,
                password: santaRegInfo.passwords.password,
                confirmPassword: santaRegInfo.passwords.passwordConfirmation,
                name: santaRegInfo.name,
                photo: santaRegInfo.photo
            };

            const formData = new FormData();
            for (const key in formDataContent) {
                formData.append(key, formDataContent[key]);
            }
            registerBody = formData;

            return this.http.post(`${this.config.apiPath}/account/${registerUri}`, registerBody)
                .map(res => res.status);
        }
    }

    getClientData() {
        return this.authHttp.get(`${this.config.apiPath}/account/client/profile`)
            .map(res => res.json());
    }

    getSantaData() {
        return this.authHttp.get(`${this.config.apiPath}/account/santa/profile`)
            .map(res => res.json());
    }

    changeClientProfile(model: ClientProfileChangeModel) {
        return this.geocodingService.getCoordsFromAddress(model.address).switchMap(location => {
            const data = {
                email: model.email,
                name: model.name,
                address: {
                    line: model.address,
                    location: location
                },
                password: model.password,
                newPassword: model.newPassword
            };
            return this.authHttp.post(`${this.config.apiPath}/account/client/profile`, data)
                .map(res => res.status);
        });

    }

    changeSantaProfile(changeModel: SantaProfileChangeModel) {
        return this.authHttp.post(`${this.config.apiPath}/account/santa/profile`, changeModel)
            .map(res => res.status);
    }

    login(loginInfo: LoginModel, userType: UserType) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const body = `grant_type=password&username=${loginInfo.email}&password=${loginInfo.password}&usertype=${userType}`;

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

    private getRegisterModelType(regInfo: ClientRegisterModel | SantaRegisterModel): UserType  {
        if ((regInfo as any).address !== undefined) {
            return UserType.client;
        } else {
            return UserType.santa;
        }
    }
}
