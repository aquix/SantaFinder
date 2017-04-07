import { Component, OnInit, AfterViewInit,
    OnDestroy, Input, ViewChild,
    ViewEncapsulation, ElementRef
} from '@angular/core';

import { ChatMessage } from '../../../core/models';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { ChatWindowTrackerService } from '../chat-window-tracker.service';
import { ChatMessagesService } from '../../../core/data-services';

@Component({
    selector: 'dynamic-chat-window',
    templateUrl: 'dynamic-chat-window.html',
    styleUrls: ['./dynamic-chat-window.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DynamicChatComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() messages: ChatMessage[] = [];
    @Input() orderId: number = -1;
    @Input() header = 'Chat';
    @Input() isMaximized: boolean;

    @ViewChild('chatWindow') chatWindow: ChatWindowComponent;
    @ViewChild('chatWindowWrapper') chatWindowWrapper: ElementRef;

    newMessage: string;

    constructor(
        private chatWindowTrackerService: ChatWindowTrackerService,
        private chatMessagesService: ChatMessagesService
    ) { }

    ngOnInit() {
        if (this.isMaximized) {
            this.chatWindowTrackerService.openedChatId = this.orderId;
        } else {
            this.chatWindowTrackerService.openedChatId = -1;
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.scrollToBottom();
        }, 300);
    }

    ngOnDestroy() {
        this.chatWindowTrackerService.openedChatId = -1;
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

    toggleChatVisibility() {
        this.isMaximized = !this.isMaximized;
        if (this.isMaximized) {
            this.chatWindowTrackerService.openedChatId = this.orderId;
        } else {
            this.chatWindowTrackerService.openedChatId = -1;
        }
    }

    onChatTopReached() {
        console.log('chat scrolled');
        this.chatMessagesService
            .getMessagesFromOrder(this.orderId, this.messages.length)
            .subscribe((res: ChatMessage[]) => {
                this.messages = res.concat(this.messages);
            });
    }
}
