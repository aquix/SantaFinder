import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './account/services/auth.guard';

import { MainComponent } from './main/main.component';
import { AccountComponent } from './account/account.component';
import { AccountClientComponent } from './account/client/account-client.component';
import { AccountSantaComponent } from './account/santa/account-santa.component';
import { LoginFormComponent } from './account/forms/login/login-form.component';
import { RegisterFormComponent } from './account/forms/register/register-form.component';

const accountRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent }
];

const accountTypeRoutes: Routes = [
  { path: '', redirectTo: 'client', pathMatch: 'full' },
  { path: 'client', component: AccountClientComponent, children: accountRoutes },
  { path: 'santa', component: AccountSantaComponent, children: accountRoutes }
];

const appRoutes: Routes = [
  { path: '', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, children: accountTypeRoutes },
  { path: '**', component: MainComponent }
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