import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CookieModule } from 'ngx-cookie';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';
import { AccountModule } from './account/account.module';
import { ClientModule } from './client/client.module';
import { SantaModule } from './santa/santa.module';

import { AppConfig } from './app.config';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NotificationsModule } from './core/notifications/notifications.module';
import { AdminModule } from './admin/admin.module';

// Read configuration
const appConfig: AppConfig = require('./app.config.json');
appConfig.gmapsApiKey = require('../secretconfig.json').gmapsApiKey;

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule,
        AgmCoreModule.forRoot({
            apiKey: appConfig.gmapsApiKey
        }),
        CookieModule.forRoot(),

        CoreModule.forRoot(appConfig),
        AccountModule,
        ClientModule,
        SantaModule,
        AdminModule,
        NotificationsModule.forRoot()
    ],
    declarations: [
        AppComponent,
        MainComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
