import { Address, Location, Present } from '../../models';

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