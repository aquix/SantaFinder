import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../app.config';
import { Address } from '../models/address.model';
import { Location } from '../../data-services/view-models/location';

@Injectable()
export class GeocodingService {
    private static apiPath = 'https://maps.googleapis.com/maps/api/geocode';

    constructor(
        private http: Http
    ) { }

    getCoordsFromAddress(address: Address) {
        let query = `${address.city}+${address.street}+${address.house}`;
        return this.getCoords(query);
    }

    getCoords(query: string): Observable<Location> {
        let uri = `${GeocodingService.apiPath}/json?address=${query}&key=${AppConfig.GMAPS_API_KEY}`;
        return this.http.get(uri).map(res => {
            let content = res.json();
            if (content.status !== 'OK') {
                return {
                    latitude: 0,
                    longitude: 0
                };
            }

            let location = content.results[0].geometry.location;
            return {
                latitude: location.lat,
                longitude: location.lng
            }
        });
    }
}