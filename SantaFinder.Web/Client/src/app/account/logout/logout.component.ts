import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../services/account.service';

@Component({
    template: ''
})
export class LogoutComponent implements OnInit {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }

    ngOnInit() {
        console.log('logout');
        this.accountService.logout();
        this.router.navigate(['/']);
    }
}