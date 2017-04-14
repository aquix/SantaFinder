import { NgModule } from '@angular/core';
import { Ng2PaginationModule } from 'ng2-pagination';

import { CoreModule } from 'app/core/core.module';
import { ClientsComponent } from './clients.component';
import { ClientsRoutingModule } from 'app/admin/clients/clients.routing';
import { AdminClientsService } from './clients.service';
import { EditClientComponent } from './edit-client/edit-client.component';
import { NewClientComponent } from './new-client/new-client.component';
import { ClientFormComponent } from './client-form/client-form.component';

@NgModule({
    imports: [
        ClientsRoutingModule,
        Ng2PaginationModule,
        CoreModule
    ],
    exports: [],
    declarations: [
        ClientsComponent,
        NewClientComponent,
        ClientFormComponent,
        EditClientComponent
    ],
    providers: [
        AdminClientsService
    ],
})
export class ClientsModule { }
