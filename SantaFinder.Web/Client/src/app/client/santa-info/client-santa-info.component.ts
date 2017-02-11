import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { SantasService } from '../../data-services/santas.service';
import { SantaFullInfoForClient } from '../../data-services/view-models/santa-full-info/santa-full-info-for-client';

@Component({
    selector: 'client-santa-info-page',
    templateUrl: './client-santa-info.html',
    styleUrls: ['./client-santa-info.scss']
})
export class ClientSantaInfoComponent implements OnInit {
    id: string;
    santaInfo: SantaFullInfoForClient;

    constructor(
        private route: ActivatedRoute,
        private santasService: SantasService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        this.santasService.getSantaFullInfo(this.id).subscribe((data: SantaFullInfoForClient) => {
            this.santaInfo = data;
        }, console.log);
    }
}