import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminClientsService } from 'app/admin/clients/clients.service';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'app/admin/clients/client.model';
import { ClientFormComponent } from 'app/admin/clients/client-form/client-form.component';
import { NotificationsService, NotificationType } from 'app/core/notifications';

@Component({
    selector: 'sf-edit-client',
    templateUrl: './edit-client.component.html',
    styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
    private id: string;
    private client: Client;

    @ViewChild('clientForm') private clientForm: ClientFormComponent;

    constructor(
        private route: ActivatedRoute,
        private clientsService: AdminClientsService,
        private notificationsService: NotificationsService
    ) { }

    ngOnInit() {
        this.route.params
            .map(params => params['id'])
            .subscribe(id => {
                this.id = id;

                this.clientsService.get(id).subscribe((data: Client) => {
                    data.newPassword = {
                        password: '',
                        confirmation: ''
                    };
                    this.clientForm.data = data;
                });
            });
    }

    onSubmit(data: Client) {
        this.clientsService.edit(data).subscribe(() => {
            this.notificationsService.notify({
                content: 'Client updated',
                type: NotificationType.success
            });
        });
    }
}
