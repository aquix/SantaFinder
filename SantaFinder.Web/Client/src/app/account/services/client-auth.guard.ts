import { Injectable } from '@angular/core';
import {
    CanActivate, CanActivateChild,
    Router, ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { AccountService } from './account.service';
import { AuthInfoStorage } from '../../auth/auth-info-storage.service';
import { UserType } from '../../shared/enums/user-type';

@Injectable()
export class ClientAuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private authService: AccountService,
        private router: Router,
        private authInfoStorage: AuthInfoStorage
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isAuthorized) {
            if (this.authInfoStorage.authInfo.userType === UserType.client) {
                return true;
            } else {
                this.router.navigate(['/santa']);
            }
        } else {
            this.router.navigate(['/account/client']);
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}