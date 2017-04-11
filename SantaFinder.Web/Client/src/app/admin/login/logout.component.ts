import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

@Component({
    template: ''
})
export class LogoutComponent implements OnInit {
    constructor(
        private router: Router,
        private loginService: LoginService
    ) { }

    ngOnInit() {
        this.loginService.logout();
        this.router.navigate(['/admin']);
    }
}
