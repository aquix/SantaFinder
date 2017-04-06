import { Component, ViewEncapsulation } from '@angular/core';

import { Link } from '../shared/navbar/link.model';
import { LiveComponent } from '../shared/base-components';
import { NotificationsHub, ChatHub } from '../core/signalr';
import { AuthInfoStorage } from '../core/auth';
import { NotificationsService } from '../core/notifications';
import { ChatWindowTrackerService } from '../core/chat/chat-window-tracker.service';

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