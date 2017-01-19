import { Component, OnInit } from '@angular/core';

import { Link } from '../shared/navbar/link.model';

@Component({
    selector: 'santa-page',
    templateUrl: 'santa.html'
})
export class SantaComponent implements OnInit {
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