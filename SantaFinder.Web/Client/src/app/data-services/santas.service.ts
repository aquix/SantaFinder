import { Injectable } from '@angular/core';

import { AuthHttp } from '../auth/auth-http.service';
import { AppConfig } from '../app.config';

@Injectable()
export class SantasService {

    constructor(
        private authHttp: AuthHttp
    ) { }

    getSantas(startIndex = 0, count = 0) {
        return this.authHttp.get(`${AppConfig.API_PATH}/santas`).map(res => {
            return res.json();
        }, err => {
            return ('error' + JSON.stringify(err));
        });
    }
}