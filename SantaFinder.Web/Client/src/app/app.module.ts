import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { MainComponent } from './main/main.component';
import { AccountComponent } from './account/account.component';
import { AccountClientComponent } from './account/client/account-client.component';
import { AccountSantaComponent } from './account/santa/account-santa.component';
import { LoginFormComponent } from './account/forms/login-form.component';
import { RegisterFormComponent } from './account/forms/register-form.component';

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
        AccountClientComponent,
        AccountSantaComponent,
        LoginFormComponent,
        RegisterFormComponent
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }