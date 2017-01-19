import { Component, OnInit, Input, EventEmitter, ViewChildren, ViewChild, QueryList } from '@angular/core';
import { SebmGoogleMapMarker, SebmGoogleMapInfoWindow, MarkerManager, GoogleMapsAPIWrapper } from 'angular2-google-maps/core';

import { OrderLocationInfo } from '../../../data-services/view-models/orders-on-map/order-location-info';
import { Location } from '../../../shared/models/location';
import { LocationService } from '../../../shared/services/location.service';
import { GeocodingService } from '../../../shared/services/geocoding.service';
import { SelectOrderService } from '../services/select-order.service';


@Component({
    selector: 'map',
    templateUrl: 'map.html',
    styleUrls: ['./map.scss'],
    providers: [MarkerManager, GoogleMapsAPIWrapper]
})
export class MapComponent implements OnInit {
    private _orders: OrderLocationInfo[] = [];

    @Input()
    set orders(value) {
        console.log(value);
        if (value) {
            console.log('set orders', value);
            this._orders = value;

            for (let order of this._orders) {
                let marker = new SebmGoogleMapMarker(this.mman);
                marker.latitude = order.location.latitude;
                marker.longitude = order.location.longitude;
                marker.markerClick.subscribe(() => this.onMarkerClick(marker, order.id));
            }
        }
    }

    get orders() {
        return this._orders;
    }

    @ViewChildren(SebmGoogleMapMarker) markers: QueryList<SebmGoogleMapMarker>;
    @ViewChild(SebmGoogleMapInfoWindow) infoWindow: SebmGoogleMapInfoWindow;

    myLocation: Location = {
        latitude: 0,
        longitude: 0
    };

    constructor(
        private locationService: LocationService,
        private geo: GeocodingService,
        private selectOrderService: SelectOrderService,
        private mman: MarkerManager
    ) { }

    ngOnInit() {
        console.log('init');

        this.locationService.getCurrentLocation().then(location => {
            console.log('Map init', location);
            this.locationChanged(location);
        });

        this.selectOrderService.selectedOrder$.subscribe(id => {
            console.log('map event ' + id);
        });

    }

    onMarkerClick(clickedMarker: SebmGoogleMapMarker, orderId: number) {
        console.log('marker click ' + orderId);
        this.selectOrderService.selectOrder(orderId);

        this.markers.forEach(marker => {
            marker.infoWindow.close();
        });

        clickedMarker.infoWindow.open();
    }

    onWindowClosed() {
        console.log('window closed');
    }

    private locationChanged(loc: Location) {
        this.myLocation.latitude = loc.latitude;
        this.myLocation.longitude = loc.longitude;
    }
}