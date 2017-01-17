import { Component, OnInit } from '@angular/core';

import { OrderShortInfo } from '../../data-services/view-models/orders-history/order-short-info';
import { OrdersService } from '../../data-services/orders.service';

@Component({
    selector: 'client-order-history',
    templateUrl: './client-order-history.html'
})
export class ClientOrderHistoryComponent implements OnInit {
    orders: OrderShortInfo[];
    errorMessage: string;

    constructor(
        private ordersService: OrdersService
    ) { }

    ngOnInit() {
        this.ordersService.getAll().subscribe(res => {
            if (res.status === 200) {
                this.orders = res.json();
            } else {
                this.errorMessage = res.statusText;
            }
        });
    }
}