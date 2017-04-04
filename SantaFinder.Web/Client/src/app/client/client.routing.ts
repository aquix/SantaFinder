import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientHomeComponent } from './home/client-home.component';
import { ClientProfileComponent } from './profile/client-profile.component';
import { ClientOrderComponent } from './order/client-order.component';
import { ClientOrderHistoryComponent } from './order-history/client-order-history.component';
import { ClientOrderInfoComponent } from './order-info/order-info.component';
import { ClientSantaInfoComponent } from './santa-info/client-santa-info.component';
import { ClientComponent } from './client.component';

const routes: Routes = [
    { path: '', component: ClientComponent, children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: ClientHomeComponent },
        { path: 'profile', component: ClientProfileComponent },
        { path: 'order', component: ClientOrderComponent },
        { path: 'orderhistory', component: ClientOrderHistoryComponent },
        { path: 'orderinfo/:id', component: ClientOrderInfoComponent },
        { path: 'santainfo/:id', component: ClientSantaInfoComponent },
    ]}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ClientRoutingModule { }