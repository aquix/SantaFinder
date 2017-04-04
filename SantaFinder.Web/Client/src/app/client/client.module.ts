import { NgModule } from '@angular/core';

import { Ng2PaginationModule } from 'ng2-pagination';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { Ng2PageTransitionModule } from 'ng2-page-transition';
import { RatingModule } from 'ngx-rating';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { ClientRoutingModule } from './client.routing';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { NotificationsModule } from '../core/notifications/notifications.module';
import { ChatModule } from '../core/chat/chat.module';

import { ClientComponent } from './client.component';
import { ClientHomeComponent } from './home/client-home.component';
import { ClientProfileComponent } from './profile/client-profile.component';
import { ClientOrderComponent } from './order/client-order.component';
import { ClientOrderHistoryComponent } from './order-history/client-order-history.component';
import { ClientOrderInfoComponent } from './order-info/order-info.component';
import { ClientSantaInfoComponent } from './santa-info/client-santa-info.component';
import { SantaPreviewListComponent } from './home/santa-preview-list/santa-preview-list.component';
import { SantaPreviewCardComponent } from './shared/santa-preview-card/santa-preview-card.component';

@NgModule({
    imports: [
        ClientRoutingModule,
        CoreModule,
        SharedModule,
        NotificationsModule,
        ChatModule,

        Ng2PaginationModule,
        AgmCoreModule,
        Ng2PageTransitionModule,
        RatingModule,
        Ng2DatetimePickerModule,
        InfiniteScrollModule
    ],
    exports: [],
    declarations: [
        ClientComponent,
        ClientHomeComponent,
        ClientOrderComponent,
        ClientProfileComponent,
        ClientOrderHistoryComponent,
        ClientOrderInfoComponent,
        ClientSantaInfoComponent,
        SantaPreviewListComponent,

        SantaPreviewCardComponent,
    ],
    providers: [],
})
export class ClientModule { }
