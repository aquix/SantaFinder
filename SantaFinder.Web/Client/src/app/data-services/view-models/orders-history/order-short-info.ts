import { SantaShortInfo } from './santa-short-info';
import { OrderStatus } from './order-status';

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
    santaInfo: SantaShortInfo;
    status: OrderStatus;
}