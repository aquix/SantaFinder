import { Injectable } from '@angular/core';
import { AuthInfoStorage } from '../../auth/auth-info-storage.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationViewModel } from '../notifications/notification.model';
import { SignalrHub } from './signalr-hub';

@Injectable()
export class NotificationsHub extends SignalrHub {
    constructor(
        private authInfoStorage: AuthInfoStorage,
        private notificationsService: NotificationsService
    ) {
        super(authInfoStorage, 'notificationsHub', {
            notify: (notification: NotificationViewModel) => {
                this.notificationsService.notify(notification);
            }
        });

        console.log('notification hub ctor');
    }
}