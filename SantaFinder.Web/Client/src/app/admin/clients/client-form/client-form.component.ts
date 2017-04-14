import { Component, OnInit, EventEmitter, Output, Input, trigger, transition } from '@angular/core';
import { Client } from '../client.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { EmailValidators } from 'ng2-validators';

import CustomValidators from 'app/account/utils/custom-validators';
import { GeocodingService } from 'app/core/helper-services';
import { slideFromLeft } from 'app/shared/animations/slide-from-left.animation';

@Component({
    selector: 'sf-admin-client-form',
    templateUrl: './client-form.component.html',
    styleUrls: ['./client-form.component.scss'],
    animations: [
        slideFromLeft()
    ]
})
export class ClientFormComponent implements OnInit {
    @Output() public onSubmit = new EventEmitter<Client>();
    @Input()
    public set data(value: Client) {
        this.clientForm.setValue(value);
    };

    @Input()
    submitButtonText = 'Submit';

    public clientForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private geocodingService: GeocodingService
    ) { }

    ngOnInit() {
        this.clientForm = this.formBuilder.group({
            id: [''],
            email: ['', [Validators.required, EmailValidators.simple]],
            name: ['', Validators.required],
            address: this.formBuilder.group({
                city: ['', [Validators.required]],
                street: ['', [Validators.required]],
                house: ['', [Validators.required]],
                apartment: ['', [Validators.required]]
            }),
            location: this.formBuilder.group({
                latitude: [''],
                longitude: ['']
            }),
            newPassword: this.formBuilder.group({
                password: ['', [CustomValidators.notRequiredPassword]],
                confirmation: ['']
            }, {
                validator: CustomValidators.notRequiredPasswordWithConfirmation('password', 'confirmation')
            }),
        });

        this.clientForm.get('address').valueChanges.debounceTime(1000).subscribe(value => {
            console.log(`update address ${value}`);
            this.geocodingService.getCoordsFromAddress(value).subscribe(location => {
                console.log(`new coords ${location}`);
                this.clientForm.get('location').setValue(location);
            });
        });
    }

    onSubmitClick({ value }: { value: Client }) {
        this.onSubmit.emit(value);
    }

    arePasswordsMismatched() {
        return this.clientForm.get('newPassword').invalid &&
            !this.clientForm.get('newPassword').get('confirmation').pristine;
    }
}
