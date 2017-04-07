import { Present, Address } from '../../core/models';

export interface NewOrder {
    address: {
        useDefaultAddress: boolean;
        customAddress: Address;
    };
    childrenNames: string;
    presents: Present[];
    datetime: string;
    comments: string;
}
