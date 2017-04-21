import { Address } from '../../../shared/models/address.model';

export interface ClientRegisterModel {
    email: string;
    passwords: {
        password: string,
        passwordConfirmation: string
    };

    name: string;
    //address: Address;
}