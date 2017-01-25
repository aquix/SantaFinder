import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { OrderFullInfo } from '../../shared/models/order-full-info.model';
import { OrderStatus } from '../../shared/enums/order-status';
import { SantaOrderPreview } from '../../data-services/view-models/santa-orders/santa-order-preview.model';
import { SantaOrdersService } from '../../data-services/santa-orders.service';

@Component({
    selector: 'santa-my-orders',
    templateUrl: 'santa-my-orders.html',
    styleUrls: ['./santa-my-orders.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SantaMyOrdersComponent implements OnInit {
    orders: SantaOrderPreview[];
    orderDetails: OrderFullInfo;

    constructor(
        private santaOrdersService: SantaOrdersService
    ) { }

    ngOnInit() {
        this.loadOrders();
    }

    onSelectOrder(id: number) {
        if (id === -1) {
            this.orderDetails = null;
            return;
        }

        this.santaOrdersService.getDetails(id).subscribe((orderInfo: OrderFullInfo) => {
            this.orderDetails = orderInfo;
        }, err => {
            console.log(`error in orderinfo ${err}`);
        });
    }

    completeOrder(id: number) {
        this.santaOrdersService.completeOrder(id).subscribe(res => {
            // TODO reload only modified order
            this.loadOrders();
        }, err => {
            console.log(err);
        });
    }

    discardOrder(id: number) {
        this.santaOrdersService.discardOrder(id).subscribe(res => {
            // TODO reload only modified order
            this.loadOrders();
            this.orderDetails = null;
        }, err => {
            console.log(err);
        });
    }

    // TODO load with pagination
    private loadOrders() {
        this.santaOrdersService.getAll().subscribe((orders: SantaOrderPreview[]) => {
            this.orders = orders;
        }, err => {
            console.log(`error in getAll ${err}`);
        });
    }
}