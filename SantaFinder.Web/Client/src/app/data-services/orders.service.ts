import { Injectable } from '@angular/core';

import { AuthHttp } from '../auth/auth-http.service';
import { NewOrderViewModel } from './view-models/new-order/order.view-model';
import { GeocodingService } from '../shared/services/geocoding.service';
import { AppConfig } from '../app.config';
import { NewOrder } from './view-models/new-order/new-order';

@Injectable()
export class OrdersService {
    constructor(
        private authHttp: AuthHttp,
        private geocodingService: GeocodingService
    ) { }

    createOrder(orderViewModel: NewOrderViewModel) {
        let order: NewOrder = {
            datetime: orderViewModel.datetime,
            presents: orderViewModel.presents,
            childrenNames: orderViewModel.childrenNames,
            address: {
                useDefaultAddress: orderViewModel.address.useDefaultAddress,
                customAddress: null
            }
        };

        if (!orderViewModel.address.useDefaultAddress) {
            return this.geocodingService.getCoordsFromAddress(orderViewModel.address.customAddress).switchMap(location => {
                order.address.customAddress = {
                    line: orderViewModel.address.customAddress,
                    location: location
                };
                return this.createOrderSendRequest(order);
            });
        } else {
            return this.createOrderSendRequest(order);
        }

    }

    getAll(count: number, page: number) {
        return this.authHttp.get(`${AppConfig.API_PATH}/clientOrders?count=${count}&page=${page}`)
            .map(res => res.json(), err => {
                return ('error' + JSON.stringify(err));
            });
    }

    getOrderLocations() {
        return this.authHttp.get(`${AppConfig.API_PATH}/orderLocations`);
    }

    getOrderFullInfo(id: number) {
        return this.authHttp.get(`${AppConfig.API_PATH}/orders/${id}`).map(res => res.json(), err => `My error is ${err}`);
    }

    takeOrder(id: number) {
        return this.authHttp.put(`${AppConfig.API_PATH}/santaOrders/take/${id}`).map(res => res.json());
    }

    private createOrderSendRequest(order: NewOrder) {
        return this.authHttp.post(`${AppConfig.API_PATH}/clientOrders`, order).map(res => {
            return res.json();
        });
    }
}