import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'order-info-page',
    templateUrl: './order-info.html'
})
export class ClientOrderInfoComponent implements OnInit {
    id: number;

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        // this.id = this.route.snapshot.params['id'];
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
    }
}