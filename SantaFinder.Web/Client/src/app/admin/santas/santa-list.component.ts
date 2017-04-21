import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ng2-pagination';

import { SantaInfo } from '../../data-services/view-models/santas-list/santa-info';
import { AdminsService } from '../../data-services/admins.service';
import { OrderStatus } from '../../data-services/view-models/orders-history/order-status';
import { PagedResponse } from '../../shared/models/paged-response';

@Component({
    selector: 'santa-list',
    templateUrl: './santa-list.html',
    styleUrls: ['./santa-list.scss']
})
export class SantaListComponent implements OnInit {

    santas: SantaInfo[] = [];
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

    onClientItemClick(santa: SantaInfo) {
        this.router.navigate(['/admin/santainfo', santa.id]);
    }

    private loadCurrentPage() {
        console.log('1');
        this.listService.getSantaList(this.paginationConfig.itemsPerPage,
                this.paginationConfig.currentPage - 1)
            .subscribe((res: PagedResponse<SantaInfo>) => {
                this.santas = res.items;
                this.paginationConfig.totalItems = res.totalCount;
            }, err => {
                this.errorMessage = err;
            });
    };
}