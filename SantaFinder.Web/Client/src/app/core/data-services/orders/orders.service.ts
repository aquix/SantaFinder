import { Injectable } from '@angular/core';

import { AuthHttp } from '../../auth/';
import { NewOrderViewModel } from './models/new-order/order.view-model';
import { GeocodingService } from '../../helper-services/geocoding.service';
import { NewOrder } from './models/new-order/new-order';
import { AppConfig } from '../../../app.config';

@Injectable()
export class OrdersService {
    constructor(
        private authHttp: AuthHttp,
        private geocodingService: GeocodingService,
        private config: AppConfig,
    ) { }

    createOrder(orderViewModel: NewOrderViewModel) {
        let order: NewOrder = {
            datetime: orderViewModel.datetime,
            presents: orderViewModel.presents,
            childrenNames: orderViewModel.childrenNames,
            address: {
                useDefaultAddress: orderViewModel.address.useDefaultAddress,
                customAddress: null
            },
            comments: orderViewModel.comments
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
        return this.authHttp.get(`${this.config.apiPath}/clientOrders?count=${count}&page=${page}`)
            .map(res => res.json(), err => {
                return ('error' + JSON.stringify(err));
            });
    }

    getOrderLocations() {
        return this.authHttp.get(`${this.config.apiPath}/orderLocations`);
    }

    getOrderFullInfo(id: number) {
        return this.authHttp.get(`${this.config.apiPath}/orders/${id}`).map(res => res.json());
    }

    takeOrder(id: number) {
        return this.authHttp.put(`${this.config.apiPath}/santaOrders/take/${id}`).map(res => res.json());
    }

    private createOrderSendRequest(order: NewOrder) {
        return this.authHttp.post(`${this.config.apiPath}/clientOrders`, order).map(res => {
            return res.json();
        });
    }
}