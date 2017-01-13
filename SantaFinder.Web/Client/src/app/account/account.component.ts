import { Component, OnInit } from '@angular/core';

import { Link } from '../shared/navbar/link.model';

@Component({
    selector: 'account-page',
    templateUrl: './account.html',
    styleUrls: ['./account.scss']
})
export class AccountComponent implements OnInit {
    navbarLinks: Link[];

    constructor() { }

    ngOnInit() {
        this.navbarLinks = [
            {
                name: 'For clients',
                routerLink: '/account/client'
            },
            {
                name: 'For santas',
                routerLink: '/account/santa'
            }
        ];
    }
}