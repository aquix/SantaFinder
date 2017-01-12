import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Link } from './link.model';

import './navbar.scss';

@Component({
    selector: 'sf-navbar',
    template: require('./navbar.html')
})
export class NavbarComponent implements OnInit {
    @Input() links: Link[];
    @Input()
    set theme(value: string) {
        console.log(value);
        if (this.themes.indexOf(value) === -1) {
            return;
        }

        this.nav.nativeElement.className += ` ${value}`;
    }

    @ViewChild('nav') nav: ElementRef;

    private themes = [
        'blue'
    ];

    constructor() { }

    ngOnInit() { }
}