import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotificationViewModel, NotificationType } from '../';

@Component({
    selector: 'sf-notification',
    templateUrl: 'notification.html',
    styleUrls: ['./notification.scss']
})
export class NotificationComponent implements OnInit {
    @Input() data: NotificationViewModel = {
        type: NotificationType.info,
        content: ''
    };
    @Output() close: EventEmitter<void> = new EventEmitter<void>();
    @Output() mouseover: EventEmitter<void> = new EventEmitter<void>();
    @Output() mouseleave: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    ngOnInit() { }

    getTypeClassName() {
        return `sf-notification_${NotificationType[this.data.type]}`;
    }

    onCloseButtonClick() {
        this.close.emit();
    }

    onMouseOver() {
        this.mouseover.emit();
    }

    onMouseLeave() {
        this.mouseleave.emit();
    }
}
