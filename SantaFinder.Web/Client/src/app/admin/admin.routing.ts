import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminAuthGuard, OnlyAnonymousGuard } from 'app/core/auth/guards';
import { BaseComponent } from './base/base.component';
import { LogoutComponent } from './login/logout.component';
import { AdminsComponent } from './admins/admins.component';
import { ClientsComponent } from './clients/clients.component';
import { SantasComponent } from './santas/santas.component';
import { OrdersComponent } from './orders/orders.component';
import { NewClientComponent } from 'app/admin/clients/new-client/new-client.component';

const routes: Routes = [
    { path: '', component: AdminComponent, children: [
        { path: '', component: BaseComponent, canActivate: [AdminAuthGuard], children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'admins', component: AdminsComponent },
            { path: 'clients', loadChildren: './clients/clients.module#ClientsModule'},
            { path: 'santas', component: SantasComponent },
            { path: 'orders', component: OrdersComponent },
        ] },
        { path: 'login', component: LoginComponent },
        { path: 'logout', component: LogoutComponent },
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
export class AdminRoutingModule { }
