import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { AuthGuard, ClientAuthGuard, SantaAuthGuard } from './core/auth/guards';

const appRoutes: Routes = [
    { path: '', component: MainComponent, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: './account/account.module#AccountModule' },
    { path: 'client', loadChildren: './client/client.module#ClientModule', canActivate: [ClientAuthGuard] },
    { path: 'santa', loadChildren: './santa/santa.module#SantaModule', canActivate: [SantaAuthGuard] },
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