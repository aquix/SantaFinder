import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from 'app/admin/admin.routing';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from 'app/core/core.module';
import { LoginService } from './login/login.service';
import { BaseComponent } from './base/base.component';
import { SharedModule } from 'app/shared/shared.module';
import { LogoutComponent } from './login/logout.component';

@NgModule({
    imports: [
        AdminRoutingModule,
        CoreModule,
        SharedModule
    ],
    exports: [],
    declarations: [
        AdminComponent,
        LoginComponent,
        LogoutComponent,
        HomeComponent,
        BaseComponent],
    providers: [
        LoginService
    ],
})
export class AdminModule { }
