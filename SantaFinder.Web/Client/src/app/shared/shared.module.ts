import { NgModule } from '@angular/core';

import { AddressPipe, DatetimePipe } from './pipes';
import { NavbarComponent } from './navbar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalWindowComponent } from './modal-window/modal-window.component';

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
        DatetimePipe,
        ModalWindowComponent
    ],
    providers: [],
})
export class SharedModule { }
