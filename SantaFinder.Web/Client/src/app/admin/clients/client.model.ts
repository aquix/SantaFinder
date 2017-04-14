import { Address, Location } from 'app/core/models';

export interface Client {
    id: string;
    name: string;
    address: Address;
    location: Location;
    email: string;
    newPassword: {
        password: string;
        confirmation: string;
    };
}
