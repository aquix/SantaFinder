import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { OrderFullInfo } from '../../core/models';
import { SantaOrdersListService } from './santa-orders-list.service';
import { SantaOrderPreview } from './santa-order-preview.model';
import { SantaOrdersService } from '../../core/data-services/index';

@Component({
    selector: 'santa-my-orders',
    templateUrl: 'santa-my-orders.html',
    styleUrls: ['./santa-my-orders.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [SantaOrdersListService]
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
