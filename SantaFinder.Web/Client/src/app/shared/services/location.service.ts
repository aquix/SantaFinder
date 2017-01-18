import { Injectable } from '@angular/core';
import { Location } from '../../shared/models/location';

@Injectable()
export class LocationService {
    private _locationListeners: ((location: Location) => void)[] = [];

    constructor() {
        if (!navigator.geolocation) {
            navigator.geolocation.watchPosition((pos) => {
                for (let listener of this._locationListeners) {
                    listener({
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    });
                }
            });
        }
    }

    getCurrentLocation() {
        if (!navigator.geolocation) {
            return;
        }

        return new Promise((resolve: (loc: Location) => void, reject: (err: Error) => void) => {
            navigator.geolocation.getCurrentPosition((pos) => {
                return resolve({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                });
            }, (err) => {
                let message: string;
                switch (err.code) {
                    case err.PERMISSION_DENIED:
                        message = 'User denied the request for Geolocation.';
                        break;
                    case err.POSITION_UNAVAILABLE:
                        message = 'Location information is unavailable.';
                        break;
                    case err.TIMEOUT:
                        message = 'The request to get user location timed out.';
                        break;
                    default:
                        message = 'Unknown error occured.';
                        break;
                }

                return reject(Error(message));
            });
        });
    }

    addLocationChangeListener(listener: (location: Location) => void) {
        this._locationListeners.push(listener);
    }

    removeLocationChangeListener(listener: (location: Location) => void) {
        let listenerIndex = this._locationListeners.indexOf(listener);
        if (listenerIndex > -1) {
            this._locationListeners.splice(listenerIndex, 1);
        }
    }
}