import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ImageUploadModule } from 'angular2-image-upload';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { AuthGuard } from './account/services/auth.guard';
import { AuthHttp } from './auth/auth-http.service';
import { AuthInfoStorage } from './auth/auth-info-storage.service';
import { AccountService } from './account/services/account.service';
import { SantasService } from './data-services/santas.service';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { ClientHomeComponent } from './client/client-home.component';
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
import { SantaPreviewListComponent } from './client/santa-preview-list/santa-preview-list.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule,
        ImageUploadModule.forRoot()
    ],
    declarations: [
        NavbarComponent,
        AppComponent,
        MainComponent,
        ClientHomeComponent,
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
    bootstrap: [AppComponent]
})
export class AppModule { }