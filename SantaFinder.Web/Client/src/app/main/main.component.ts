import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthInfoStorage } from '../auth/auth-info-storage.service';

@Component({
    templateUrl: './main.html'
})
export class MainComponent implements OnInit {
    constructor(
        private router: Router,
        private authInfoStorage: AuthInfoStorage
    ) {
        console.log('main ctor');
    }

    ngOnInit() {
        console.log('main init');
        this.router.navigate(['/client']);
    }
}