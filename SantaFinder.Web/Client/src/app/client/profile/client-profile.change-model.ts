export interface ClientProfileChangeModel {
    email: string;
    passwords: {
        oldPassword: string,
        password: string,
        passwordConfirmation: string
    };

    name: string;
    address: {
        city: string,
        street: string,
        house: string,
        apartment: string
    };
}