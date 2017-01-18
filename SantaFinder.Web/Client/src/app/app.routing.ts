import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './account/services/auth.guard';
import { ClientAuthGuard } from './account/services/client-auth.guard';
import { SantaAuthGuard } from './account/services/santa-auth.guard';
import { OnlyAnonymousGuard } from './account/services/only-anonymous.guard';

import { MainComponent } from './main/main.component';
import { ClientComponent } from './client/client.component';
import { ClientHomeComponent } from './client/home/client-home.component';
import { ClientOrderComponent } from './client/order/client-order.component';
import { ClientOrderHistoryComponent } from './client/order-history/client-order-history.component';
import { ClientOrderInfoComponent } from './client/order-info/order-info.component';
import { SantaComponent } from './santa/santa.component';
import { SantaHomeComponent } from './santa/home/santa-home.component';
import { AccountComponent } from './account/account.component';
import { ClientAccountComponent } from './account/client/client-account.component';
import { SantaAccountComponent } from './account/santa/santa-account.component';
import { ClientLoginFormComponent } from './account/client/login/client-login-form.component';
import { ClientRegisterFormComponent } from './account/client/register/client-register-form.component';
import { SantaLoginFormComponent } from './account/santa/login/santa-login-form.component';
import { SantaRegisterFormComponent } from './account/santa/register/santa-register-form.component';
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

const accountTypeRoutes: Routes = [
    { path: '', redirectTo: 'client', pathMatch: 'full' },
    { path: 'client', component: ClientAccountComponent, canActivate: [OnlyAnonymousGuard], children: clientAccountRoutes },
    { path: 'santa', component: SantaAccountComponent, canActivate: [OnlyAnonymousGuard], children: santaAccountRoutes },
    { path: 'logout', component: LogoutComponent, canActivate: [] },
];

const clientRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: ClientHomeComponent },
    { path: 'order', component: ClientOrderComponent },
    { path: 'orderhistory', component: ClientOrderHistoryComponent },
    { path: 'orderinfo/:id', component: ClientOrderInfoComponent },
];

const santaRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: SantaHomeComponent }
];

const appRoutes: Routes = [
    { path: '', component: MainComponent, canActivate: [AuthGuard] },
    { path: 'account', component: AccountComponent, children: accountTypeRoutes },
    { path: 'client', component: ClientComponent, canActivate: [ClientAuthGuard], children: clientRoutes },
    { path: 'santa', component: SantaComponent, canActivate: [SantaAuthGuard], children: santaRoutes },
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