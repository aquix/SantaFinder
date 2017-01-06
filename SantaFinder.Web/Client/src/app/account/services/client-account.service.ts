import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AccountService } from './account.service';
import { AppConfig } from '../../app.config';
import { ClientRegisterModel } from '../client/register/client-register.model';

@Injectable()
export class ClientAccountService extends AccountService {
    register(regInfo: ClientRegisterModel) {
        return this.http.post(`${AppConfig.API_PATH}/account/register`, {
            email: regInfo.email,
            password: regInfo.passwords.password,
            confirmPassword: regInfo.passwords.passwordConfirmation,
            name: regInfo.name
        }).map(res => res.status);
    }
}