import { NgModule } from '@angular/core';

import { Ng2PageTransitionModule } from 'ng2-page-transition';
import { Ng2PaginationModule } from 'ng2-pagination';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { SantaRoutingModule } from './santa.routing';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ChatModule } from '../core/chat/chat.module';

import { SantaComponent } from './santa.component';
import { SantaHomeComponent } from './home/santa-home.component';
import { SantaOrderDetailsComponent } from './order-details/santa-order-details.component';
import { SantaMyOrdersComponent } from './my-orders/santa-my-orders.component';
import { SantaProfileComponent } from './profile/santa-profile.component';
import { SantaMyOrderListComponent } from './my-orders/my-order-list/santa-my-order-list.component';
import { SantaMyOrderDetailsComponent } from './my-orders/my-order-details/santa-my-order-details.component';
import { MapComponent } from './home/map/map.component';


@NgModule({
    imports: [
        SantaRoutingModule,
        CoreModule,
        SharedModule,
        ChatModule,

        Ng2PageTransitionModule,
        Ng2PaginationModule,
        AgmCoreModule,
    ],
    exports: [],
    declarations: [
        SantaComponent,
        SantaProfileComponent,
        SantaHomeComponent,
        SantaOrderDetailsComponent,
        SantaMyOrdersComponent,
        SantaMyOrderListComponent,
        SantaMyOrderDetailsComponent,
        MapComponent,
    ],
    providers: [],
})
export class SantaModule { }
