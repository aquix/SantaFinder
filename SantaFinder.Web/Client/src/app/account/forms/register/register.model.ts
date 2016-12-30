export interface RegisterModel {
    username: string;
    passwords: {
        password: string,
        passwordConfirmation: string
    };
    name: string;
}