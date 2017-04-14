import { Injectable } from '@angular/core';
import { Client } from './client.model';
import { AuthHttp } from 'app/core/auth';
import { AppConfig } from 'app/app.config';
import { RestService } from '../shared/rest-service';

@Injectable()
export class AdminClientsService extends RestService {
    constructor(
        authHttp: AuthHttp,
        config: AppConfig
    ) {
        super(authHttp, `${config.apiPath}/admin/clients`);
    }

    public create(newClient: Client) {
        return super.createAny(newClient);
    }

    public edit(client: Client) {
        return super.editAny(client.id, client);
    }
}
