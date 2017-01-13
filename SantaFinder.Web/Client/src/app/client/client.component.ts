import { Component, OnInit } from '@angular/core';

import { Link } from '../shared/navbar/link.model';

@Component({
    selector: 'client-page',
    templateUrl: './client.html',
    styleUrls: ['./client.scss']
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