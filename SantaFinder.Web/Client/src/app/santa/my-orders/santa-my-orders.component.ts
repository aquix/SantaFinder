import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { OrderFullInfo } from '../../shared/models/order-full-info.model';
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
        this.santaOrdersService.getAll().subscribe((orders: SantaOrderPreview[]) => {
            this.orders = orders;
        }, err => {
            console.log(`error in getAll ${err}`);
        });
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

    onEmptyAreaClick() {
        this.orderDetails = null;
        console.log('empty click');
    }
}