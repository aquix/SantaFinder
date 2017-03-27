import { Component, OnInit, Input } from '@angular/core';
import { ChatMessageViewModel } from '../models/chat-message.view-model';

@Component({
    selector: 'dynamic-chat-window',
    templateUrl: 'dynamic-chat-window.html',
    styleUrls: ['./dynamic-chat-window.scss']
})
export class DynamicChatComponent implements OnInit {
    @Input() messages: ChatMessageViewModel[] = [];
    @Input() orderId: number = -1;

    constructor() { }

    ngOnInit() { }
}