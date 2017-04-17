import { ViewChild, OnInit, OnDestroy } from '@angular/core';

import { AuthInfoStorage } from '../../core/auth';
import { NotificationViewModel, NotificationsService, NotificationType } from '../../core/notifications/index';
import { NotificationsHub, ChatHub } from '../../core/signalr/index';
import { ChatWindowTrackerService } from '../../core/chat/chat-window-tracker.service';
import { NotificationComponent } from '../../core/notifications/notification-component/notification.component';
import { Subscription } from 'rxjs/Subscription';

export class WithNotificationsComponent implements OnInit, OnDestroy {
    @ViewChild('appNotification') protected appNotification: NotificationComponent;
    isNotificationVisible = false;

    protected notificationsStack: NotificationViewModel[] = [];
    currentNotificationTimeout: number;

    private notificationSubscription: Subscription;

    constructor(
        protected notificationsService: NotificationsService,
    ) {

    }

    ngOnInit() {
        this.notificationSubscription = this.notificationsService.onNewNotification.subscribe(notification => {
            if (this.isNotificationVisible) {
                this.notificationsStack.push(notification);
            } else {
                this.showNotification(notification);
            }
        });
    }

    ngOnDestroy() {
        this.notificationSubscription.unsubscribe();
    }

    onNotificationCloseButtonClick() {
        this.hideNotification();
    }

    onNotificationMouseOver() {
        clearTimeout(this.currentNotificationTimeout);
    }

    onNotificationMouseLeave() {
        this.currentNotificationTimeout = window.setTimeout(() => {
            this.hideNotification();
        }, 1500);
    }

    hideNotification() {
        clearTimeout(this.currentNotificationTimeout);
        this.isNotificationVisible = false;
        if (this.notificationsStack.length > 0) {
            setTimeout(() => {
                const nextNotification = this.notificationsStack.shift();
                this.showNotification(nextNotification);
            }, 1000);
        }
    }

    showNotification(notification: NotificationViewModel) {
        this.isNotificationVisible = true;
        this.appNotification.data = notification;

        this.currentNotificationTimeout = window.setTimeout(() => {
            this.hideNotification();
        }, 3000);
    }
}
