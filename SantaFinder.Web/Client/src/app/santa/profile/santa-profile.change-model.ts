export interface SantaProfileChangeModel {
    email: string;
    passwords: {
        oldPassword: string,
        password: string,
        passwordConfirmation: string
    };

    name: string;
}