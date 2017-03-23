import { Injectable } from '@angular/core';

import { AppConfig } from '../../app.config';
import { AuthInfoStorage } from '../../auth/auth-info-storage.service';
import { NotificationsHubClient } from './notifications-hub-client';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationViewModel } from "../notifications/notification.model";

@Injectable()
export class NotificationsHub {
    private hub: any;
    private client: NotificationsHubClient;
    private isConnected = false;
    private waitingActions: (() => void)[] = [];

    constructor(
        private authInfoStorage: AuthInfoStorage,
        private notificationsService: NotificationsService
    ) {
        if (window['$'] === undefined || window['$'].hubConnection === undefined) {
            throw new Error('The variable $ or the .hubConnection() function are not defined...please check the SignalR scripts have been loaded properly');
        }

        this.hub = $.connection['notificationsHub'];
        $.connection.hub.url = `${AppConfig.SERVER}/signalr`;
        $.connection.hub.qs = { 'access_token': authInfoStorage.authInfo.token };

        // this.client = new NotificationsHubClient(this.hub, this.notificationsService);
        this.hub.client.notify =(notification: NotificationViewModel) => {
            this.notificationsService.notify(notification);
        };

        $.connection.hub.start().done(() => {
            console.log('I am connected to hub');
            this.onConnected();
        });
    }

    // Server actions will be here
    serverAction(params) {
        this.doWhenConnected(() => {
            this.hub.server.hello(params);
        });
    }

    private doWhenConnected(action: () => void) {
        if (this.isConnected) {
            action();
        } else {
            this.waitingActions.push(action);
        }
    }

    private onConnected() {
        this.isConnected = true;
        for (let action of this.waitingActions) {
            setTimeout(action, 0);
        }

        this.waitingActions = [];
    }
}