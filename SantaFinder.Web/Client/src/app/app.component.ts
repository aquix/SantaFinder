import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { NotificationsService } from './shared/notifications/notifications.service';
import { NotificationComponent } from './shared/notifications/notification.component';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: 'my-app',
    templateUrl: './app.html',
    styleUrls: ['./app.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    @ViewChild('appNotification') appNotification: NotificationComponent;
    isNotificationVisible: boolean = false;

    private notificationsStack: string[] = [];
    private currentNotificationTimeout: number;
    private currentNotificationText: string;

    constructor(
        private notificationsService: NotificationsService
    ) { }

    ngOnInit() {
        this.notificationsService.subscribe(html => {
            if (this.isNotificationVisible) {
                this.notificationsStack.push(html);
            } else {
                this.showNotification(html);
            }

        });
    }

    onTestNotificationButtonClick() {
        let redirectUrl = `/client/orderInfo`;
        this.notificationsService.notify(`New order successfully created.
            Click [here](${redirectUrl}) for more details`);
    }

    private showNotification(html: string) {
        this.isNotificationVisible = true;
        this.appNotification.content = html;

        this.currentNotificationTimeout = window.setTimeout(() => {
            this.hideNotification();
        }, 3000);
    }

    hideNotification() {
        clearTimeout(this.currentNotificationTimeout);
        this.isNotificationVisible = false;
        if (this.notificationsStack.length > 0) {
            setTimeout(() => {
                let nextNotification = this.notificationsStack.shift();
                this.showNotification(nextNotification);
            }, 1000);
        }
    }

    onNotificationMouseOver() {
        clearTimeout(this.currentNotificationTimeout);
    }

    onNotificationMouseLeave() {
        this.currentNotificationTimeout = window.setTimeout(() => {
            this.hideNotification();
        }, 1500);
    }
}
