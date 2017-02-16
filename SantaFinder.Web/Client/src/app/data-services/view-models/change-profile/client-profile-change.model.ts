import { Location } from '../../../shared/models/location';
import { Address } from '../../../shared/models/address.model';

export interface ClientProfileChangeModel {
    email: string;
    name: string;
    address: {
        line: Address;
        location: Location
    };
    password: string;
    newPassword: {
        password: string;
        passwordConfirmation: string;
    };
}