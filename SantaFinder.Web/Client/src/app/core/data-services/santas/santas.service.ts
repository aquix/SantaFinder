import { Injectable } from '@angular/core';

import { AuthHttp } from '../../auth';
import { AppConfig } from '../../../app.config';

@Injectable()
export class SantasService {

    constructor(
        private authHttp: AuthHttp,
        private config: AppConfig,
    ) { }

    getSantas(count, page = 0) {
        return this.authHttp.get(`${this.config.apiPath}/santas?count=${count}&page=${page}`).map(res => {
            return res.json();
        }, err => {
            return ('error' + JSON.stringify(err));
        });
    }

    getSantaFullInfo(santaId: string) {
        return this.authHttp.get(`${this.config.apiPath}/santaFullInfo/${santaId}`).map(res => {
            return res.json();
        }, err => {
            return ('error' + JSON.stringify(err));
        });
    }

    loadNextFeedbacks(santaId: string, startIndex: number) {
        return this.authHttp.get(`${this.config.apiPath}/santaFullInfo/${santaId}/loadFeedbacks?startIndex=${startIndex}`).map(res => {
            return res.json();
        }, err => {
            return ('error' + JSON.stringify(err));
        });
    }
 }
