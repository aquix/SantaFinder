import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../../account/services/account.service';

import { SantaViewModel } from '../../data-services/view-models/santa.view-model';
import { SantasService } from '../../data-services/santas.service';

import './client-home.scss';

@Component({
    selector: 'client-main-page',
    template: require('./client-home.html')
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