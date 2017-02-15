export interface SantaProfileChangeModel {
    email: string;
    name: string;
    password: string;
    passwords: {
        newPassword: string,
        newPasswordConfirmation: string
    };
}