import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NewOrderViewModel } from '../../data-services/view-models/new-order/order.view-model';
import { Router } from '@angular/router';

import * as moment from 'moment/moment';

import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../data-services/orders.service';
import { OrderFullInfo } from './order-info';
import { OrderPostInfo } from './order-post-info';
import { OrderStatus } from '../../data-services/view-models/orders-history/order-status';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'order-info-page',
    templateUrl: './order-info.html',
    styleUrls: ['./present-info.scss'],
})
export class ClientOrderInfoComponent implements OnInit {
    public orderStatus = OrderStatus;
    id: number;
    order: OrderFullInfo;
    order_post: OrderPostInfo;
    errorMessage: string;
    orderInfoForm: FormGroup;
    clientName: boolean = true;
    children: boolean = true;
    datetime: boolean = true;
    fulladdress: boolean = true;
    present: boolean = true;
    image: any;

    constructor(
        private formBuilder: FormBuilder,
        private ordersService: OrdersService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.orderInfoForm = this.formBuilder.group({
            clientName: ['', [Validators.required]], 
            childrenNames: ['',  [Validators.required]], 
            datetime: ['', [Validators.required]],
            address: this.formBuilder.group({
                city: ['', [Validators.required]],
                street: ['', [Validators.required]],
                house: ['', [Validators.required]],
                apartment: ['', [Validators.required]]
            }),           
            presents: this.formBuilder.array([
                this.initNewPresent()
            ]),
            santaName: [''],                       
        });

        this.route.params.subscribe(params => {
            this.id = params['id'];
            
        });
        this.ordersService.getOrderFullInfo(this.id).subscribe(order => {
            this.order = order
            let formData = {  
                clientName: this.order.clientName,
                childrenNames: this.order.childrenNames,
                datetime: this.order.datetime,
                address: this.order.address,
                presents: this.order.presents,
                santaName: this.order.santaInfo.name     
            };
            console.log(this.order);
            this.orderInfoForm.setValue(formData);
        }, err => {
            this.errorMessage = err;
        });
    }

    initNewPresent() {
        return this.formBuilder.group({
            name: ['', Validators.required],
            buyBySanta: [false]
        });
    }

    addPresent() {
        const presentsControl = <FormArray>this.orderInfoForm.get('presents');
        presentsControl.push(this.initNewPresent());
    }

    removePresent(i: number) {
        const control = <FormArray>this.orderInfoForm.controls['presents'];
        control.removeAt(i);
    }

    onSubmitClick({ value }: { value: OrderPostInfo }) {
        value.id = this.id;
        this.ordersService.changeOrder(value).subscribe(success => {
            if (success) {
                this.router.navigate(['../']);
            } else {
                console.log('error');
            }
        });
    }

    onReturnClick() {
        this.router.navigate(['/client/orderhistory']);   
    }
     
    changeClientName(){
        if(this.order.status === 0)
            this.clientName=!this.clientName;
        else
            this.errorMessage = "order can't be changed";  
    }

    changeChildrenName(){
        if(this.order.status === 0)
            this.children=!this.children;
        else
            this.errorMessage = "order can't be changed";    
    }

    changeDataTime(){
        if(this.order.status === 0)
            this.datetime=!this.datetime;
        else
            this.errorMessage = "order can't be changed";  
    }

    changeAddress(){
        if(this.order.status === 0)
            this.fulladdress=!this.fulladdress;
        else
            this.errorMessage = "order can't be changed";  
    }

    changePresent(){
        if(this.order.status === 0)
            this.present=!this.present;
        else
            this.errorMessage = "order can't be changed";  
    }
}