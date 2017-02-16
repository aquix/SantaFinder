import { Injectable } from '@angular/core';

import { AuthHttp } from '../auth/auth-http.service';
import { AppConfig } from '../app.config';

@Injectable()
export class SantasService {

    constructor(
        private authHttp: AuthHttp
    ) { }

    getSantas(count, page = 0) {
        return this.authHttp.get(`${AppConfig.API_PATH}/santas?count=${count}&page=${page}`).map(res => {
            return res.json();
        }, err => {
            return ('error' + JSON.stringify(err));
        });
    }

    getSantaFullInfo(santaId: string) {
        return this.authHttp.get(`${AppConfig.API_PATH}/santaFullInfo/${santaId}`).map(res => {
            return res.json();
        }, err => {
            return ('error' + JSON.stringify(err));
        });
    }

    loadNextFeedbacks(santaId: string, startIndex: number) {
        return this.authHttp.get(`${AppConfig.API_PATH}/santaFullInfo/${santaId}/loadFeedbacks?startIndex=${startIndex}`).map(res => {
            return res.json();
        }, err => {
            return ('error' + JSON.stringify(err));
        });
    }
 }