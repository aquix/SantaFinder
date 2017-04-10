import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from 'app/admin/admin.routing';

@NgModule({
    imports: [
        AdminRoutingModule
    ],
    exports: [],
    declarations: [AdminComponent],
    providers: [],
})
export class AdminModule { }
