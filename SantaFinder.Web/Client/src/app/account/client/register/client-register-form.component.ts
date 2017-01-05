import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import CustomValidators from '../../utils/custom-validators';
import { EmailValidators, PasswordValidators } from 'ng2-validators';

import { ClientAccountService } from '../../services/client-account.service';
import { ClientRegisterModel } from './client-register.model';

@Component({
    selector: 'register-form',
    template: require('./client-register-form.html')
})
export class ClientRegisterFormComponent implements OnInit {
    registerForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private accountService: ClientAccountService,
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
    }

    onSubmitClick({ value }: { value: ClientRegisterModel }) {
        this.accountService.register(value).subscribe(res => {
            console.log('Registered', res);
        });
    }
}