import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';

import { ChatMessage } from '../../../core/models';
import { ChatHub } from '../../../core/signalr';
import { AuthInfoStorage } from '../../../core/auth';

@Component({
    selector: 'chat-window',
    templateUrl: './chat-window.html',
    styleUrls: ['./chat-windows.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatWindowComponent implements OnInit {
    @Input() messages: ChatMessage[] = [];
    @Input() orderId: number = -1;
    @Output() onMessageReceived: EventEmitter<void> = new EventEmitter<void>();
    private myId: string;

    constructor(
        private chatHub: ChatHub,
        private authInfoStorage: AuthInfoStorage,
    ) {
        this.myId = authInfoStorage.authInfo.id;
    }

    ngOnInit() {
        this.chatHub.onMessageReceived.subscribe(message => {
            this.messages.push(message);
            this.onMessageReceived.emit();
        });
    }

    sendMessage(newMessage: string) {
        this.chatHub.sendMessage({
            body: newMessage,
            orderId: this.orderId
        });
    }

    getChatBubbleClass(message: ChatMessage) {
        if (message.senderId === this.myId) {
            return 'chat-window__bubble_me';
        } else {
            return 'chat-window__bubble_you';
        }
    }
}