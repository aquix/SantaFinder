import { Present } from './present.model';

export interface Order {
    address: {
        useDefaultAddress: boolean;
        customAddress: {
            city: string;
            street: string;
            house: string;
            apartment: string;
        }
    };
    childrenNames: string;
    presents: Present[];
}