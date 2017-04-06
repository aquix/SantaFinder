import { Present, Address, Location } from '../../models';

export interface NewOrderWithLocation {
    address: {
        useDefaultAddress: boolean;
        customAddress: {
            line: Address;
            location: Location;
        };
    };
    childrenNames: string;
    presents: Present[];
    datetime: string;
    comments: string;
}