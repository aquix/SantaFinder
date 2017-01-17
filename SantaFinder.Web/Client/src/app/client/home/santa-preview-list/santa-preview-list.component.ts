import { Component, OnInit, Input } from '@angular/core';

import { Santa } from '../../../data-services/view-models/santa.view-model';

@Component({
    selector: 'santa-preview-list',
    templateUrl: './santa-preview-list.component.html',
    styleUrls: ['./santa-preview-list.scss']
})
export class SantaPreviewListComponent implements OnInit {
    @Input() data: Santa[];

    constructor() { }

    ngOnInit() { }
}