import { Component, OnInit } from '@angular/core';
import { UserType } from '../../../auth/user-type';

@Component({
    selector: 'client-login-form',
    template: require('./client-login-form.html')
})
export class ClientLoginFormComponent implements OnInit {
    private UserType = UserType;

    constructor() { };

    ngOnInit() { }
}