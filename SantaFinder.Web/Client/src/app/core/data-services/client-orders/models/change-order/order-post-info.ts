import { Address } from '../../../../../shared/models/address.model';
import { PresentInfoForEditing } from './present-info-for-editing';
import { Location } from '../../../../../shared/models/location';

export interface OrderPostInfo {
    childrenNames: string;
    datetime: Date;
    address: {
        line: Address;
        location: Location;
    };
    presents: PresentInfoForEditing[];
}