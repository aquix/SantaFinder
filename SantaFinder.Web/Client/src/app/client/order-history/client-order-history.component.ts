import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ng2-pagination';

import { PagedResponse } from '../../core/models';
import { OrderStatus } from '../../core/enums';
import { OrderShortInfo } from './order-short-info';
import { OrdersService } from '../../core/data-services';

@Component({
    selector: 'client-order-history',
    templateUrl: './client-order-history.html',
    styleUrls: ['./client-order-history.scss']
})
export class ClientOrderHistoryComponent implements OnInit {
    OrderStatus = OrderStatus;

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
            case OrderStatus.Approved:
                return 'order-item_approved';
            case OrderStatus.New:
                return 'order-item_new';
            case OrderStatus.Completed:
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