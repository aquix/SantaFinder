import { Santa } from '../../core/models';
import { OrderStatus } from '../../core/enums';

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
