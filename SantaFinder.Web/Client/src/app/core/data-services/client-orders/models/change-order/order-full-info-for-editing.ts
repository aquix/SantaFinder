import { Address } from '../../../../../shared/models/address.model';
import { OrderStatus } from '../orders-history/order-status';
import { PresentInfoForEditing } from './present-info-for-editing';
import { Santa } from '../../../view-models/santa.view-model';
import { ChatMessageViewModel } from '../../../../../shared/models/chat-message.view-model';

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
    chatMessages: ChatMessageViewModel[];
}