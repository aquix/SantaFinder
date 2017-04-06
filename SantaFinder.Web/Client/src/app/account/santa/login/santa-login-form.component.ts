import { Component, OnInit } from '@angular/core';

import { UserType } from '../../../core/enums';

@Component({
    selector: 'santa-login-form',
    templateUrl: './santa-login-form.html'
})
export class SantaLoginFormComponent implements OnInit {
    private UserType = UserType;

    constructor() { }

    ngOnInit() { }
}