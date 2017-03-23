import { NotificationViewModel } from '../notifications/notification.model';
import { NotificationsService } from '../notifications/notifications.service';

export class NotificationsHubClient {
    constructor(
        private hub: any,
        private notificationsService: NotificationsService
    ) {
        hub.client.notify = this.notify;
        hub.client.test = this.test;
    }

    test(num: number) {
        console.log(num);
    }

    notify(notification: NotificationViewModel) {
        console.log(notification);
        this.notificationsService.notify(notification);
    }
};
