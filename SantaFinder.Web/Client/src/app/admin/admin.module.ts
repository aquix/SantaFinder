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
import { SantasComponent } from './santas/santas.component';
import { AdminsComponent } from './admins/admins.component';
import { OrdersComponent } from './orders/orders.component';
import { ClientsModule } from 'app/admin/clients/clients.module';
import { ModalWindowsModule } from 'app/core/modal-windows/modal-windows.module';

@NgModule({
    imports: [
        AdminRoutingModule,
        CoreModule,
        SharedModule,
        ClientsModule,

        ModalWindowsModule
    ],
    exports: [],
    declarations: [
        AdminComponent,
        LoginComponent,
        LogoutComponent,
        HomeComponent,
        BaseComponent,
        SantasComponent,
        AdminsComponent,
        OrdersComponent
    ],
    providers: [
        LoginService,
    ],
})
export class AdminModule { }
