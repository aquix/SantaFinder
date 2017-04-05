import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ng2-pagination';

import { PagedResponse } from '../../shared/models/paged-response';
import { OrderShortInfo } from '../../core/data-services/client-orders/models/orders-history/order-short-info';
import { OrdersService } from '../../core/data-services';
import { OrderStatus } from '../../core/data-services/client-orders/models/orders-history/order-status';

@Component({
    selector: 'client-order-history',
    templateUrl: './client-order-history.html',
    styleUrls: ['./client-order-history.scss']
})
export class ClientOrderHistoryComponent implements OnInit {
    public orderStatus = OrderStatus;

    orders: OrderShortInfo[] = [];
    errorMessage: string;

    paginationConfig: PaginationInstance = {
        currentPage: 1,
        itemsPerPage: 5
    };

    constructor(
        private ordersService: OrdersService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadCurrentPage();
    }

    onOrderItemClick(order: OrderShortInfo) {
        this.router.navigate(['/client/orderinfo', order.id]);
    }

    onPageChanged(page: number) {
         this.paginationConfig.currentPage = page;
         this.loadCurrentPage();
    }

    getOrderClass(order: OrderShortInfo) {
        switch (order.status) {
            case OrderStatus.approved:
                return 'order-item_approved';
            case OrderStatus.new:
                return 'order-item_new';
            case OrderStatus.completed:
                return 'order-item_completed';

            default:
                break;
        }
    }

    private loadCurrentPage() {
        this.ordersService.getAll(this.paginationConfig.itemsPerPage,
                this.paginationConfig.currentPage - 1)
            .subscribe((res: PagedResponse<OrderShortInfo>) => {
                this.orders = res.items;
                this.paginationConfig.totalItems = res.totalCount;
            }, err => {
                this.errorMessage = err;
            });
    };
}