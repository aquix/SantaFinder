import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { SantasService } from '../../data-services/santas.service';
import { SantaFullInfoForClient } from '../../data-services/view-models/santa-full-info/santa-full-info-for-client';
import { FeedbackItem } from '../../data-services/view-models/santa-full-info/feedback-item';

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
        })
    }
}