import { OrderStatus } from '../../data-services/view-models/orders-history/order-status';
import { Present } from '../../data-services/view-models/new-order/present.view-model';
import { Location } from '../../shared/models/location';
import { SantaShortInfo } from '../../data-services/view-models/orders-history/santa-short-info';

export interface OrderFullInfo {
    id: number;
    clientName: string;
    childrenNames: string;
    datetime: string;
    address: {
        city: string;
        street: string;
        house: string;
        apartment: string;
    };
    location: Location;
    status: OrderStatus;
    presents: Present[];
    santaInfo: SantaShortInfo;
}