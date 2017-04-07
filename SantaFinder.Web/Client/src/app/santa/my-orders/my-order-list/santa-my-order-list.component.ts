import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ng2-pagination';

import { SantaOrderStatusFilter } from '../santa-order-status-filter';
import { SantaOrdersListService } from '../santa-orders-list.service';
import { SantaOrderPreview } from '../santa-order-preview.model';

@Component({
    selector: 'santa-my-order-list',
    templateUrl: 'santa-my-order-list.html',
    styleUrls: ['./santa-my-order-list.scss'],

})
export class SantaMyOrderListComponent implements OnInit {
    orders: SantaOrderPreview[] = [];

    paginationConfig: PaginationInstance = {
        currentPage: 1,
        itemsPerPage: this.santaOrdersListService.itemsPerPage
    };

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

    readonly defaultFilter = SantaOrderStatusFilter.All;
    selectedOrderIndex: number = -1;

    constructor(
        private santaOrdersListService: SantaOrdersListService
    ) { }

    ngOnInit() {
        this.santaOrdersListService.orders.subscribe(data => {
            this.orders = data;
        });
        this.santaOrdersListService.totalItems.subscribe(data => {
            this.paginationConfig.totalItems = data;
        });
        this.santaOrdersListService.selectedOrderIndex.subscribe(data => {
            this.selectedOrderIndex = data;
        });

        this.santaOrdersListService.loadOrders(1);
    }

    onOrderItemClick(index: number) {
        this.santaOrdersListService.selectOrder(index);
    }

    onEmptyAreaClick() {
        this.onOrderItemClick(-1);
    }

    onPageChanged(page: number) {
        this.santaOrdersListService.loadOrders(page);
    }

    onFilterChanged(newFilter: SantaOrderStatusFilter) {
        this.santaOrdersListService.filter.next(newFilter);
    }
}
