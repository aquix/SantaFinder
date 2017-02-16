import { Address } from '../../shared/models/address.model';

export interface ClientProfileChangeFormModel {
    email: string;
    name: string;
    address: Address;
    password: string;
    newPassword: {
        password: string;
        passwordConfirmation: string;
    };
}