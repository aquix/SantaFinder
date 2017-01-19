import { Location } from '../../../shared/models/location';
import { Address } from '../../../shared/models/address.model';

export interface OrderLocationInfo {
    id: number;
    location: Location;
    address: Address;
    datetime: Date;
}