import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ng2-pagination';

import { ClientInfo } from '../../data-services/view-models/users-list/client-info';
import { AdminsService } from '../../data-services/admins.service';
import { OrderStatus } from '../../data-services/view-models/orders-history/order-status';
import { PagedResponse } from '../../shared/models/paged-response';

@Component({
    selector: 'client-list',
    templateUrl: './client-list.html',
    styleUrls: ['./client-list.scss']
})
export class ClientListComponent implements OnInit {

    clients: ClientInfo[] = [];
    errorMessage: string;

    paginationConfig: PaginationInstance = {
        currentPage: 1,
        itemsPerPage: 6
    };

    constructor(
        private listService: AdminsService,
        private router: Router
    ) { }

    ngOnInit() {
        console.log('0');
        this.loadCurrentPage();
    }

    onPageChanged(page: number) {
        this.paginationConfig.currentPage = page;
        this.loadCurrentPage();
    }

    onClientItemClick(client: ClientInfo) {
        this.router.navigate(['/admin/clientinfo', client.id]);
    }

    private loadCurrentPage() {
        console.log('1');
        this.listService.getClientList(this.paginationConfig.itemsPerPage,
            this.paginationConfig.currentPage - 1)
            .subscribe((res: PagedResponse<ClientInfo>) => {
                this.clients = res.items;
                this.paginationConfig.totalItems = res.totalCount;
            }, err => {
                this.errorMessage = err;
            });
    };
}