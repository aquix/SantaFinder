import { Component, OnInit } from '@angular/core';

import { UserType } from '../../../core/enums';

@Component({
    selector: 'client-login-form',
    templateUrl: './client-login-form.html'
})
export class ClientLoginFormComponent implements OnInit {
    UserType = UserType;

    constructor() { };

    ngOnInit() { }
}
