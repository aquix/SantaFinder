import { Component, OnInit } from '@angular/core';
import { UserType } from '../../../shared/enums/user-type';

@Component({
    selector: 'admin-login-form',
    templateUrl: './admin-login-form.html'
})
export class AdminLoginFormComponent implements OnInit {
    private UserType = UserType;

    constructor() { };

    ngOnInit() { }
}