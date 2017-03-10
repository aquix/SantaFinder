export interface AdminRegisterModel {
    email: string;
    passwords: {
        password: string,
        passwordConfirmation: string
    };

    name: string;
}