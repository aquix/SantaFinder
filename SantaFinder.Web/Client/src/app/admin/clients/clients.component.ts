import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationInstance } from 'ng2-pagination';

import { ClientPreview } from 'app/admin/clients/client-preview.model';
import { AdminClientsService } from 'app/admin/clients/clients.service';
import { PagedResponse } from 'app/core/models';
import { ModalWindowsService } from 'app/core/modal-windows/modal-windows.service';
import { NotificationsService, NotificationType } from 'app/core/notifications';

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
        private router: Router,
        private modalWindowsService: ModalWindowsService,
        private notificationsService: NotificationsService,
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
                this.clients = res.items;
                this.paginationConfig.totalItems = res.totalCount;
            }, console.error);
    }

    onCreateNewClientClick() {
        this.router.navigate(['/admin/clients/new']);
    }

    onDeleteClientClick(id: string) {
        this.modalWindowsService.showConfirmation({
            ok: () => {
                this.clientsService.delete(id).subscribe(res => {
                    this.notificationsService.notify({
                        content: 'Client successfully deleted',
                        type: NotificationType.info
                    });
                });
            },

            text: `Are you sure to delete client ${id}?`
        });
    }
}
