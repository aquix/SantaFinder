import { Address } from './address.model';
import { Location } from './';
import { OrderStatus } from '../enums/order-status';
import { ChatMessage, Present } from './';

export interface OrderFullInfo {
    id: number;
    childrenNames: string;
    datetime: Date;
    address: Address;
    location: Location;
    status: OrderStatus;
    clientName: string;
    presents: Present[];
    chatMessages: ChatMessage[];
}