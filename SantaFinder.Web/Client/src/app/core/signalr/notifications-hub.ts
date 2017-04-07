import { Injectable } from '@angular/core';

import { SignalrHub } from './core/signalr-hub';
import { AppConfig } from '../../app.config';
import { AuthInfoStorage } from '../auth/index';
import { NotificationsService, NotificationViewModel } from '../notifications';

@Injectable()
export class NotificationsHub extends SignalrHub {
    constructor(
        private authInfoStorage: AuthInfoStorage,
        private notificationsService: NotificationsService,
        private config: AppConfig,
    ) {
        super(authInfoStorage, config, 'notificationsHub', {
            notify: (notification: NotificationViewModel) => {
                this.notificationsService.notify(notification);
            }
        });
    }
}
