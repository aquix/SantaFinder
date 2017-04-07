import { Injectable } from '@angular/core';
import { AuthHttp } from '../../auth/';
import { OrderPostInfo } from '../../../client/order-info/order-post-info';
import { GeocodingService } from '../../helper-services/geocoding.service';
import { OrderFullInfoForEditing } from '../../../client/order-info/order-full-info-for-editing';
import { AppConfig } from '../../../app.config';

@Injectable()
export class ClientOrdersService {
    constructor(
        private authHttp: AuthHttp,
        private geocodingService: GeocodingService,
        private config: AppConfig,
    ) { }

    getOrder(id: number) {
        return this.authHttp
            .get(`${this.config.apiPath}/clientOrders/${id}`)
            .map(res => res.json(), err => `My error is ${err}`);
    }

    changeOrder(id: number, changeModel: OrderFullInfoForEditing) {
        return this.geocodingService.getCoordsFromAddress(changeModel.address).switchMap(location => {
            const model: OrderPostInfo = {
                childrenNames: changeModel.childrenNames,
                datetime: changeModel.datetime,
                address: {
                    line: changeModel.address,
                    location: location
                },
                presents: changeModel.presents
            };

            return this.authHttp.put(`${this.config.apiPath}/clientOrders/${id}/change`, model)
                .map(res => res.status);
        });
    }

    rate(id: number, rating: number) {
        return this.authHttp
            .put(`${this.config.apiPath}/clientOrders/${id}/rate?rating=${rating}`)
            .map(res => res.json(), err => `My error is ${err}`);
    }
}
