import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';
import { AuthInfoStorage } from '../auth-info-storage/auth-info-storage.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(protected authInfoStorage: AuthInfoStorage, protected router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authInfoStorage.isAuthorized) {
            return true;
        }

        this.router.navigate(['/account']);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

}
