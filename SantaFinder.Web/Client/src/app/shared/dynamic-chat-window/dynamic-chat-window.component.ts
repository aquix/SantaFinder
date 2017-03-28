import { Component, OnInit, AfterViewInit, Input, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { ChatMessageViewModel } from '../models/chat-message.view-model';
import { ChatWindowComponent } from "../chat-window/chat-window.component";

@Component({
    selector: 'dynamic-chat-window',
    templateUrl: 'dynamic-chat-window.html',
    styleUrls: ['./dynamic-chat-window.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DynamicChatComponent implements OnInit, AfterViewInit {
    @Input() messages: ChatMessageViewModel[] = [];
    @Input() orderId: number = -1;
    @Input() header: string = 'Chat';
    @Input() isMaximized: false;

    @ViewChild('chatWindow') chatWindow: ChatWindowComponent;
    @ViewChild('chatWindowWrapper') chatWindowWrapper: ElementRef;

    private newMessage: string;

    constructor() { }

    ngOnInit() { }

    ngAfterViewInit() {
        setTimeout(() => {
            this.scrollToBottom();
        }, 100);
    }

    scrollToBottom() {
        try {
            this.chatWindowWrapper.nativeElement.scrollTop =
                this.chatWindowWrapper.nativeElement.scrollHeight;
        } catch (err) { }
    }

    onSendMessageButtonClick() {
        this.chatWindow.sendMessage(this.newMessage);
        this.newMessage = '';
    }

    onMessageReceived() {
        setTimeout(() => {
            this.scrollToBottom();
        }, 100);
    }
}