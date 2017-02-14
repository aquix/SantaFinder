import { Address } from '../../../shared/models/address.model';
import { OrderStatus } from '../orders-history/order-status';
import { PresentInfoForEditing } from './present-info-for-editing';
import { Santa } from '../santa.view-model';

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
}