import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidators } from 'ng2-validators';

import { LoginService } from './login.service';
import { LoginModel } from './login.model';
import { UserType } from '../../core/enums';

@Component({
    selector: 'login-form',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    errorMessage: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private loginService: LoginService
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
        this.loginService.login(value).subscribe(res => {
            this.router.navigate(['home']);
        }, err => {
            this.errorMessage = err.json()['error_description'];
        });
    }
}
