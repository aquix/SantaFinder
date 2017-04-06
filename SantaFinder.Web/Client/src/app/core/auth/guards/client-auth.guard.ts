import { Injectable } from '@angular/core';
import {
    CanActivate, CanActivateChild,
    Router, ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { AuthInfoStorage } from '../auth-info-storage/auth-info-storage.service';
import { UserType } from '../../../core/enums';

@Injectable()
export class ClientAuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private authInfoStorage: AuthInfoStorage
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authInfoStorage.isAuthorized) {
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