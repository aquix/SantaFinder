import { Component, OnInit } from '@angular/core';
import { UserType } from '../../../shared/enums/user-type';

@Component({
    selector: 'client-login-form',
    templateUrl: './client-login-form.html'
})
export class ClientLoginFormComponent implements OnInit {
    private UserType = UserType;

    constructor() { };

    ngOnInit() { }
}