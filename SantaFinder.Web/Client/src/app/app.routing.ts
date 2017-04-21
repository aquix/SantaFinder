import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './account/services/auth.guard';
import { ClientAuthGuard } from './account/services/client-auth.guard';
import { SantaAuthGuard } from './account/services/santa-auth.guard';
import { AdminAuthGuard } from './account/services/admin-auth.guard';
import { OnlyAnonymousGuard } from './account/services/only-anonymous.guard';

import { MainComponent } from './main/main.component';
import { ClientComponent } from './client/client.component';
import { ClientHomeComponent } from './client/home/client-home.component';
import { AdminHomeComponent } from './admin/home/admin-home.component';
import { ClientOrderComponent } from './client/order/client-order.component';
import { ClientProfileComponent } from './client/profile/client-profile.component';
import { SantaProfileComponent } from './santa/profile/santa-profile.component';
import { ClientOrderHistoryComponent } from './client/order-history/client-order-history.component';
import { ClientOrderInfoComponent } from './client/order-info/order-info.component';
import { ClientSantaInfoComponent } from './client/santa-info/client-santa-info.component';
import { SantaComponent } from './santa/santa.component';
import { AdminComponent } from './admin/admin.component';
import { ClientListComponent } from './admin/clients/client-list.component';
import { SantaListComponent } from './admin/santas/santa-list.component';
import { SantaHomeComponent } from './santa/home/santa-home.component';
import { SantaMyOrdersComponent } from './santa/my-orders/santa-my-orders.component';
import { SantaOrderDetailsComponent } from './santa/order-details/santa-order-details.component';
import { AccountComponent } from './account/account.component';
import { ClientAccountComponent } from './account/client/client-account.component';
import { SantaAccountComponent } from './account/santa/santa-account.component';
import { AdminAccountComponent } from './account/admin/admin-account.compont';
import { ClientLoginFormComponent } from './account/client/login/client-login-form.component';
import { ClientRegisterFormComponent } from './account/client/register/client-register-form.component';
import { SantaLoginFormComponent } from './account/santa/login/santa-login-form.component';
import { SantaRegisterFormComponent } from './account/santa/register/santa-register-form.component';
import { AdminLoginFormComponent } from './account/admin/login/admin-login-form.component';
import { AdminRegisterFormComponent } from './account/admin/register/admin-register-form.component';
import { LogoutComponent } from './account/logout/logout.component';

const clientAccountRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: ClientLoginFormComponent },
    { path: 'register', component: ClientRegisterFormComponent }
];

const santaAccountRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: SantaLoginFormComponent },
    { path: 'register', component: SantaRegisterFormComponent }
];

const adminAccountRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: AdminLoginFormComponent },
    { path: 'register', component: AdminRegisterFormComponent }
];

const accountTypeRoutes: Routes = [
    { path: '', redirectTo: 'client', pathMatch: 'full' },
    { path: 'client', component: ClientAccountComponent, canActivate: [OnlyAnonymousGuard], children: clientAccountRoutes },
    { path: 'santa', component: SantaAccountComponent, canActivate: [OnlyAnonymousGuard], children: santaAccountRoutes },
    { path: 'admin', component: AdminAccountComponent, canActivate: [OnlyAnonymousGuard], children: adminAccountRoutes },
    { path: 'logout', component: LogoutComponent, canActivate: [] },
];

const clientRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: ClientHomeComponent },
    { path: 'profile', component: ClientProfileComponent },
    { path: 'order', component: ClientOrderComponent },
    { path: 'orderhistory', component: ClientOrderHistoryComponent },
    { path: 'orderinfo/:id', component: ClientOrderInfoComponent },
    { path: 'santainfo/:id', component: ClientSantaInfoComponent },
];

const santaRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: SantaHomeComponent },
    { path: 'orderdetails/:id', component: SantaOrderDetailsComponent },
    { path: 'myorders', component: SantaMyOrdersComponent },
    { path: 'profile', component: SantaProfileComponent }
];

const adminRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: AdminHomeComponent },
    { path: 'clientsInfo', component: ClientListComponent },
    { path: 'santasInfo', component: SantaListComponent }
];

const appRoutes: Routes = [
    { path: '', component: MainComponent, canActivate: [AuthGuard] },
    { path: 'account', component: AccountComponent, children: accountTypeRoutes },
    { path: 'client', component: ClientComponent, canActivate: [ClientAuthGuard], children: clientRoutes },
    { path: 'santa', component: SantaComponent, canActivate: [SantaAuthGuard], children: santaRoutes },
    { path: 'admin', component: AdminComponent, canActivate: [ClientAuthGuard], children: adminRoutes },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }