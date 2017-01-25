import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment/moment';

import { OrderFullInfo } from '../../../shared/models/order-full-info.model';
import { OrderStatus } from '../../../shared/enums/order-status';

@Component({
    selector: 'santa-my-order-details',
    templateUrl: 'santa-my-order-details.html',
    styleUrls: ['./my-order-details.scss']
})
export class SantaMyOrderDetailsComponent implements OnInit {
    @Input() order: OrderFullInfo;
    @Output() completeClick: EventEmitter<number> = new EventEmitter();
    @Output() discardClick: EventEmitter<number> = new EventEmitter();

    OrderStatus = OrderStatus;

    constructor() { }

    ngOnInit() { }

    onCompleteClick() {
        this.completeClick.emit(this.order.id);
    }

    onDiscardClick() {
        this.discardClick.emit(this.order.id);
    }

    canCompleteOrder() {
        if (this.order.status !== OrderStatus.Approved) {
            return false;
        }

        let now = moment();
        let orderTime = moment(this.order.datetime);
        if (now.isAfter(orderTime)) {
            return true;
        } else {
            return false;
        }
    }

    canDiscardOrder() {
        return this.order.status === OrderStatus.Approved;
    }

    getStatusColor(status: OrderStatus) {
        switch (status) {
        case OrderStatus.Approved:
            return 'order-status-approved';
        case OrderStatus.New:
            return 'order-status-new';
        case OrderStatus.Completed:
            return 'order-status-completed';
        }
    }
}