import { Component, OnInit } from '@angular/core';
import { OrderFullInfo } from '../../shared/models/order-full-info.model';

@Component({
    moduleId: module.id,
    selector: 'santa-orders',
    templateUrl: 'santa-orders.html'
})
export class SantaOrdersComponent implements OnInit {
    orders: OrderFullInfo[];

    constructor() { }

    ngOnInit() {
    }
}