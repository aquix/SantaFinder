import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidators } from 'ng2-validators';

import { SantaAccountService } from '../../services/santa-account.service';
import { SantaLoginModel } from './santa-login.model';


@Component({
    selector: 'login-form',
    template: require('./santa-login-form.html')
})
export class SantaLoginFormComponent implements OnInit {
    loginForm: FormGroup;
    errorMessage: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private accountService: SantaAccountService
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, EmailValidators.simple()]],
            password: ['']
        });
    }

    onSubmitClick({ value }: { value: SantaLoginModel }) {
        this.accountService.login(value)
            .subscribe(res => {
                this.router.navigate(['/']);
            }, err => {
                this.errorMessage = err.json()['error_description'];
            });
    }
}