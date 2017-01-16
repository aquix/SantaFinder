import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../account/services/account.service';

@Component({
    selector: 'main-page',
    templateUrl: './santa-home.html',
    encapsulation: ViewEncapsulation.None
})
export class SantaHomeComponent implements OnInit {
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