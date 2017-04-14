import { ViewChild, OnInit, OnDestroy } from '@angular/core';

import { AuthInfoStorage } from '../../core/auth';
import { NotificationViewModel, NotificationsService, NotificationType } from '../../core/notifications/index';
import { NotificationsHub, ChatHub } from '../../core/signalr/index';
import { ChatWindowTrackerService } from '../../core/chat/chat-window-tracker.service';
import { NotificationComponent } from '../../core/notifications/notification-component/notification.component';
import { Subscription } from 'rxjs/Subscription';
import { WithNotificationsComponent } from './with-notifications.component';

export class LiveComponent extends WithNotificationsComponent implements OnInit, OnDestroy {
    private userId: string;

    constructor(
        private notificationsHub: NotificationsHub,
        private chatHub: ChatHub,
        notificationsService: NotificationsService,
        private authInfoStorage: AuthInfoStorage,
        private chatWindowTrackerService: ChatWindowTrackerService,
    ) {
        super(notificationsService);

        this.userId = authInfoStorage.authInfo.id;
        console.log('live component ctor');
    }

    ngOnInit() {
        super.ngOnInit();

        console.log('live component init');

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
        super.ngOnDestroy();

        this.notificationsHub.dispose();
        this.chatHub.dispose();
    }
}
