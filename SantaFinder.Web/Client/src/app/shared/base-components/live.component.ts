import { ViewChild, OnInit, OnDestroy } from '@angular/core';

import { AuthInfoStorage } from '../../core/auth';
import { NotificationViewModel, NotificationsService, NotificationType } from '../../core/notifications/index';
import { NotificationsHub, ChatHub } from '../../core/signalr/index';
import { ChatWindowTrackerService } from '../../core/chat/chat-window-tracker.service';
import { NotificationComponent } from '../../core/notifications/notification-component/notification.component';

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
