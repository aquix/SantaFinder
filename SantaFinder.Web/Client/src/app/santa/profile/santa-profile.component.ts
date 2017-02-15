import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidators } from 'ng2-validators';
import { Router } from '@angular/router';

import CustomValidators from '../../account/utils/custom-validators';
import { AccountService } from '../../account/services/account.service';
import { SantaProfileModel } from './santa-profile.model';
import { SantaProfileChangeModel } from './santa-profile-change.model';

@Component({
    selector: 'santa-profile',
    templateUrl: './santa-profile.html',
    styleUrls: ['./santa-profile.scss', '../../shared/profile-form/profile-form.scss'],
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

export class SantaProfileComponent implements OnInit {
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
            name: ['', Validators.required],
            password: ['', [CustomValidators.password]],
            newPassword: this.formBuilder.group({
                password: ['', [CustomValidators.notRequiredPassword]],
                passwordConfirmation: ['']
            }, {
                validator: CustomValidators.notRequiredPasswordWithConfirmation('password', 'passwordConfirmation')
            }),
        });

        this.accountService.getSantaData().subscribe((res: SantaProfileModel) => {
            this.profileForm.patchValue(res);
        });
    }

    onSubmitClick({ value }: { value: SantaProfileChangeModel }) {
        this.accountService.changeSantaProfile(value).subscribe(res => {
            this.router.navigate(['/santa']);
        }, err => {
            let errors: string[] = err.json()['modelState'][''];
            this.errorMessage = errors.join('\n');
        });
    }

    arePasswordsMismatched() {
        return this.profileForm.get('newPassword').invalid &&
            !this.profileForm.get('newPassword').get('passwordConfirmation').pristine;
    }
}