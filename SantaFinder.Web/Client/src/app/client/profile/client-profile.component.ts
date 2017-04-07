import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailValidators } from 'ng2-validators';
import { Router } from '@angular/router';

import CustomValidators from '../../account/utils/custom-validators';
import { AccountService } from '../../account/services/account.service';
import { ClientProfileModel } from './client-profile.model';
import { ClientProfileChangeModel } from './client-profile-change.model';
import { GeocodingService } from '../../core/helper-services';
import { NotificationsService, NotificationType } from '../../core/notifications';

@Component({
    selector: 'client-profile',
    templateUrl: './client-profile.html',
    styleUrls: ['./client-profile.scss', '../../shared/profile-form/profile-form.scss'],
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
        private router: Router,
        private geocodingService: GeocodingService,
        private notificationsService: NotificationsService
    ) { }

    ngOnInit() {
        this.profileForm = this.formBuilder.group({
            email: ['', [Validators.required, EmailValidators.simple]],
            name: ['', Validators.required],
            address: this.formBuilder.group({
                city: ['', [Validators.required]],
                street: ['', [Validators.required]],
                house: ['', [Validators.required]],
                apartment: ['', [Validators.required]]
            }),
            password: ['', [CustomValidators.password]],
            newPassword: this.formBuilder.group({
                password: ['', [CustomValidators.notRequiredPassword]],
                passwordConfirmation: ['']
            }, {
                validator: CustomValidators.notRequiredPasswordWithConfirmation('password', 'passwordConfirmation')
            }),
        });

        this.accountService.getClientData().subscribe((res: ClientProfileModel) => {
            this.profileForm.patchValue(res);
        });
    }

    onSubmitClick({ value }: { value: ClientProfileChangeModel }) {
        this.accountService.changeClientProfile(value).subscribe(res => {
            this.notificationsService.notify({
                type: NotificationType.info,
                content: `Profile settings successfully changed`
            });
            this.router.navigate(['/client']);
        }, err => {
            const errors: string[] = err.json()['modelState'][''];
            this.errorMessage = errors.join('\n');
        });
    }

    arePasswordsMismatched() {
        return this.profileForm.get('newPassword').invalid &&
            !this.profileForm.get('newPassword').get('passwordConfirmation').pristine;
    }
}
