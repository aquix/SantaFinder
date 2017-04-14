import { Component, OnInit } from '@angular/core';
import { Link } from 'app/shared/navbar';
import { WithNotificationsComponent } from 'app/shared/base-components/with-notifications.component';
import { NotificationsService } from 'app/core/notifications';

@Component({
    selector: 'sf-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent extends WithNotificationsComponent implements OnInit {
    navbarLinks: Link[];

    constructor(
        notificationsService: NotificationsService
    ) {
        super(notificationsService);
    }

    ngOnInit() {
        super.ngOnInit();

        this.navbarLinks = [
            {
                name: 'Logout',
                routerLink: 'logout'
            }
        ];
    }

}
