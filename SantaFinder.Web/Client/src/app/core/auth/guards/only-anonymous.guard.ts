import { Injectable } from '@angular/core';
import {
    CanActivate, CanActivateChild,
    Router, ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { AuthInfoStorage } from '../auth-info-storage/auth-info-storage.service';

@Injectable()
export class OnlyAnonymousGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private authInfoStorage: AuthInfoStorage
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authInfoStorage.isAuthorized) {
            return true;
        } else {
            this.router.navigate(['/any_incorrect_url_that_redirects_to_main']);
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }
}
