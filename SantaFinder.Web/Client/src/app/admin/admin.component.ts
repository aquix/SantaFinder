import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Link } from '../shared/navbar/link.model';

@Component({
    selector: 'admin-page',
    templateUrl: 'admin.html',
    styleUrls: ['./admin.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
    navbarLinks: Link[];

    constructor() { }

    ngOnInit() {
        this.navbarLinks = [
            {
                name: 'Home',
                routerLink: './home'
            }
        ];
    }
}