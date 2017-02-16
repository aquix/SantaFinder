export interface SantaProfileChangeModel {
    email: string;
    name: string;
    password: string;
    newPassword: {
        password: string,
        passwordConfirmation: string
    };
}