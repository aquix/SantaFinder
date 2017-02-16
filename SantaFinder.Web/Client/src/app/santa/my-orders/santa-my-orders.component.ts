import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { OrderFullInfo } from '../../shared/models/order-full-info.model';
import { SantaOrderPreview } from '../../data-services/view-models/santa-orders/santa-order-preview.model';
import { SantaOrdersService } from '../../data-services/santa-orders.service';
import { SantaOrdersListService } from './santa-orders-list.service';

@Component({
    selector: 'santa-my-orders',
    templateUrl: 'santa-my-orders.html',
    styleUrls: ['./santa-my-orders.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [ SantaOrdersListService ]
})
export class SantaMyOrdersComponent implements OnInit {
    orders: SantaOrderPreview[];
    orderDetails: OrderFullInfo;

    constructor(
        private santaOrdersService: SantaOrdersService
    ) { }

    ngOnInit() {
    }
}