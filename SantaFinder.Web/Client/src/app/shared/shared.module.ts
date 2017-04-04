import { NgModule } from '@angular/core';

import { AddressPipe, DatetimePipe } from './pipes';
import { NavbarComponent } from './navbar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    exports: [
        NavbarComponent,
        AddressPipe,
        DatetimePipe
    ],
    declarations: [
        NavbarComponent,

        AddressPipe,
        DatetimePipe
    ],
    providers: [],
})
export class SharedModule { }
