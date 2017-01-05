export interface ClientRegisterModel {
    email: string;
    passwords: {
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