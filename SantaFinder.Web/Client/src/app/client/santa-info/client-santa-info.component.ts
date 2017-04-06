import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { SantaFullInfoForClient } from './santa-full-info-for-client';
import { FeedbackItem } from './feedback-item';
import { SantasService } from '../../core/data-services';

@Component({
    selector: 'client-santa-info-page',
    templateUrl: './client-santa-info.html',
    styleUrls: ['./client-santa-info.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientSantaInfoComponent implements OnInit {
    id: string;
    santaInfo: SantaFullInfoForClient;
    feedbacks: FeedbackItem[];
    allFeedbacksLoaded: boolean = false;

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
            this.feedbacks = this.santaInfo.feedbacks.slice();
        }, console.log);
    }

    onFeedbacksBottomReached() {
        if (this.allFeedbacksLoaded) {
            return;
        }

        this.santasService.loadNextFeedbacks(this.id, this.feedbacks.length).subscribe((data: FeedbackItem[]) => {
            if (data.length === 0) {
                this.allFeedbacksLoaded = true;
            } else {
                this.feedbacks = this.feedbacks.concat(data);
            }
        });
    }
}