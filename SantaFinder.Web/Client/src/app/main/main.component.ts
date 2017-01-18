import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthInfoStorage } from '../auth/auth-info-storage.service';
import { UserType } from '../shared/enums/user-type';

@Component({
    templateUrl: './main.html'
})
export class MainComponent implements OnInit {
    constructor(
        private router: Router,
        private authInfoStorage: AuthInfoStorage
    ) {
        console.log('main ctor');
    }

    ngOnInit() {
        console.log('main init');
        let userType = this.authInfoStorage.authInfo.userType;
        let redirectUri = '';
        if (userType === UserType.client) {
            redirectUri = '/client';
        } else {
            redirectUri = '/santa';
        }
        this.router.navigate([redirectUri]);
    }
}