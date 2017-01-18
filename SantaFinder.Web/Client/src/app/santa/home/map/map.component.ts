import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { OrderLocationInfo } from '../../../data-services/view-models/orders-on-map/order-location-info';
import { Location } from '../../../data-services/view-models/location';
import { LocationService } from '../../../shared/services/location.service';
import { GeocodingService } from '../../../shared/services/geocoding.service';

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
        private locationService: LocationService,
        private geo: GeocodingService
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

    private locationChanged(loc: Location) {
        this.myLocation.latitude = loc.latitude;
        this.myLocation.longitude = loc.longitude;
    }
}