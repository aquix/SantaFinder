import { Component, OnInit } from '@angular/core';
import * as moment from 'moment/moment';

import { OrderFullInfo, Location } from '../../../core/models';
import { OrderStatus } from '../../../core/enums';
import { SantaOrdersListService } from '../santa-orders-list.service';
import { SantaOrdersService } from '../../../core/data-services';
import { NotificationsService, NotificationType } from '../../../core/notifications';

@Component({
    selector: 'santa-my-order-details',
    templateUrl: 'santa-my-order-details.html',
    styleUrls: ['./santa-my-order-details.scss']
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

        const now = moment();
        const orderTime = moment(this.order.datetime);
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

    createDirectionLink(location: Location) {
        return `https://www.google.com/maps/dir/Current+Location/${location.latitude},${location.longitude}`;
    }
}
