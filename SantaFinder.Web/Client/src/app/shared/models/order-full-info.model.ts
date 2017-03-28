import { Address } from './address.model';
import { Location } from './location';
import { OrderStatus } from '../enums/order-status';
import { Present } from '../../data-services/view-models/new-order/present.view-model';
import { ChatMessageViewModel } from './chat-message.view-model';

export interface OrderFullInfo {
    id: number;
    childrenNames: string;
    datetime: Date;
    address: Address;
    location: Location;
    status: OrderStatus;
    clientName: string;
    presents: Present[];
    chatMessages: ChatMessageViewModel[];
}