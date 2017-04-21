import { Injectable } from '@angular/core';
import { AuthHttp } from '../auth/auth-http.service';
import { AppConfig } from '../app.config';
import { OrderPostInfo } from './view-models/change-order/order-post-info';
import { GeocodingService } from '../shared/services/geocoding.service';
import { OrderFullInfoForEditing } from './view-models/change-order/order-full-info-for-editing';

@Injectable()
export class ClientOrdersService {
    constructor(
        private authHttp: AuthHttp,
        private geocodingService: GeocodingService
    ) { }

    getOrder(id: number) {
        return this.authHttp
            .get(`${AppConfig.API_PATH}/clientOrders/${id}`)
            .map(res => res.json(), err => `My error is ${err}`);
    }

    changeOrder(id: number, changeModel: OrderFullInfoForEditing){
        return this.geocodingService.getCoordsFromAddress(changeModel.address).switchMap(location => {
            let model: OrderPostInfo = {
                childrenNames: changeModel.childrenNames,
                datetime: changeModel.datetime,
                address: {
                    line: changeModel.address,
                    location: location
                },
                presents: changeModel.presents
            };

            return this.authHttp.put(`${AppConfig.API_PATH}/clientOrders/${id}/change`, model)
                .map(res => res.status);
        });
    }

    rate(id: number, rating: number) {
        return this.authHttp
            .put(`${AppConfig.API_PATH}/clientOrders/${id}/rate?rating=${rating}`)
            .map(res => res.json(), err => `My error is ${err}`);
    }

    getClientList(count: number, page: number) {
            console.log('2');
        return this.authHttp.get(`${AppConfig.API_PATH}/clientOrders/clientlist?count=${count}&page=${page}`)
            .map(res => res.json(), err => {
                return ('error' + JSON.stringify(err));
            });
    }
}