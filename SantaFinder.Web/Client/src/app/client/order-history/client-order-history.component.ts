import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ng2-pagination';

import { OrderShortInfo } from '../../data-services/view-models/orders-history/order-short-info';
import { OrdersService } from '../../data-services/orders.service';
import { OrderStatus } from '../../data-services/view-models/orders-history/order-status';
import { PagedResponse } from '../../shared/models/paged-response';

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