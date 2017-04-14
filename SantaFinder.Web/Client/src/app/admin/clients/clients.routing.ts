import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from './clients.component';
import { NewClientComponent } from './new-client/new-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';

const routes: Routes = [
    { path: '', component: ClientsComponent },
    { path: 'new', component: NewClientComponent},
    { path: ':id', component: EditClientComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ClientsRoutingModule { }
