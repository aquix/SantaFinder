import { Injectable } from '@angular/core';

import { AuthHttp } from '../../auth';
import { AppConfig } from '../../../app.config';

@Injectable()
export class SantaOrdersService {
    constructor(
        private authHttp: AuthHttp,
        private config: AppConfig,
    ) { }

    getAll(filter, count, page = 0) {
        return this.authHttp.get(`${this.config.apiPath}/santaOrders?filter=${filter}&count=${count}&page=${page}`).map(res => {
            return res.json();
        }, err => {
            return ('error' + JSON.stringify(err));
        });
    }

    getDetails(id: number) {
        return this.authHttp.get(`${this.config.apiPath}/santaOrders/${id}`).map(res => {
            return res.json();
        }, err => {
            return ('error' + JSON.stringify(err));
        });
    }

    completeOrder(id: number) {
        return this.authHttp.put(`${this.config.apiPath}/santaOrders/complete/${id}`).map(res => {
            return res.json();
        }, err => {
            return ('error' + JSON.stringify(err));
        });
    }

    discardOrder(id: number) {
        return this.authHttp.put(`${this.config.apiPath}/santaOrders/discard/${id}`).map(res => {
            return res.json();
        }, err => {
            return ('error' + JSON.stringify(err));
        });
    }
}
