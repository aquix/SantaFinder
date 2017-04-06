import { NgModule } from '@angular/core';

import { AccountRoutingModule } from './account.routing';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

import { AccountService } from './services';
import { ClientAccountComponent } from './client/client-account.component';
import { SantaAccountComponent } from './santa/santa-account.component';
import { LogoutComponent } from './logout/logout.component';
import { SantaLoginFormComponent } from './santa/login/santa-login-form.component';
import { SantaRegisterFormComponent } from './santa/register/santa-register-form.component';
import { ClientRegisterFormComponent } from './client/register/client-register-form.component';
import { ClientLoginFormComponent } from './client/login/client-login-form.component';
import { AccountComponent } from './account.component';
import { LoginFormComponent } from './shared/login/login-form.component';
import { PhotoUploaderComponent } from './santa/register/photo-uploader/photo-uploader.component';

@NgModule({
    imports: [
        CoreModule,
        SharedModule,
        AccountRoutingModule,
    ],
    declarations: [
        AccountComponent,
        ClientAccountComponent,
        ClientLoginFormComponent,
        ClientRegisterFormComponent,
        SantaAccountComponent,
        SantaLoginFormComponent,
        SantaRegisterFormComponent,
        LoginFormComponent,
        LogoutComponent,
        PhotoUploaderComponent,
    ],
    providers: [
        AccountService
    ],
    bootstrap: []
})
export class AccountModule { }
