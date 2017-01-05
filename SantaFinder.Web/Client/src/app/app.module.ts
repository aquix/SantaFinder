import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { AuthGuard } from './account/services/auth.guard';
import { AuthHttp } from './auth/auth-http.service';
import { AuthInfoStorage } from './auth/auth-info-storage.service';
import { ClientAccountService } from './account/services/client-account.service';
import { SantaAccountService } from './account/services/santa-account.service';
import { AccountService } from './account/services/account.service';

import { MainComponent } from './main/main.component';
import { AccountComponent } from './account/account.component';
import { ClientAccountComponent } from './account/client/client-account.component';
import { SantaAccountComponent } from './account/santa/santa-account.component';
import { ClientLoginFormComponent } from './account/client/login/client-login-form.component';
import { ClientRegisterFormComponent } from './account/client/register/client-register-form.component';
import { SantaLoginFormComponent } from './account/santa/login/santa-login-form.component';
import { SantaRegisterFormComponent } from './account/santa/register/santa-register-form.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        MainComponent,
        AccountComponent,
        ClientAccountComponent,
        ClientLoginFormComponent,
        ClientRegisterFormComponent,
        SantaAccountComponent,
        SantaLoginFormComponent,
        SantaRegisterFormComponent
    ],
    providers: [
        AuthGuard,
        AuthInfoStorage,
        AuthHttp,
        AccountService,
        ClientAccountService,
        SantaAccountService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }