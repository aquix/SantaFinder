import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidators } from 'ng2-validators';

import { AccountService } from '../../services';
import { LoginModel } from './login.model';
import { UserType } from '../../../core/enums';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.html',
    styleUrls: ['./login-form.scss']
})
export class LoginFormComponent implements OnInit {
    @Input() userType: UserType;
    @Input() title: string = 'Login';

    loginForm: FormGroup;
    errorMessage: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private accountService: AccountService
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, EmailValidators.simple]],
            password: ['']
        });
        this.loginForm.valueChanges.subscribe(data => {
            if (this.errorMessage) {
                this.errorMessage = '';
            }
        });
    }

    onSubmitClick({ value }: { value: LoginModel }) {
        this.accountService.login(value, this.userType).subscribe(res => {
            this.router.navigate(['/']);
        }, err => {
            this.errorMessage = err.json()['error_description'];
        });
    }
}