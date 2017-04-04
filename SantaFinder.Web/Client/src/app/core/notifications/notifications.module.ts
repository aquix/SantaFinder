import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownModule } from 'angular2-markdown';

import { NotificationComponent } from './notification-component/notification.component';
import { NotificationsService } from './notifications.service';

@NgModule({
    imports: [
        CommonModule,
        MarkdownModule,
    ],
    exports: [NotificationComponent],
    declarations: [NotificationComponent],
    providers: [],
})
export class NotificationsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NotificationsModule,
            providers: [
                NotificationsService
            ]
        };
    }
}
