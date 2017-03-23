import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { NotificationsService } from './shared/notifications/notifications.service';
import { NotificationComponent } from './shared/notifications/notification.component';
import { NotificationViewModel } from './shared/notifications/notification.model';

@Component({
    selector: 'my-app',
    templateUrl: './app.html',
    styleUrls: ['./app.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    @ViewChild('appNotification') appNotification: NotificationComponent;
    isNotificationVisible: boolean = false;

    private notificationsStack: NotificationViewModel[] = [];
    private currentNotificationTimeout: number;

    constructor(
        private notificationsService: NotificationsService,
    ) { }

    ngOnInit() {
        this.notificationsService.subscribe(notification => {
            console.log("new notification");
            if (this.isNotificationVisible) {
                this.notificationsStack.push(notification);
            } else {
                this.showNotification(notification);
            }
        });
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

    private hideNotification() {
        console.log("show notification");

        clearTimeout(this.currentNotificationTimeout);
        this.isNotificationVisible = false;
        if (this.notificationsStack.length > 0) {
            setTimeout(() => {
                let nextNotification = this.notificationsStack.shift();
                this.showNotification(nextNotification);
            }, 1000);
        }
    }

    private showNotification(notification: NotificationViewModel) {
        console.log("show notification");
        this.isNotificationVisible = true;
        this.appNotification.data = notification;

        this.currentNotificationTimeout = window.setTimeout(() => {
            this.hideNotification();
        }, 3000);
    }
}
