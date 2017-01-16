import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { RatingModule } from 'ng2-rating';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { AuthGuard } from './account/services/auth.guard';
import { AuthHttp } from './auth/auth-http.service';
import { AuthInfoStorage } from './auth/auth-info-storage.service';
import { AccountService } from './account/services/account.service';
import { SantasService } from './data-services/santas.service';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { ClientComponent } from './client/client.component';
import { ClientHomeComponent } from './client/home/client-home.component';
import { ClientOrderComponent } from './client/order/client-order.component';
import { ClientOrderHistoryComponent } from './client/order-history/client-order-history.component';
import { SantaHomeComponent } from './santa/santa-home.component';
import { AccountComponent } from './account/account.component';
import { ClientAccountComponent } from './account/client/client-account.component';
import { SantaAccountComponent } from './account/santa/santa-account.component';
import { ClientLoginFormComponent } from './account/client/login/client-login-form.component';
import { ClientRegisterFormComponent } from './account/client/register/client-register-form.component';
import { SantaLoginFormComponent } from './account/santa/login/santa-login-form.component';
import { SantaRegisterFormComponent } from './account/santa/register/santa-register-form.component';
import { LoginFormComponent } from './account/shared/login/login-form.component';
import { LogoutComponent } from './account/logout/logout.component';
import { PhotoUploaderComponent } from './account/santa/register/photo-uploader/photo-uploader.component';
import { SantaPreviewListComponent } from './client/home/santa-preview-list/santa-preview-list.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule,
        RatingModule,
        Ng2DatetimePickerModule
    ],
    declarations: [
        NavbarComponent,
        AppComponent,
        MainComponent,
        ClientComponent,
        ClientHomeComponent,
        ClientOrderComponent,
        ClientOrderHistoryComponent,
        SantaHomeComponent,
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
        SantaPreviewListComponent
    ],
    providers: [
        CookieService,
        AuthGuard,
        AuthInfoStorage,
        AuthHttp,
        AccountService,
        SantasService
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }