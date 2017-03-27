import { Present } from './present.view-model';
import { Address } from '../../../shared/models/address.model';
import { Location } from '../../../shared/models/location';

export interface NewOrder {
    address: {
        useDefaultAddress: boolean;
        customAddress: {
            line: Address;
            location: Location;
        }
    };
    childrenNames: string;
    presents: Present[];
    datetime: string;
    comments: string;
}