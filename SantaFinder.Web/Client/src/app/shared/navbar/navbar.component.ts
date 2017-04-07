import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Link } from './link.model';

@Component({
    selector: 'sf-navbar',
    templateUrl: './navbar.html',
    styleUrls: ['./navbar.scss']
})
export class NavbarComponent implements OnInit {
    @Input() links: Link[];
    @Input()
    set theme(value: string) {
        if (this.themes.indexOf(value) === -1) {
            return;
        }

        this.nav.nativeElement.className += ` ${value}`;
    }

    @ViewChild('nav') nav: ElementRef;
    @ViewChild('openIcon') openIcon: ElementRef;

    showLinks = false;

    private themes = [
        'blue'
    ];

    constructor() { }

    ngOnInit() { }
}
