import { Injectable } from '@angular/core';

import { AuthHttp } from '../auth/auth-http.service';
import { Order } from './view-models/new-order/order.view-model';
import { AppConfig } from '../app.config';

@Injectable()
export class OrdersService {
    constructor(
        private authHttp: AuthHttp
    ) { }

    createOrder(order: Order) {
        return this.authHttp.post(`${AppConfig.API_PATH}/orders`, order).map(res => {
            if (res.status === 200) {
                return true;
            }

            return false;
        });
    }

    getAll() {
        return this.authHttp.get(`${AppConfig.API_PATH}/orders`);
    }

    getOrderLocations() {
        return this.authHttp.get(`${AppConfig.API_PATH}/orderLocations`);
    }
}