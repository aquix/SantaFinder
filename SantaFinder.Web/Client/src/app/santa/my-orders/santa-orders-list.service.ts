import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { OrderFullInfo, PagedResponse } from '../../core/models';
import { SantaOrderStatusFilter } from './santa-order-status-filter';
import { SantaOrderPreview } from './santa-order-preview.model';
import { SantaOrdersService } from '../../core/data-services';

@Injectable()
export class SantaOrdersListService {
    orders: BehaviorSubject<SantaOrderPreview[]> = new BehaviorSubject([]);
    orderDetails: BehaviorSubject<OrderFullInfo> = new BehaviorSubject(null);
    filter: BehaviorSubject<SantaOrderStatusFilter> = new BehaviorSubject(SantaOrderStatusFilter.All);

    selectedOrderIndex: BehaviorSubject<number> = new BehaviorSubject(-1);
    readonly itemsPerPage = 5;
    totalItems: BehaviorSubject<number> = new BehaviorSubject(0);

    constructor(
        private santaOrdersService: SantaOrdersService
    ) {
        this.filter.subscribe(value => {
            this.loadOrders(1);
        });
    }

    loadOrders(page: number) {
        this.santaOrdersService
            .getAll(this.filter.value, this.itemsPerPage, page - 1)
            .subscribe((data: PagedResponse<SantaOrderPreview>) => {
                this.orders.next(data.items);
                this.totalItems.next(data.totalCount);
            }, console.log);
    }

    selectOrder(index: number) {
        this.selectedOrderIndex.next(index);

        if (index === -1) {
            this.orderDetails.next(null);
            return;
        }

        const selectedOrder = this.orders.value[index];
        if (!selectedOrder) {
            this.orderDetails.next(null);
            return;
        }

        this.santaOrdersService.getDetails(selectedOrder.id).subscribe((orderInfo: OrderFullInfo) => {
            this.orderDetails.next(orderInfo);
        }, console.log);
    }
}
