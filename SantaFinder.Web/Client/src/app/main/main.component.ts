import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserType } from '../core/enums';
import { AuthInfoStorage } from '../core/auth';

@Component({
    templateUrl: './main.html'
})
export class MainComponent implements OnInit {
    constructor(
        private router: Router,
        private authInfoStorage: AuthInfoStorage
    ) { }

    ngOnInit() {
        const userType = this.authInfoStorage.authInfo.userType;
        let redirectUri = '';
        if (userType === UserType.client) {
            redirectUri = '/client';
        } else if (userType === UserType.santa) {
            redirectUri = '/santa';
        } else {
            redirectUri = '/admin';
        }
        this.router.navigate([redirectUri]);
    }
}
