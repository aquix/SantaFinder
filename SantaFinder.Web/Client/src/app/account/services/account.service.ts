import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppConfig } from '../../app.config';
import { LoginModel } from '../shared/login/login.model';
import { UserType } from '../../shared/enums/user-type';
import { ClientRegisterModel } from '../client/register/client-register.model';
import { SantaRegisterModel } from '../santa/register/santa-register.model';
import { SantaProfileChangeModel } from '../../santa/profile/santa-profile-change.model';
import { AuthHttp, AuthInfoStorage } from '../../core/auth/index';
import { GeocodingService } from '../../core/helper-services';
import { ClientProfileChangeModel } from '../../core/data-services/view-models/change-profile/client-profile-change.model';
import { IAuthInfo } from '../../core/auth/auth-info-storage/auth-info';

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
            let clientRegInfo = <ClientRegisterModel>regInfoRaw;
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
            let santaRegInfo = <SantaRegisterModel>regInfoRaw;
            registerUri = 'santa/register';
            let formDataContent = {
                email: santaRegInfo.email,
                password: santaRegInfo.passwords.password,
                confirmPassword: santaRegInfo.passwords.passwordConfirmation,
                name: santaRegInfo.name,
                photo: santaRegInfo.photo
            };

            let formData = new FormData();
            for (let key in formDataContent) {
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

    changeClientProfile(changeModel: ClientProfileChangeModel) {
        return this.authHttp.post(`${this.config.apiPath}/account/client/profile`, changeModel)
            .map(res => res.status);
    }

    changeSantaProfile(changeModel: SantaProfileChangeModel) {
        return this.authHttp.post(`${this.config.apiPath}/account/santa/profile`, changeModel)
            .map(res => res.status);
    }

    login(loginInfo: LoginModel, userType: UserType) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let body = `grant_type=password&username=${loginInfo.email}&password=${loginInfo.password}&usertype=${userType}`;

        return this.http.post(this.TOKEN_PATH, body, {
            headers: headers
        }).map(res => res.json()).map(data => {
            let tokenInfo: IAuthInfo = {
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