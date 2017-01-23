import { Component, OnInit, Input } from '@angular/core';

import { OrderFullInfo } from '../../../shared/models/order-full-info.model';

@Component({
    selector: 'santa-my-order-details',
    templateUrl: 'santa-my-order-details.html',
    styleUrls: ['./my-order-details.scss']
})
export class SantaMyOrderDetailsComponent implements OnInit {
    @Input() order: OrderFullInfo;

    constructor() { }

    ngOnInit() { }
}