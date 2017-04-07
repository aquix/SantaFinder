export interface ClientProfileModel {
    email: string;
    name: string;
    address: {
        city: string,
        street: string,
        house: string,
        apartment: string
    };
}
