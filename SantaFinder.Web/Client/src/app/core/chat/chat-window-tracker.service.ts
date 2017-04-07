import { Injectable } from '@angular/core';

@Injectable()
export class ChatWindowTrackerService {
    public openedChatId: number = -1;

    constructor() { }
}
