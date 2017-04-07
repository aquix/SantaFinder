import { Address } from '../../../core/models';

export interface ClientRegisterModel {
    email: string;
    passwords: {
        password: string,
        passwordConfirmation: string
    };

    name: string;
    address: Address;
}
