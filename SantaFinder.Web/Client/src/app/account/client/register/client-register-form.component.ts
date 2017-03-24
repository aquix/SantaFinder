import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidators, PasswordValidators } from 'ng2-validators';
import { Router } from '@angular/router';

import CustomValidators from '../../utils/custom-validators';
import { AccountService } from '../../services/account.service';
import { ClientRegisterModel } from './client-register.model';
import { UserType } from '../../../shared/enums/user-type';

@Component({
    selector: 'register-form',
    templateUrl: './client-register-form.html',
    styleUrls: ['./client-register-form.scss'],
    animations: [
        trigger(
            'errorHint', [
                transition(':enter', [
                    style({ transform: 'translateX(100%)', opacity: 0 }),
                    animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
                ]),
                transition(':leave', [
                    style({ transform: 'translateX(0)', 'opacity': 1 }),
                    animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
                ])
            ]
        )
    ]
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
            email: ['', [Validators.required, EmailValidators.simple]],
            passwords: this.formBuilder.group({
                password: ['', [Validators.required, CustomValidators.password]],
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

    arePasswordsMismatched() {
        return this.registerForm.get('passwords').invalid &&
            !this.registerForm.get('passwords').get('passwordConfirmation').pristine;
    }
}