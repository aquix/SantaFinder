import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../../account/services/account.service';

import { SantaViewModel } from '../../data-services/view-models/santa.view-model';
import { SantasService } from '../../data-services/santas.service';

@Component({
    selector: 'client-main-page',
    templateUrl: './client-home.html',
    styleUrls: ['./client-home.scss']
})
export class ClientHomeComponent implements OnInit {
    santaList: SantaViewModel[];

    constructor(
        private router: Router,
        private accountService: AccountService,
        private santasService: SantasService
    ) { }

    ngOnInit() {
        this.santaList = this.santasService.getSantas();
    }
}