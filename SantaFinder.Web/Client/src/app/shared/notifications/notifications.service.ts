import { Injectable } from '@angular/core';

@Injectable()
export class NotificationsService {
    private callbacks: ((html: string) => void)[] = [];
    private notificationHistory: string[] = [];

    constructor() { }

    notify(text) {
        this.notificationHistory.push(text);
        this.callbacks.forEach(c => c(text));
    }

    subscribe(callback: (html: string) => void) {
        this.callbacks.push(callback);
    }
}