import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EmailValidators, PasswordValidators } from 'ng2-validators';
import { Router } from '@angular/router';

import { Order } from './models/order.model';
import { Present } from './models/present.model';

import './client-order.scss';

@Component({
    selector: 'client-order',
    template: require('./client-order.html')
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
            presents: this.formBuilder.array([
                this.initNewPresent()
            ])
        });
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

    onSubmitClick() {

    }
}