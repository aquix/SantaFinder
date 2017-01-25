import { Pipe, PipeTransform } from '@angular/core';

import { SantaOrderPreview } from '../../../data-services/view-models/santa-orders/santa-order-preview.model';
import { SantaOrderStatusFilter } from './santa-order-status-filter';
import { OrderStatus } from '../../../shared/enums/order-status';

@Pipe({
    name: 'orderStatus'
})
export class SantaOrderStatusPipe implements PipeTransform {
    transform(items: SantaOrderPreview[], filteringStatusRaw: string): any {
        if (!items) {
            return [];
        }

        if (!filteringStatusRaw) {
            return items;
        }

        let filteringStatus: SantaOrderStatusFilter = parseInt(filteringStatusRaw);

        let filtered = items.filter(item => {
            return ((filteringStatus === SantaOrderStatusFilter.Approved && item.status === OrderStatus.Approved) ||
                    (filteringStatus === SantaOrderStatusFilter.Completed && item.status === OrderStatus.Completed) ||
                    (filteringStatus === SantaOrderStatusFilter.All));
        });
        console.log(filtered);
        return filtered;
    }
}