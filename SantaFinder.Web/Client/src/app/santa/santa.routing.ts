import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SantaHomeComponent } from './home/santa-home.component';
import { SantaOrderDetailsComponent } from './order-details/santa-order-details.component';
import { SantaMyOrdersComponent } from './my-orders/santa-my-orders.component';
import { SantaProfileComponent } from './profile/santa-profile.component';
import { SantaComponent } from './santa.component';

const routes: Routes = [
    { path: '', component: SantaComponent, children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: SantaHomeComponent },
        { path: 'orderdetails/:id', component: SantaOrderDetailsComponent },
        { path: 'myorders', component: SantaMyOrdersComponent },
        { path: 'profile', component: SantaProfileComponent }
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
export class SantaRoutingModule { }