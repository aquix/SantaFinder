import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../account/services/account.service';

@Component({
    selector: 'main-page',
    template: require('./client-home.html')
})
export class ClientHomeComponent implements OnInit {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }

    ngOnInit() { }

    onLogoutClick() {
        this.accountService.logout();
        this.router.navigate(['/']);
    }
}