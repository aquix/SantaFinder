import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SantaOrdersService } from '../../data-services/santa-orders.service';
import { SantaOrderPreview } from '../../data-services/view-models/santa-orders/santa-order-preview.model';
import { OrderFullInfo } from '../../shared/models/order-full-info.model';
import { SantaOrderStatusFilter } from './santa-order-status-filter';
import { PagedResponse } from '../../shared/models/paged-response';

@Injectable()
export class SantaOrdersListService {
    orders: BehaviorSubject<SantaOrderPreview[]> = new BehaviorSubject([]);
    orderDetails: BehaviorSubject<OrderFullInfo> = new BehaviorSubject(null);
    filter: BehaviorSubject<SantaOrderStatusFilter> = new BehaviorSubject(SantaOrderStatusFilter.All);

    selectedOrderIndex: BehaviorSubject<number> = new BehaviorSubject(-1);
    readonly itemsPerPage: number = 5;
    totalItems: BehaviorSubject<number> = new BehaviorSubject(0);

    constructor(
        private santaOrdersService: SantaOrdersService
    ) {
        this.filter.subscribe(value => {
            this.loadOrders(1);
        })
    }

    loadOrders(page: number) {
        this.santaOrdersService.getAll(this.filter.value, this.itemsPerPage, page - 1).subscribe((data: PagedResponse<SantaOrderPreview>) => {
            this.orders.next(data.items);
            this.totalItems.next(data.totalCount);
        }, err => {
            console.log(`error in getAll ${err}`);
        });
    }

    selectOrder(index: number) {
        this.selectedOrderIndex.next(index);

        if (index === -1) {
            this.orderDetails.next(null);
            return;
        }

        let selectedOrder = this.orders.value[index];
        if (!selectedOrder) {
            this.orderDetails.next(null);
            return;
        }

        this.santaOrdersService.getDetails(selectedOrder.id).subscribe((orderInfo: OrderFullInfo) => {
            this.orderDetails.next(orderInfo);
        }, err => {
            console.log(`error in orderinfo ${err}`);
        });
    }
}