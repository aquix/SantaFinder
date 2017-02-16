import { Injectable } from '@angular/core';

import { AuthHttp } from '../auth/auth-http.service';
import { AppConfig } from '../app.config';

@Injectable()
export class SantaOrdersService {
    constructor(
        private authHttp: AuthHttp
    ) { }

    getAll(filter, count, page = 0) {
        return this.authHttp.get(`${AppConfig.API_PATH}/santaOrders?filter=${filter}&count=${count}&page=${page}`).map(res => {
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

    completeOrder(id: number) {
        return this.authHttp.put(`${AppConfig.API_PATH}/santaOrders/complete/${id}`).map(res => {
            return res.json();
        }, err => {
            return ('error' + JSON.stringify(err));
        });
    }

    discardOrder(id: number) {
        return this.authHttp.put(`${AppConfig.API_PATH}/santaOrders/discard/${id}`).map(res => {
            return res.json();
        }, err => {
            return ('error' + JSON.stringify(err));
        });
    }
}