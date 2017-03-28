import { Component, OnInit, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { ChatMessageViewModel } from '../models/chat-message.view-model';
import { ChatHub } from '../signalr/chat-hub';
import { AuthInfoStorage } from "../../auth/auth-info-storage.service";

@Component({
    selector: 'chat-window',
    templateUrl: './chat-window.html',
    styleUrls: ['./chat-windows.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChatWindowComponent implements OnInit {
    @Input() messages: ChatMessageViewModel[] = [];
    @Input() orderId: number = -1;
    @Output() onMessageReceived: EventEmitter<void> = new EventEmitter<void>();
    private myId: string;

    constructor(
        private chatHub: ChatHub,
        private authInfoStorage: AuthInfoStorage
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

    getChatBubbleClass(message: ChatMessageViewModel) {
        if (message.senderId === this.myId) {
            return 'chat-window__bubble_me';
        } else {
            return 'chat-window__bubble_you';
        }
    }
}