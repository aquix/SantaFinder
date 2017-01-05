import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './account/services/auth.guard';

import { MainComponent } from './main/main.component';
import { AccountComponent } from './account/account.component';
import { ClientAccountComponent } from './account/client/client-account.component';
import { SantaAccountComponent } from './account/santa/santa-account.component';
import { ClientLoginFormComponent } from './account/client/login/client-login-form.component';
import { ClientRegisterFormComponent } from './account/client/register/client-register-form.component';
import { SantaLoginFormComponent } from './account/santa/login/santa-login-form.component';
import { SantaRegisterFormComponent } from './account/santa/register/santa-register-form.component';

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
    { path: 'client', component: ClientAccountComponent, children: clientAccountRoutes },
    { path: 'santa', component: SantaAccountComponent, children: santaAccountRoutes }
];

const appRoutes: Routes = [
    { path: '', component: MainComponent, canActivate: [AuthGuard] },
    { path: 'account', component: AccountComponent, children: accountTypeRoutes },
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