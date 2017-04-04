import { Injectable } from '@angular/core';

import { AuthHttp } from '../../auth';
import { AppConfig } from '../../../app.config';

@Injectable()
export class ChatMessagesService {
    constructor(
        private authHttp: AuthHttp,
        private config: AppConfig,
    ) { }

    getMessagesFromOrder(orderId: number, startIndex: number) {
        return this.authHttp
            .get(`${this.config.apiPath}/chatMessages/${orderId}?startIndex=${startIndex}&count=20`)
            .map(res => res.json());
    }
}