export interface ClientProfileChangeModel {
    email: string;
    name: string;
    address: {
        city: string,
        street: string,
        house: string,
        apartment: string
    };
    password: string;
    passwords: {
        newPassword: string,
        newPasswordConfirmation: string
    };
}