import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SantaOrderPreview } from '../../../data-services/view-models/santa-orders/santa-order-preview.model';
import { SantaOrderStatusFilter } from './santa-order-status-filter';

@Component({
    selector: 'santa-my-order-list',
    templateUrl: 'santa-my-order-list.html',
    styleUrls: ['./my-order-list.scss'],

})
export class SantaMyOrderListComponent implements OnInit {
    @Input() orders: SantaOrderPreview[] = [];
    @Output() orderClick: EventEmitter<number> = new EventEmitter();

    filters = [
        {
            name: 'Approved',
            value: SantaOrderStatusFilter.Approved
        },
        {
            name: 'Completed',
            value: SantaOrderStatusFilter.Completed
        },
        {
            name: 'All',
            value: SantaOrderStatusFilter.All
        }
    ];

    currentFilter: SantaOrderStatusFilter = SantaOrderStatusFilter.All;
    selectedOrderIndex: number = -1;

    constructor() { }

    ngOnInit() { }

    onOrderItemClick(id: number, index: number) {
        this.orderClick.emit(id);
        this.selectedOrderIndex = index;
    }

    onEmptyAreaClick() {
        this.onOrderItemClick(-1, -1);
    }
}