import { Observable } from 'rxjs/Observable';

import { AuthHttp } from 'app/core/auth';
import { AppConfig } from 'app/app.config';

export abstract class RestService {
    protected resourceUrl: string;

    constructor(
        private authHttp: AuthHttp,
        resourceUrl: string
    ) {
        this.resourceUrl = resourceUrl;
    }

    public getAll(startIndex: number = 0, count: number = 0) {
        return this.authHttp
            .get(`${this.resourceUrl}?startIndex=${startIndex}&count=${count}`)
            .map(res => res.json());
    }

    public get(id: string) {
        return this.authHttp
            .get(`${this.resourceUrl}/${id}`)
            .map(res => res.json());
    }

    abstract create(model): Observable<any>;

    protected createAny(newModel) {
        return this.authHttp
            .post(this.resourceUrl, newModel)
            .switchMap(res => res.json());
    }

    abstract edit(model): Observable<any>;

    protected editAny(id: string, model) {
        return this.authHttp
            .put(`${this.resourceUrl}/${id}`, model)
            .map(res => res.json());
    }

    public delete(id: string) {
        return this.authHttp
            .delete(`${this.resourceUrl}/${id}`)
            .map(res => res.json());
    }
}
