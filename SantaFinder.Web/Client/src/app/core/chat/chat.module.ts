import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { ChatWindowComponent } from './chat-window/chat-window.component';
import { DynamicChatComponent } from './dynamic-chat-window/dynamic-chat-window.component';
import { ChatWindowTrackerService } from './chat-window-tracker.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        InfiniteScrollModule,
    ],
    exports: [
        ChatWindowComponent,
        DynamicChatComponent
    ],
    declarations: [
        ChatWindowComponent,
        DynamicChatComponent
    ],
    providers: [],
})
export class ChatModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ChatModule,
            providers: [
                ChatWindowTrackerService
            ]
        };
    }
}
