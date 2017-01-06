import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AccountService } from './account.service';
import { AppConfig } from '../../app.config';
import { SantaRegisterModel } from '../santa/register/santa-register.model';

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
}