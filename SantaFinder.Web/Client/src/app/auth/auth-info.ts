import { UserType } from '../shared/enums/user-type';

export interface IAuthInfo {
    token: string;
    tokenType: string;
    email: string;
    id: string;
    userType: UserType;
}