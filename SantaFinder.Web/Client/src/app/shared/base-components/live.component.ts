import { ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NotificationComponent } from '../notifications/notification.component';
import { NotificationViewModel } from '../notifications/notification.model';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationsHub } from '../signalr/notifications-hub';
import { ChatHub } from '../signalr/chat-hub';
import { NotificationType } from '../notifications/notification-type.enum';
import { AuthInfoStorage } from '../../auth/auth-info-storage.service';
import { ChatWindowTrackerService } from '../chat/chat-window-tracker.service';

export class LiveComponent implements OnInit, OnDestroy {
    @ViewChild('appNotification') protected appNotification: NotificationComponent;
    protected isNotificationVisible: boolean = false;

    protected notificationsStack: NotificationViewModel[] = [];
    protected currentNotificationTimeout: number;

    private userId: string;

    constructor(
        private notificationsHub: NotificationsHub,
        private chatHub: ChatHub,
        private notificationsService: NotificationsService,
        private authInfoStorage: AuthInfoStorage,
        private chatWindowTrackerService: ChatWindowTrackerService,
    ) {
        this.userId = authInfoStorage.authInfo.id;
    }

    ngOnInit() {
        this.notificationsService.subscribe(notification => {
            if (this.isNotificationVisible) {
                this.notificationsStack.push(notification);
            } else {
                this.showNotification(notification);
            }
        });

        this.chatHub.onMessageReceived.subscribe(m => {
            if (this.userId !== m.senderId && this.chatWindowTrackerService.openedChatId === -1) {
                this.notificationsService.notify({
                    type: NotificationType.info,
                    content: `**New message arrived**
                    ${m.body}`
                });
            }
        });
    }

    ngOnDestroy() {
        this.notificationsHub.dispose();
        this.chatHub.dispose();
    }

    protected onNotificationCloseButtonClick() {
        this.hideNotification();
    }

    protected onNotificationMouseOver() {
        clearTimeout(this.currentNotificationTimeout);
    }

    protected onNotificationMouseLeave() {
        this.currentNotificationTimeout = window.setTimeout(() => {
            this.hideNotification();
        }, 1500);
    }

    protected hideNotification() {
        clearTimeout(this.currentNotificationTimeout);
        this.isNotificationVisible = false;
        if (this.notificationsStack.length > 0) {
            setTimeout(() => {
                let nextNotification = this.notificationsStack.shift();
                this.showNotification(nextNotification);
            }, 1000);
        }
    }

    protected showNotification(notification: NotificationViewModel) {
        this.isNotificationVisible = true;
        this.appNotification.data = notification;

        this.currentNotificationTimeout = window.setTimeout(() => {
            this.hideNotification();
        }, 3000);
    }
}
