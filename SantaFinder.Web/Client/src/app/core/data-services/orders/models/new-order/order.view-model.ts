import { Present } from './present.view-model';
import { Address } from '../../../../../shared/models/address.model';

export interface NewOrderViewModel {
    address: {
        useDefaultAddress: boolean;
        customAddress: Address;
    };
    childrenNames: string;
    presents: Present[];
    datetime: string;
    comments: string;
}