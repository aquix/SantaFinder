import { Address } from '../../core/models';

export interface ClientProfileChangeModel {
    email: string;
    name: string;
    address: Address;
    password: string;
    newPassword: {
        password: string;
        passwordConfirmation: string;
    };
}
