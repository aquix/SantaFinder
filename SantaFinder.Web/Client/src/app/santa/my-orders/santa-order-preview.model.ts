import { Address } from '../../core/models';
import { OrderStatus } from '../../core/enums';

export interface SantaOrderPreview {
    id: number;
    clientName: string;
    datetime: Date;
    address: Address;
    status: OrderStatus;
}
