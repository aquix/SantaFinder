import { Component, OnInit, Input } from '@angular/core';

import { SantaViewModel } from '../../../data-services/view-models/santa.view-model';

@Component({
    selector: 'santa-preview-list',
    template: require('./santa-preview-list.component.html'),
    styleUrls: ['./santa-preview-list.scss']
})
export class SantaPreviewListComponent implements OnInit {
    @Input() data: SantaViewModel[];

    constructor() { }

    ngOnInit() { }
}