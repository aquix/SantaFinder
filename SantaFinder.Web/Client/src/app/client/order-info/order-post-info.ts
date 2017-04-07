import { Address, Location } from '../../core/models';
import { PresentInfoForEditing } from './present-info-for-editing';

export interface OrderPostInfo {
    childrenNames: string;
    datetime: Date;
    address: {
        line: Address;
        location: Location;
    };
    presents: PresentInfoForEditing[];
}
