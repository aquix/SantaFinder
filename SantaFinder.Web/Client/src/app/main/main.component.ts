import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'main-page',
    template: require('./main.html')
})
export class MainComponent implements OnInit {
    constructor(
        private router: Router,
    ) { }

    ngOnInit() { }
}