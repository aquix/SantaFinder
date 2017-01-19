import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidators, PasswordValidators } from 'ng2-validators';
import { Router } from '@angular/router';

import CustomValidators from '../../account/utils/custom-validators';
import { AccountService } from '../../account/services/account.service';
import { ClientProfileModel } from './client-profile.model';
import { ClientProfileChangeModel } from './client-profile.change-model';
import { UserType } from '../../shared/enums/user-type';

@Component({
    selector: 'client-profile',
    templateUrl: './client-profile.html',
    styleUrls: ['./client-profile.scss'],
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
export class ClientProfileComponent implements OnInit {
    profileForm: FormGroup;

    errorMessage: string;

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService,
        private router: Router
    ) { }

    ngOnInit() {
        this.profileForm = this.formBuilder.group({
            email: ['', [Validators.required, EmailValidators.simple()]],           
            passwords: this.formBuilder.group({
                oldPassword: ['', [CustomValidators.password]],
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

        this.accountService.getClientData().subscribe(res => {
            console.log(res);
            this.profileForm.get('email').setValue(res.email);
            this.profileForm.get('name').setValue(res.name);
            this.profileForm.get('address.city').setValue(res.address.city);
            this.profileForm.get('address.street').setValue(res.address.street);
            this.profileForm.get('address.house').setValue(res.address.house);
            this.profileForm.get('address.apartment').setValue(res.address.apartment);
        });

    }

    onSubmitClick({ value }: { value: ClientProfileChangeModel }) {
        this.accountService.changeClientProfile(value).subscribe(res => {
            this.router.navigate(['/client']);
        }, err => {
            let errors: string[] = err.json()['modelState'][''];
            this.errorMessage = errors.join('\n');
        });
    }

    arePasswordsMismatched() {
        return this.profileForm.get('passwords').invalid &&
            !this.profileForm.get('passwords').get('passwordConfirmation').pristine;
    }
}