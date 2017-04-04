import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { SignalrHub } from './core/signalr-hub';
import { ChatMessageViewModel } from '../../shared/models/chat-message.view-model';
import { AppConfig } from '../../app.config';
import { AuthInfoStorage } from '../auth/index';
import { NewChatMessageViewModel } from '../chat/new-message.view-model';

@Injectable()
export class ChatHub extends SignalrHub {
    public onMessageReceived: Subject<ChatMessageViewModel> =
        new Subject<ChatMessageViewModel>();

    constructor(
        private authInfoStorage: AuthInfoStorage,
        private config: AppConfig,
    ) {
        super(authInfoStorage, config, 'chatHub', {
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