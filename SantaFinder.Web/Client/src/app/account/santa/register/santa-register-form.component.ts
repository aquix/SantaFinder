import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidators, PasswordValidators } from 'ng2-validators';
import { Router } from '@angular/router';

import CustomValidators from '../../utils/custom-validators';
import { AccountService } from '../../services/account.service';
import { SantaRegisterModel } from './santa-register.model';
import { UserType } from '../../../auth/user-type';
import { PhotoUploaderComponent } from './photo-uploader/photo-uploader.component';

import './santa-register-form.scss';

@Component({
    selector: 'register-form',
    template: require('./santa-register-form.html')
})
export class SantaRegisterFormComponent implements OnInit {
    registerForm: FormGroup;
    errorMessage: string;

    @ViewChild(PhotoUploaderComponent)
    photoUploader: PhotoUploaderComponent;

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
            name: ['', Validators.required]
        });
        this.registerForm.valueChanges.subscribe(data => {
            if (this.errorMessage) {
                this.errorMessage = '';
            }
        });
    }

    onSubmitClick({ value }: { value: SantaRegisterModel }) {
        value.photo = this.photoUploader.photo;
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
        }, err => {
            console.log(err);
            let errors: string[] = err.json()['modelState'][''];
            this.errorMessage = errors.join('\n');
        });
    }
}