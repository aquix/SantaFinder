import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { SebmGoogleMapMarker, SebmGoogleMapInfoWindow, MarkerManager, GoogleMapsAPIWrapper, } from 'angular2-google-maps/core';
import { Observable } from 'rxjs';

import { Location } from '../../../shared/models/location';
import { SelectOrderService } from '../services/select-order.service';
import { OrderFullInfo } from '../../../shared/models/order-full-info.model';
import { OrderLocationInfo } from '../../../core/data-services/view-models/orders-on-map/order-location-info';
import { LocationService, GeocodingService } from '../../../core/helper-services/index';

@Component({
    selector: 'map',
    templateUrl: 'map.html',
    styleUrls: ['./map.scss'],
    providers: [MarkerManager, GoogleMapsAPIWrapper]
})
export class MapComponent implements OnInit {
    @Input() orders: OrderLocationInfo[];
    @Input() getOrderDetails: (id: number) => Observable<OrderFullInfo>;

    @Output() takeOrderHandler: EventEmitter<number> = new EventEmitter();

    @ViewChildren('orderMarker') markers: QueryList<SebmGoogleMapMarker>;
    @ViewChildren('orderInfoWindow') infoWindows: QueryList<SebmGoogleMapInfoWindow>;

    myLocation: Location = {
        latitude: 0,
        longitude: 0
    };

    orderFullInfo: OrderFullInfo;

    constructor(
        private locationService: LocationService,
        private geo: GeocodingService,
        private selectOrderService: SelectOrderService,
        private mman: MarkerManager
    ) { }

    ngOnInit() {
        this.locationService.getCurrentLocation().then(location => {
            this.locationChanged(location);
        });

        this.selectOrderService.selectedOrder$.subscribe(id => {
            this.infoWindows.forEach(window => {
                window.close();
            });

            if (id === -1) {
                return;
            }

            let windowIndex = this.orders.findIndex(o => o.id === id);
            this.infoWindows.find((w, i) => i === windowIndex).open();

            this.orderFullInfo = null;
            this.getOrderDetails(id).subscribe(fullInfo => {
                this.orderFullInfo = fullInfo;
            });
        });
    }

    onMarkerClick(markerIndex: number, orderId: number) {
        this.selectOrderService.selectOrder(orderId);
    }

    onWindowClosed() {
        // TODO change selectOrderIndex in service to -1
        // but this event fires on each window.close(), not only on user click
    }

    onTakeOrderBtnClick(orderId: number) {
        this.takeOrderHandler.emit(orderId);
    }

    private locationChanged(loc: Location) {
        this.myLocation.latitude = loc.latitude;
        this.myLocation.longitude = loc.longitude;
    }
}