import { Injectable } from '@angular/core';
import { NotificationViewModel } from './notification.model';

@Injectable()
export class NotificationsService {
    private callbacks: ((notification: NotificationViewModel) => void)[] = [];
    private notificationHistory: NotificationViewModel[] = [];

    constructor() { }

    notify(notification: NotificationViewModel) {
        console.log("notification", notification);
        this.notificationHistory.push(notification);
        this.callbacks.forEach(c => c(notification));
    }

    subscribe(callback: (notification: NotificationViewModel) => void) {
        this.callbacks.push(callback);
    }
}