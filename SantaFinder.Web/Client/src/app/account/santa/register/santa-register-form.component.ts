import { Component, OnInit, ViewChild, trigger, transition, style, animate } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidators, PasswordValidators } from 'ng2-validators';
import { Router } from '@angular/router';

import CustomValidators from '../../utils/custom-validators';
import { AccountService } from '../../services';
import { SantaRegisterModel } from './santa-register.model';
import { UserType } from '../../../core/enums';
import { PhotoUploaderComponent } from './photo-uploader/photo-uploader.component';

@Component({
    selector: 'register-form',
    templateUrl: './santa-register-form.html',
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
    ],
    styleUrls: ['./santa-register-form.scss']
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
            email: ['', [Validators.required, EmailValidators.simple]],
            passwords: this.formBuilder.group({
                password: ['', [Validators.required, CustomValidators.password]],
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
            return this.accountService.login({
                email: value.email,
                password: value.passwords.password
            }, UserType.santa).subscribe(() => {
                this.router.navigate(['/santa']);
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
