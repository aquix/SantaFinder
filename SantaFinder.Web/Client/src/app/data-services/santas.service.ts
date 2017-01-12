import { Injectable } from '@angular/core';

import { AuthHttp } from '../auth/auth-http.service';
import { SantaViewModel } from './view-models/santa.view-model';
import { AppConfig } from '../app.config';

@Injectable()
export class SantasService {

    constructor(
        private authHttp: AuthHttp
    ) { }

    getSantas(startIndex = 0, count = 0): SantaViewModel[] {
        return [
            {
                name: "Santa John",
                numberOfOrders: 123,
                photoUrl: `${AppConfig.SERVER}/test.png`,
                rating: 4.5
            },
            {
                name: "Santa Bill",
                numberOfOrders: 342,
                photoUrl: `${AppConfig.SERVER}/test.png`,
                rating: 4.1
            },
            {
                name: "Santa Claus",
                numberOfOrders: 786,
                photoUrl: `${AppConfig.SERVER}/test.png`,
                rating: 2.5
            }
        ];
    }
}