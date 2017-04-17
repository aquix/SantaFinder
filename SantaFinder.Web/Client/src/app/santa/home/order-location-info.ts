import { Location, Address } from '../../core/models';

export interface OrderLocationInfo {
    id: number;
    location: Location;
    address: Address;
    datetime: Date;
}
