import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'main-page',
    template: require('./client-home.html')
})
export class ClientHomeComponent implements OnInit {
    constructor(
        private router: Router,
    ) { }

    ngOnInit() { }
}