import { Injectable } from '@angular/core';
import { AuthInfoStorage } from '../../auth/auth-info-storage.service';
import { SignalrHub } from './signalr-hub';
import { ChatMessageViewModel } from '../models/chat-message.view-model';
import { NewChatMessageViewModel } from '../chat/chat-window/new-message.view-model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ChatHub extends SignalrHub {
    public onMessageReceived: Subject<ChatMessageViewModel> =
        new Subject<ChatMessageViewModel>();

    constructor(
        private authInfoStorage: AuthInfoStorage
    ) {
        super(authInfoStorage, 'chatHub', {
            onMessageReceived: (message: ChatMessageViewModel) => {
                this.onMessageReceived.next(message);
                console.log(message);
            }
        });

        console.log('chat hub ctor');
    }

    sendMessage(message: NewChatMessageViewModel) {
        this.callServerMethod('sendMessage', message);
    }
}