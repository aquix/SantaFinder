import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientAccountComponent } from './client/client-account.component';
import { SantaAccountComponent } from './santa/santa-account.component';
import { LogoutComponent } from './logout/logout.component';
import { SantaLoginFormComponent } from './santa/login/santa-login-form.component';
import { SantaRegisterFormComponent } from './santa/register/santa-register-form.component';
import { ClientRegisterFormComponent } from './client/register/client-register-form.component';
import { ClientLoginFormComponent } from './client/login/client-login-form.component';
import { OnlyAnonymousGuard } from '../core/auth/guards';
import { AccountComponent } from './account.component';

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

const routes: Routes = [
    { path: '', component: AccountComponent, children: [
        { path: '', redirectTo: 'client', pathMatch: 'full' },
        { path: 'client', component: ClientAccountComponent, canActivate: [OnlyAnonymousGuard], children: clientAccountRoutes },
        { path: 'santa', component: SantaAccountComponent, canActivate: [OnlyAnonymousGuard], children: santaAccountRoutes },
        { path: 'logout', component: LogoutComponent, canActivate: [] },
    ] }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AccountRoutingModule { }