import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Link } from '../shared/navbar/link.model';

@Component({
    selector: 'client-page',
    templateUrl: './client.html',
    styleUrls: ['./client.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientComponent implements OnInit {
    navbarLinks: Link[];

    ngOnInit() {
        this.navbarLinks = [
            {
                name: 'Main',
                routerLink: './home'
            },
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