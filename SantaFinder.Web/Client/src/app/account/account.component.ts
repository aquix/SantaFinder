import { Component, OnInit } from '@angular/core';

import { Link } from '../shared/navbar/link.model';

import './account.scss';

@Component({
    selector: 'account-page',
    template: require('./account.html')
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