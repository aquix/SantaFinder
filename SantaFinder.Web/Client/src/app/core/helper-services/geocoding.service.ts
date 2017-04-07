import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../../app.config';
import { Address, Location } from '../models';

@Injectable()
export class GeocodingService {
    private static apiPath = 'https://maps.googleapis.com/maps/api/geocode';

    constructor(
        private http: Http,
        private config: AppConfig,
    ) { }

    getCoordsFromAddress(address: Address) {
        const query = `${address.city}+${address.street}+${address.house}`;
        return this.getCoords(query);
    }

    getCoords(query: string): Observable<Location> {
        const uri = `${GeocodingService.apiPath}/json?address=${query}&key=${this.config.gmapsApiKey}`;
        return this.http.get(uri).map(res => {
            const content = res.json();
            if (content.status !== 'OK') {
                return {
                    latitude: 0,
                    longitude: 0
                };
            }

            const location = content.results[0].geometry.location;
            return {
                latitude: location.lat,
                longitude: location.lng
            };
        });
    }
}
