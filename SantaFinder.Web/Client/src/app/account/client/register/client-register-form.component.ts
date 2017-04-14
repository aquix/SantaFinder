import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidators, PasswordValidators } from 'ng2-validators';
import { Router } from '@angular/router';

import CustomValidators from '../../utils/custom-validators';
import { AccountService } from '../../services';
import { ClientRegisterModel } from './client-register.model';
import { UserType } from '../../../core/enums';
import { slideFromLeft } from 'app/shared/animations';

@Component({
    selector: 'register-form',
    templateUrl: './client-register-form.html',
    styleUrls: ['./client-register-form.scss'],
    animations: [
        slideFromLeft()
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
            }, UserType.client).subscribe(() => {
                this.router.navigate(['/client']);
            }, console.log);
        }, err => {
            const errors: string[] = err.json()['modelState'][''];
            this.errorMessage = errors.join('\n');
        });
    }

    arePasswordsMismatched() {
        return this.registerForm.get('passwords').invalid &&
            !this.registerForm.get('passwords').get('passwordConfirmation').pristine;
    }
}
