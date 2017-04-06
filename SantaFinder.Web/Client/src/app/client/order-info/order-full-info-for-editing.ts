import { Address, Santa, ChatMessage } from '../../core/models';
import { OrderStatus } from '../../core/enums';
import { PresentInfoForEditing } from './present-info-for-editing';

export interface OrderFullInfoForEditing {
    id: number;
    childrenNames: string;
    datetime: Date;
    address: Address;
    location: Location;
    status: OrderStatus;
    presents: PresentInfoForEditing[];
    santaInfo: Santa;
    rating: number;
    chatMessages: ChatMessage[];
}