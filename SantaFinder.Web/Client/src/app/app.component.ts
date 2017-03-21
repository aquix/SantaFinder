import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { NotificationsService } from './shared/notifications/notifications.service';
import { NotificationComponent } from './shared/notifications/notification.component';
import { NotificationViewModel } from './shared/notifications/notification.model';
import { SignalR, BroadcastEventListener } from 'ng2-signalr/lib';
import 'expose-loader?jQuery!jquery';
import '../../node_modules/signalr/jquery.signalR.js';

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
        private signalR: SignalR
    ) { }

    ngOnInit() {
        this.notificationsService.subscribe(notification => {
            if (this.isNotificationVisible) {
                this.notificationsStack.push(notification);
            } else {
                this.showNotification(notification);
            }
        });

        console.log('signalr connection...');
        this.signalR.connect().then((c) => {
            console.log('signalr connected...');

            let onNotificationReceived$ = c.listenFor('notify');
            onNotificationReceived$.subscribe((notification: NotificationViewModel) => {
                this.notificationsService.notify(notification);
            });
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
        this.isNotificationVisible = true;
        this.appNotification.data = notification;

        this.currentNotificationTimeout = window.setTimeout(() => {
            this.hideNotification();
        }, 3000);
    }
}
