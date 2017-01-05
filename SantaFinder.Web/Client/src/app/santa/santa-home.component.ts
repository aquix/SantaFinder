import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'main-page',
    template: require('./santa-home.html')
})
export class SantaHomeComponent implements OnInit {
    constructor(
        private router: Router,
    ) { }

    ngOnInit() { }
}