import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { Link } from '../shared/navbar/link.model';
import { LiveComponent } from '../shared/base-components/live.component';
import { NotificationsHub, ChatHub } from '../core/signalr/index';
import { NotificationsService } from '../core/notifications/index';
import { AuthInfoStorage } from '../core/auth/index';
import { ChatWindowTrackerService } from '../core/chat/chat-window-tracker.service';

@Component({
    selector: 'santa-page',
    templateUrl: 'santa.html',
    styleUrls: ['./santa.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [NotificationsHub, ChatHub]
})
export class SantaComponent extends LiveComponent implements OnInit {
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
                name: 'Home',
                routerLink: './home'
            },
            {
                name: 'My orders',
                routerLink: './myorders'
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
