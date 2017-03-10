import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ng2-pagination';

import { ClientInfo } from '../../data-services/view-models/users-list/client-info';
import { ClientOrdersService } from '../../data-services/client-orders.service';
import { OrderStatus } from '../../data-services/view-models/orders-history/order-status';
import { PagedResponse } from '../../shared/models/paged-response';

@Component({
    selector: 'client-list',
    templateUrl: './client-list.html',
    styleUrls: ['./client-list.scss']
})
export class ClientListComponent implements OnInit {

    clientList: ClientInfo[] = [];
    errorMessage: string;

    paginationConfig: PaginationInstance = {
        currentPage: 1,
        itemsPerPage: 8
    };

    constructor(
        private listService: ClientOrdersService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadCurrentPage();
    }

    onPageChanged(page: number) {
         this.paginationConfig.currentPage = page;
         this.loadCurrentPage();
    }

    private loadCurrentPage() {
        this.listService.getClientList(this.paginationConfig.itemsPerPage,
                this.paginationConfig.currentPage - 1)
            .subscribe((res: PagedResponse<ClientInfo>) => {
                this.clientList = res.items;
                this.paginationConfig.totalItems = res.totalCount;
            }, err => {
                this.errorMessage = err;
            });
    };
}