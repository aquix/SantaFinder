import { Component, OnInit } from '@angular/core';

import { Link } from '../shared/navbar/link.model';

import './client.scss';

@Component({
    selector: 'client-page',
    template: require('./client.html')
})
export class ClientComponent implements OnInit {
    navbarLinks: Link[];

    constructor() { }

    ngOnInit() {
        this.navbarLinks = [
            {
                name: 'My profile',
                routerLink: './profile'
            },
            {
                name: 'Logout',
                routerLink: '/account/logout'
            }
        ];
    }
}