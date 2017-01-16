import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EmailValidators, PasswordValidators } from 'ng2-validators';
import { Router } from '@angular/router';

import { Order } from './models/order.model';
import { Present } from './models/present.model';

// import './client-order.scss';

@Component({
    selector: 'client-order',
    templateUrl: './client-order.html',
    styleUrls: ['./client-order.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientOrderComponent implements OnInit {
    orderForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnInit() {
        this.orderForm = this.formBuilder.group({
            address: this.formBuilder.group({
                useDefaultAddress: [true],
                customAddress: this.formBuilder.group({
                    city: [''],
                    street: [''],
                    house: [''],
                    apartment: ['']
                })
            }),
            childrenNames: [''],
            datetime: ['', Validators.required],
            presents: this.formBuilder.array([
                this.initNewPresent()
            ])
        });

        let addressGroup = this.orderForm.get('address');
        addressGroup.get('useDefaultAddress').valueChanges.subscribe(value => {
            let customAddressGroup = addressGroup.get('customAddress');
            let fieldNames = ['city', 'street', 'house', 'apartment'];
            if (value) {
                for (let fieldName of fieldNames) {
                    customAddressGroup.get(fieldName).clearValidators();
                    customAddressGroup.get(fieldName).updateValueAndValidity();
                }
            } else {
                for (let fieldName of fieldNames) {
                    customAddressGroup.get(fieldName).setValidators(Validators.required);
                    customAddressGroup.get(fieldName).updateValueAndValidity();
                }
            }
        })
    }

    initNewPresent() {
        return this.formBuilder.group({
            presentName: ['', Validators.required],
            buyBySanta: [false]
        });
    }

    addPresent() {
        const presentsControl = <FormArray>this.orderForm.get('presents');
        presentsControl.push(this.initNewPresent());
    }

    removePresent(i: number) {
        const control = <FormArray>this.orderForm.controls['presents'];
        control.removeAt(i);
    }

    onSubmitClick({ value }: { value: Order }) {
        console.log('submit', value);
    }
}