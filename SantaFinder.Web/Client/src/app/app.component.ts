import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrls: ['./app.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    constructor() { }

    ngOnInit() {
    }
}
