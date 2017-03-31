import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.html',
    styleUrls: ['./app.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    constructor() { }

    ngOnInit() {
    }
}
