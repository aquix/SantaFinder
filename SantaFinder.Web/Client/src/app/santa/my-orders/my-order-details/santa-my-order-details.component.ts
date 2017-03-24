import { Component, OnInit } from '@angular/core';
import * as moment from 'moment/moment';

import { OrderFullInfo } from '../../../shared/models/order-full-info.model';
import { OrderStatus } from '../../../shared/enums/order-status';
import { SantaOrdersService } from '../../../data-services/santa-orders.service';
import { SantaOrdersListService } from '../santa-orders-list.service';
import { NotificationsService } from '../../../shared/notifications/notifications.service';
import { NotificationType } from '../../../shared/notifications/notification-type.enum';

@Component({
    selector: 'santa-my-order-details',
    templateUrl: 'santa-my-order-details.html',
    styleUrls: ['./my-order-details.scss']
})
export class SantaMyOrderDetailsComponent implements OnInit {
    order: OrderFullInfo;

    OrderStatus = OrderStatus;

    constructor(
        private santaOrdersService: SantaOrdersService,
        private santaOrdersListService: SantaOrdersListService,
        private notificationsService: NotificationsService
    ) { }

    ngOnInit() {
        this.santaOrdersListService.orderDetails.subscribe(data => {
            this.order = data;
        });
    }

    onCompleteClick() {
        this.santaOrdersService.completeOrder(this.order.id).subscribe(res => {
            // TODO reload only modified order
            this.notificationsService.notify({
                type: NotificationType.info,
                content: `Order #${this.order.id} marked as completed`
            });
            this.santaOrdersListService.loadOrders(1);
            this.santaOrdersListService.selectOrder(-1);
        }, console.log);
    }

    onDiscardClick() {
        this.santaOrdersService.discardOrder(this.order.id).subscribe(res => {
            // TODO reload only modified order
            this.notificationsService.notify({
                type: NotificationType.info,
                content: `Order #${this.order.id} discarded`
            });
            this.santaOrdersListService.loadOrders(1);
            this.santaOrdersListService.selectOrder(-1);
        }, console.log);
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