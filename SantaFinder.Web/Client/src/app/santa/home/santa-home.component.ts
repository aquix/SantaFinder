import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { OrdersService } from '../../data-services/orders.service';
import { OrderLocationInfo } from '../../data-services/view-models/orders-on-map/order-location-info';

@Component({
    selector: 'main-page',
    templateUrl: './santa-home.html',
    encapsulation: ViewEncapsulation.None
})
export class SantaHomeComponent implements OnInit {
    orders: OrderLocationInfo[];

    constructor(
        private ordersService: OrdersService,
    ) { }

    ngOnInit() {
        this.ordersService.getOrderLocations().subscribe(res => {
            if (res.status === 200) {
                this.orders = res.json();
            } else {
                console.log('error', res);
            }
        });
    }
}