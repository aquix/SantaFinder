import { Component, OnInit } from '@angular/core';

import { AdminClientsService } from '../clients.service';
import { NotificationsService, NotificationType } from 'app/core/notifications';

@Component({
    selector: 'sf-new-client',
    templateUrl: './new-client.component.html',
    styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {

    constructor(
        private clientsService: AdminClientsService,
        private notificationsService: NotificationsService
    ) { }

    ngOnInit() {
    }

    onSubmit(data) {
        this.clientsService.create(data).subscribe(res => {
            this.notificationsService.notify({
                content: 'Client created',
                type: NotificationType.success
            });
        }, err => {
            this.notificationsService.notify({
                content: err,
                type: NotificationType.error
            });
        });
    }
}
