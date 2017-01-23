import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SantaOrderPreview } from '../../../data-services/view-models/santa-orders/santa-order-preview.model';

@Component({
    selector: 'santa-my-order-list',
    templateUrl: 'santa-my-order-list.html',
    styleUrls: ['./my-order-list.scss']
})
export class SantaMyOrderListComponent implements OnInit {
    @Input() orders: SantaOrderPreview[];
    @Output() orderClick: EventEmitter<number> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    onOrderItemClick(id: number) {
        this.orderClick.emit(id);
    }
}