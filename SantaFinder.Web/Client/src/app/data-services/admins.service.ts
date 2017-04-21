import { Injectable } from '@angular/core';
import { AuthHttp } from '../auth/auth-http.service';
import { AppConfig } from '../app.config';
import { OrderPostInfo } from './view-models/change-order/order-post-info';
import { GeocodingService } from '../shared/services/geocoding.service';
import { OrderFullInfoForEditing } from './view-models/change-order/order-full-info-for-editing';

@Injectable()
export class AdminsService {
    constructor(
        private authHttp: AuthHttp,
        private geocodingService: GeocodingService
    ) { }

    getClientList(count: number, page: number) {
            console.log('2');
        return this.authHttp.get(`${AppConfig.API_PATH}/clientOrders/clientlist?count=${count}&page=${page}`)
            .map(res => res.json(), err => {
                return ('error' + JSON.stringify(err));
            });
    }

    getSantaList(count: number, page: number) {
            console.log('2');
        return this.authHttp.get(`${AppConfig.API_PATH}/santas/getSantaList?count=${count}&page=${page}`)
            .map(res => res.json(), err => {
                return ('error' + JSON.stringify(err));
            });
    }

}