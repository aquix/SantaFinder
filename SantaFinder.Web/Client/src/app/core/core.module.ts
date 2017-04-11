import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { ChatModule } from './chat/chat.module';
import { NotificationsModule } from './notifications/notifications.module';

import { AppConfig } from '../app.config';

import {
    ChatMessagesService,
    ClientOrdersService,
    OrdersService,
    SantaOrdersService,
    SantasService
} from './data-services';
import { GeocodingService, LocationService } from './helper-services';
import { AuthHttp, AuthInfoStorage } from './auth';
import { ChatHub, NotificationsHub } from './signalr';
import {
    AuthGuard,
    ClientAuthGuard,
    OnlyAnonymousGuard,
    SantaAuthGuard,
    AdminAuthGuard
} from './auth/guards';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,

        NotificationsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        NotificationsModule,
    ],
    declarations: [],
    providers: [],
})
export class CoreModule {
    static forRoot(config: AppConfig): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                { provide: AppConfig, useValue: config },
                ChatMessagesService,
                ClientOrdersService,
                OrdersService,
                SantaOrdersService,
                SantasService,

                GeocodingService,
                LocationService,

                AuthHttp,
                AuthInfoStorage,

                AuthGuard,
                ClientAuthGuard,
                OnlyAnonymousGuard,
                SantaAuthGuard,
                AdminAuthGuard,

                ...ChatModule.forRoot().providers,
                ...NotificationsModule.forRoot().providers
            ]
        };
    }
}
