import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SelectOrderService {
    private selectedOrder = new Subject<number>();

    selectedOrder$ = this.selectedOrder.asObservable();

    constructor() { }

    selectOrder(id: number) {
        this.selectedOrder.next(id);
    }

    unselectOrderFromMap() {
        this.selectedOrder.next(-1);
    }
}
