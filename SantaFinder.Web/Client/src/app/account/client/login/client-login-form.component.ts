import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import CustomValidators from '../../utils/custom-validators';
import { ClientAccountService } from '../../services/client-account.service';
import { ClientLoginModel } from './client-login.model';


@Component({
    selector: 'login-form',
    template: require('./client-login-form.html')
})
export class ClientLoginFormComponent implements OnInit {
    loginForm: FormGroup;
    errorMessage: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private accountService: ClientAccountService
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [CustomValidators.password]]
        });
    }

    onSubmitClick({ value }: { value: ClientLoginModel }) {
        this.accountService.login(value)
            .subscribe(res => {
                this.router.navigate(['/']);
            }, err => {
                this.errorMessage = err.json()['error_description'];
            });
    }
}