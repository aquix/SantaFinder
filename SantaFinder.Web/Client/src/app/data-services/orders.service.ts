import { Injectable } from '@angular/core';

import { AuthHttp } from '../auth/auth-http.service';
import { Order } from './view-models/order.view-model';
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
}