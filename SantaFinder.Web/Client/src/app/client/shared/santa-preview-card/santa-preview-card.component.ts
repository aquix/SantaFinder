import { Component, OnInit, Input } from '@angular/core';
import { Santa } from '../../../data-services/view-models/santa.view-model';

@Component({
    selector: 'santa-preview-card',
    templateUrl: 'santa-preview-card.html',
    styleUrls: ['./santa-preview-card.scss']
})
export class SantaPreviewCardComponent implements OnInit {
    @Input() santa: Santa;
    constructor() { }

    ngOnInit() { }
}