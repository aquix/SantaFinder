import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidators, PasswordValidators } from 'ng2-validators';
import { Router } from '@angular/router';

import CustomValidators from '../../utils/custom-validators';
import { SantaAccountService } from '../../services/santa-account.service';
import { SantaRegisterModel } from './santa-register.model';
import { UserType } from '../../../auth/user-type';

@Component({
    selector: 'register-form',
    template: require('./santa-register-form.html')
})
export class SantaRegisterFormComponent implements OnInit {
    registerForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private accountService: SantaAccountService,
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
            name: ['', Validators.required]
        });
    }

    onSubmitClick({ value }: { value: SantaRegisterModel }) {
        this.accountService.register(value).subscribe(res => {
            console.log('Registered', res);
            return this.accountService.login({
                email: value.email,
                password: value.passwords.password
            }, UserType.santa).subscribe(res => {
                this.router.navigate(['/santa']);
            }, err => {
                console.log('error when login');
            });
        });
    }
}