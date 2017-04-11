import { Component, OnInit } from '@angular/core';
import { Link } from 'app/shared/navbar';

@Component({
    selector: 'sf-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
    navbarLinks: Link[];

    constructor() { }

    ngOnInit() {
        this.navbarLinks = [
            {
                name: 'Logout',
                routerLink: 'logout'
            }
        ];
    }

}
