import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Rating } from 'ng2-rating';

import * as moment from 'moment/moment';

import { ActivatedRoute } from '@angular/router';
import { OrderStatus } from '../../data-services/view-models/orders-history/order-status';
import 'rxjs/add/operator/switchMap';
import { Santa } from '../../data-services/view-models/santa.view-model';
import { ClientOrdersService } from '../../data-services/client-orders.service';
import { OrderPostInfo } from '../../data-services/view-models/change-order/order-post-info';
import { OrderFullInfoForEditing } from '../../data-services/view-models/change-order/order-full-info-for-editing';

@Component({
    selector: 'order-info-page',
    templateUrl: './order-info.html',
    styleUrls: ['../shared/styles/order-form.scss', './order-info.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientOrderInfoComponent implements OnInit, AfterViewInit {
    OrderStatus = OrderStatus;

    id: number;
    errorMessage: string;
    orderInfoForm: FormGroup;
    orderStatus: OrderStatus;
    santaInfo: Santa = null;
    rating: number;

    editMode: boolean = false;
    somethingChanged: boolean = false;
    formPreviousState: OrderPostInfo;

    @ViewChild('ratingControl') ratingControl: Rating;

    constructor(
        private formBuilder: FormBuilder,
        private clientOrdersService: ClientOrdersService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        this.orderInfoForm = this.formBuilder.group({
            childrenNames: [{ value: '', disabled: true },  [Validators.required]],
            datetime: [{ value: '', disabled: true }, [Validators.required]],
            address: this.formBuilder.group({
                city: [{ value: '', disabled: true }, [Validators.required]],
                street: [{ value: '', disabled: true }, [Validators.required]],
                house: [{ value: '', disabled: true }, [Validators.required]],
                apartment: [{ value: '', disabled: true }, [Validators.required]]
            }),
            presents: this.formBuilder.array([
                this.initNewPresent()
            ], Validators.required)
        });

        this.clientOrdersService.getOrder(this.id).subscribe((order: OrderFullInfoForEditing) => {
            let formData = {
                childrenNames: order.childrenNames,
                datetime: order.datetime,
                address: order.address,
                presents: order.presents,
            };

            if (order.rating) {
                this.rating = order.rating;
            }

            this.santaInfo = order.santaInfo;
            this.orderStatus = order.status;
            this.orderInfoForm.controls['presents'] = this.formBuilder.array(
                order.presents.map(() => this.initNewPresent())
            );
            this.orderInfoForm.setValue(formData);
            this.orderInfoForm.get('datetime').setValue(moment(formData.datetime).format('LLL'));
        }, err => {
            this.errorMessage = err;
        });
    }

    ngAfterViewInit() {
        if (this.ratingControl) {
            this.ratingControl.registerOnChange(() => {
                this.rating = this.ratingControl.hovered;
                this.clientOrdersService.rate(this.id, this.rating).subscribe(result => console.log);
            });
        }
    }

    initNewPresent() {
        return this.formBuilder.group({
            id: [0],
            name: [{ value: '', disabled: !this.editMode }, Validators.required],
            buyBySanta: [{ value: false, disabled: !this.editMode }]
        });
    }

    addPresent() {
        const presentsControl = <FormArray>this.orderInfoForm.get('presents');
        presentsControl.push(this.initNewPresent());
        this.orderInfoForm.updateValueAndValidity();
    }

    removePresent(i: number) {
        const control = <FormArray>this.orderInfoForm.controls['presents'];
        control.removeAt(i);
        this.orderInfoForm.updateValueAndValidity();
    }

    onSubmitClick({ value }: { value: OrderFullInfoForEditing }) {
        this.clientOrdersService.changeOrder(this.id, value).subscribe(success => {
            if (success) {
                this.router.navigate(['../']);
            } else {
                console.log('error');
            }
        });
    }

    enableEditing() {
        this.formPreviousState = this.orderInfoForm.value;
        this.editMode = true;

        this.orderInfoForm.enable();
    }

    saveChanges() {
        this.somethingChanged = true;
        this.disableEditing();
    }

    cancelChanges() {
        this.orderInfoForm.controls['presents'] = this.formBuilder.array(
            this.formPreviousState.presents.map(() => this.initNewPresent())
        );
        this.orderInfoForm.patchValue(this.formPreviousState);
        this.disableEditing();
    }

    private rateOrder() {
    }

    private disableEditing() {
        this.editMode = false;
        this.formPreviousState = null;
        this.orderInfoForm.disable();
    }
}