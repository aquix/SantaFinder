import { Injectable } from '@angular/core';
import { AuthHttp } from '../auth/auth-http.service';
import { AppConfig } from '../app.config';

@Injectable()
export class ChatMessagesService {
    constructor(private authHttp: AuthHttp) { }

    getMessagesFromOrder(orderId: number, startIndex: number) {
        return this.authHttp
            .get(`${AppConfig.API_PATH}/chatMessages/${orderId}?startIndex=${startIndex}&count=20`)
            .map(res => res.json());
    }
}