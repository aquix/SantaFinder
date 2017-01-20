import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { OrdersService } from '../../data-services/orders.service';
import { OrderLocationInfo } from '../../data-services/view-models/orders-on-map/order-location-info';
import { SelectOrderService } from './services/select-order.service';

@Component({
    selector: 'santa-home',
    templateUrl: './santa-home.html',
    styleUrls: ['./santa-home.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [SelectOrderService]
})
export class SantaHomeComponent implements OnInit {
    selectedOrderIndex: number = -1;
    orders: OrderLocationInfo[];

    constructor(
        private ordersService: OrdersService,
        private selectOrderService: SelectOrderService
    ) { }

    ngOnInit() {
        this.ordersService.getOrderLocations().subscribe(res => {
            if (res.status === 200) {
                this.orders = res.json();
            } else {
                console.log('error', res);
            }
        });

        this.selectOrderService.selectedOrder$.subscribe(id => {
            let orderIndex = this.orders.findIndex(o => o.id === id);
            this.selectedOrderIndex = orderIndex;
        });
    }

    onOrderItemClick(orderId: number, index: number) {
        this.selectedOrderIndex = index;
        this.selectOrderService.selectOrder(orderId);
    }
}