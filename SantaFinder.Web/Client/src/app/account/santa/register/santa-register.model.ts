export interface SantaRegisterModel {
    email: string;
    passwords: {
        password: string,
        passwordConfirmation: string
    };
    name: string;
    photo: File;
}