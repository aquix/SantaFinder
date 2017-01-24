import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderShortInfo } from '../../data-services/view-models/orders-history/order-short-info';
import { OrdersService } from '../../data-services/orders.service';
import { OrderStatus } from '../../data-services/view-models/orders-history/order-status';

@Component({
    selector: 'client-order-history',
    templateUrl: './client-order-history.html',
    styleUrls: ['./client-order-history.scss']
})
export class ClientOrderHistoryComponent implements OnInit {
    public orderStatus = OrderStatus;

    orders: OrderShortInfo[];
    errorMessage: string;

    constructor(
        private ordersService: OrdersService,
        private router: Router
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

    onOrderItemClick(order: OrderShortInfo) {
        this.router.navigate(['/client/orderinfo', order.id]);
    }
}