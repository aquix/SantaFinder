import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NewOrderViewModel } from '../../data-services/view-models/new-order/order.view-model';
import { Router } from '@angular/router';

import * as moment from 'moment/moment';

import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../data-services/orders.service';
import { OrderFullInfo } from './order-info';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'order-info-page',
    templateUrl: './order-info.html',
    styleUrls: ['./present-info.scss'],
})
export class ClientOrderInfoComponent implements OnInit {
    id: number;
    order: OrderFullInfo;
    errorMessage: string;
    presentInfoForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private ordersService: OrdersService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.presentInfoForm = this.formBuilder.group({
            clientName: ['', [Validators.required]], 
            childrenNames: ['', [Validators.required]], 
            datetime: ['', [Validators.required]],
            address: this.formBuilder.group({
                city: ['', [Validators.required]],
                street: ['', [Validators.required]],
                house: ['', [Validators.required]],
                apartment: ['', [Validators.required]]
            }),           
            presents: this.formBuilder.array([
                this.initNewPresent()
            ])                    
        });

        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.ordersService.getOrderFullInfo(this.id).subscribe(res => {
            if (res !== null) {
                this.order = res.json();
                let formData = {
                clientName: this.order.clientName,
                childrenNames: this.order.childrenNames,
                datetime: this.order.datetime,
                address: this.order.address,
                presents: this.order.presents
            };
            console.log(res);
            this.presentInfoForm.setValue(formData);
            } else {
                this.errorMessage = res.statusText;
            }
        });
    }

    initNewPresent() {
        return this.formBuilder.group({
            name: ['', Validators.required],
            buyBySanta: [false]
        });
    }

    addPresent() {
        const presentsControl = <FormArray>this.presentInfoForm.get('presents');
        presentsControl.push(this.initNewPresent());
    }

    removePresent(i: number) {
        const control = <FormArray>this.presentInfoForm.controls['presents'];
        control.removeAt(i);
    }

    onSubmitClick({ value, id }: { value: OrderFullInfo, id: number }) {

        this.ordersService.changePresent(value, id).subscribe(success => {
            if (success) {
                this.router.navigate(['../']);
            } else {
                console.log('error');
            }
        });
    }

}