import { OrderStatus } from './order-status';
import { Santa } from '../santa.view-model';

export interface OrderShortInfo {
    id: number;
    datetime: string;
    address: {
        city: string;
        street: string;
        house: string;
        apartment: string;
    };
    childrenNames: string;
    santaInfo: Santa;
    status: OrderStatus;
}