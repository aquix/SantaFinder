import { Injectable, EventEmitter } from '@angular/core';

import { NotificationViewModel } from './notification.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationsService {
    public onNewNotification: Subject<NotificationViewModel> = new Subject<NotificationViewModel>();

    private notificationHistory: NotificationViewModel[] = [];

    constructor() { }

    notify(notification: NotificationViewModel) {
        this.notificationHistory.push(notification);
        this.onNewNotification.next(notification);
    }
}
