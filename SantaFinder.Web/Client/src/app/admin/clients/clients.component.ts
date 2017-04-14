import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ClientPreview } from 'app/admin/clients/client-preview.model';
import { AdminClientsService } from 'app/admin/clients/clients.service';
import { PaginationInstance } from 'ng2-pagination';
import { PagedResponse } from 'app/core/models';
import { Router } from '@angular/router';

@Component({
    selector: 'sf-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
    clients: ClientPreview[] = [];

    paginationConfig: PaginationInstance = {
        currentPage: 1,
        itemsPerPage: 5
    };

    constructor(
        private clientsService: AdminClientsService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadCurrentPage();
    }

    onPageChanged(page: number) {
        this.paginationConfig.currentPage = page;
        this.loadCurrentPage();
    }

    loadCurrentPage() {
        this.clientsService.getAll(this.paginationConfig.itemsPerPage * (this.paginationConfig.currentPage - 1),
                this.paginationConfig.itemsPerPage)
            .subscribe((res: PagedResponse<ClientPreview>) => {
                console.log(res.items);
                this.clients = res.items;
                this.paginationConfig.totalItems = res.totalCount;
            }, console.error);
    }

    onCreateNewClientClick() {
        this.router.navigate(['/admin/clients/new']);
    }

    onDeleteClientClick(id: string) {

    }

}
