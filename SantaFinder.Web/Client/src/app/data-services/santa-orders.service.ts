import { Injectable } from '@angular/core';

import { AuthHttp } from '../auth/auth-http.service';
import { AppConfig } from '../app.config';

@Injectable()
export class SantaOrdersService {
    constructor(
        private authHttp: AuthHttp
    ) { }

    getAll() {
        return this.authHttp.get(`${AppConfig.API_PATH}/santaOrders`).map(res => {
            return res.json();
        }, err => {
            return ('error' + JSON.stringify(err));
        });
    }

    getDetails(id: number) {
        return this.authHttp.get(`${AppConfig.API_PATH}/santaOrders/${id}`).map(res => {
            return res.json();
        }, err => {
            return ('error' + JSON.stringify(err));
        });
    }
}