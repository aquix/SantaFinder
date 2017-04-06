import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CookieService } from 'angular2-cookie/services/cookies.service';
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

// Read configuration
const appConfig: AppConfig = require('json-loader!./app.config.json');
appConfig.gmapsApiKey = require('json-loader!../secretconfig.json').gmapsApiKey;

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpModule,
        AgmCoreModule.forRoot({
            apiKey: appConfig.gmapsApiKey
        }),

        CoreModule.forRoot(appConfig),
        AccountModule,
        ClientModule,
        SantaModule,
        NotificationsModule.forRoot()
    ],
    declarations: [
        AppComponent,
        MainComponent,
    ],
    providers: [
        CookieService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }