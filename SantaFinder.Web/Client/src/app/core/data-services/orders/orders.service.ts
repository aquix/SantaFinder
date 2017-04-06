import { Injectable } from '@angular/core';

import { AuthHttp } from '../../auth/';
import { NewOrder } from '../../../client/order/new-order.model';
import { GeocodingService } from '../../helper-services/geocoding.service';
import { AppConfig } from '../../../app.config';
import { NewOrderWithLocation } from './new-order-with-location.model';

@Injectable()
export class OrdersService {
    constructor(
        private authHttp: AuthHttp,
        private geocodingService: GeocodingService,
        private config: AppConfig,
    ) { }

    createOrder(orderViewModel: NewOrder) {
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
                let data: NewOrderWithLocation = {
                    address: {
                        useDefaultAddress: order.address.useDefaultAddress,
                        customAddress: {
                            line: order.address.customAddress,
                            location: location
                        }
                    },
                    childrenNames: order.childrenNames,
                    comments: order.comments,
                    datetime: order.datetime,
                    presents: order.presents
                };

                return this.createOrderSendRequest(data);
            });
        } else {
            return this.createOrderSendRequest({
                    address: {
                        useDefaultAddress: order.address.useDefaultAddress,
                        customAddress: null
                    },
                    childrenNames: order.childrenNames,
                    comments: order.comments,
                    datetime: order.datetime,
                    presents: order.presents
                });
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

    private createOrderSendRequest(order: NewOrderWithLocation) {
        return this.authHttp.post(`${this.config.apiPath}/clientOrders`, order).map(res => {
            return res.json();
        });
    }
}