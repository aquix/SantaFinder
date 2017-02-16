import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'santa-order-details',
    templateUrl: 'santa-order-details.html'
})
export class SantaOrderDetailsComponent implements OnInit {
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