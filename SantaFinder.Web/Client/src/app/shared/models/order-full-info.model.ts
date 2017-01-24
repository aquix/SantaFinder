import { Address } from './address.model';
import { Location } from './location';
import { OrderStatus } from '../enums/order-status';

export interface OrderFullInfo {
    id: number;
    childrenNames: string;
    datetime: Date;
    address: Address;
    location: Location;
    status: OrderStatus;
    clientName: string;
}