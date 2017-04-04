import { Address } from '../../../../shared/models/address.model';
import { OrderStatus } from '../../../../shared/enums/order-status';

export interface SantaOrderPreview {
    id: number;
    clientName: string;
    datetime: Date;
    address: Address;
    status: OrderStatus;
}