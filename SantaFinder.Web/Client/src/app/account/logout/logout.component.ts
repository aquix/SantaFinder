import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../services';

@Component({
    template: ''
})
export class LogoutComponent implements OnInit {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }

    ngOnInit() {
        this.accountService.logout();
        this.router.navigate(['/']);
    }
}
