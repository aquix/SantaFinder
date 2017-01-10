import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidators, PasswordValidators } from 'ng2-validators';
import { Router } from '@angular/router';

import CustomValidators from '../../utils/custom-validators';
import { AccountService } from '../../services/account.service';
import { ClientRegisterModel } from './client-register.model';
import { UserType } from '../../../auth/user-type';

@Component({
    selector: 'register-form',
    template: require('./client-register-form.html')
})
export class ClientRegisterFormComponent implements OnInit {
    registerForm: FormGroup;

    errorMessage: string;

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService,
        private router: Router
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, EmailValidators.simple()]],
            passwords: this.formBuilder.group({
                password: ['', [CustomValidators.password]],
                passwordConfirmation: ['']
            }, {
                validator: PasswordValidators.mismatchedPasswords('password', 'passwordConfirmation')
            }),
            name: ['', Validators.required],
            address: this.formBuilder.group({
                city: ['', [Validators.required]],
                street: ['', [Validators.required]],
                house: ['', [Validators.required]],
                apartment: ['', [Validators.required]]
            }),
        });
        this.registerForm.valueChanges.subscribe(data => {
            if (this.errorMessage) {
                this.errorMessage = '';
            }
        });
    }

    onSubmitClick({ value }: { value: ClientRegisterModel }) {
        this.accountService.register(value).subscribe(res => {
            console.log('Registered', res);
            return this.accountService.login({
                email: value.email,
                password: value.passwords.password
            }, UserType.client).subscribe(res => {
                this.router.navigate(['/client']);
            }, err => {
                console.log('error when login');
            });
        }, err => {
            let errors: string[] = err.json()['modelState'][''];
            this.errorMessage = errors.join('\n');
        });
    }
}