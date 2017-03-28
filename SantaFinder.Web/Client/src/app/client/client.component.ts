import { Component, ViewEncapsulation } from '@angular/core';

import { Link } from '../shared/navbar/link.model';
import { NotificationsHub } from '../shared/signalr/notifications-hub';
import { ChatHub } from '../shared/signalr/chat-hub';
import { NotificationsService } from '../shared/notifications/notifications.service';
import { LiveComponent } from '../shared/base-components/live.component';
import { AuthInfoStorage } from '../auth/auth-info-storage.service';
import { ChatWindowTrackerService } from '../shared/chat/chat-window-tracker.service';

@Component({
    selector: 'client-page',
    templateUrl: './client.html',
    styleUrls: ['./client.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [NotificationsHub, ChatHub]
})
export class ClientComponent extends LiveComponent {
    navbarLinks: Link[];

    constructor(
        notificationsHub: NotificationsHub,
        chatHub: ChatHub,
        notificationsService: NotificationsService,
        authInfoStorage: AuthInfoStorage,
        chatWindowTrackerService: ChatWindowTrackerService,
    ) {
        super(notificationsHub, chatHub, notificationsService,
        authInfoStorage, chatWindowTrackerService);
    }

    ngOnInit() {
        super.ngOnInit();

        this.navbarLinks = [
            {
                name: 'Main',
                routerLink: './home'
            },
            {
                name: 'My profile',
                routerLink: './profile'
            },
            {
                name: 'Logout',
                routerLink: '/account/logout'
            }
        ];
    }
}