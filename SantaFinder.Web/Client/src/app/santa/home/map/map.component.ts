import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { OrderLocationInfo } from '../../../data-services/view-models/orders-on-map/order-location-info';
import { Location } from '../../../data-services/view-models/location';
import { LocationService } from '../../../shared/services/location.service';

@Component({
    selector: 'map',
    templateUrl: 'map.html',
    styleUrls: ['./map.scss']
})
export class MapComponent implements OnInit {
    @Input() orders: OrderLocationInfo[];

    myLocation: Location = {
        latitude: 0,
        longitude: 0
    };

    constructor(
        private locationService: LocationService
    ) { }

    ngOnInit() {
        this.locationService.getCurrentLocation().then(location => {
            console.log('Map init', location);
            this.locationChanged(location);
        });
    }

    onMarkerClick() {
        console.log('marker click');
    }

    onZoomChange(e) {
        console.log(e);
    }

    private locationChanged(loc: Location) {
        this.myLocation.latitude = loc.latitude;
        this.myLocation.longitude = loc.longitude;
    }
}