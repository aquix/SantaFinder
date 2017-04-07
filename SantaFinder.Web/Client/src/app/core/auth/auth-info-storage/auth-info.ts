import { UserType } from '../../../core/enums';

export interface IAuthInfo {
    token: string;
    tokenType: string;
    email: string;
    id: string;
    userType: UserType;
}
