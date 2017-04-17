import { NgModule, ModuleWithProviders } from '@angular/core';

import { ModalWindowsService } from './modal-windows.service';
import { ModalWindowHostComponent } from './modal-window-host/modal-window-host.component';
import { ConfirmationWindowComponent } from './confirmation-window/confirmation-window.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        ModalWindowHostComponent,
        ConfirmationWindowComponent
    ],
    declarations: [
        ModalWindowHostComponent,
        ConfirmationWindowComponent
    ],
    providers: [],
})
export class ModalWindowsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ModalWindowsModule,
            providers: [
                ModalWindowsService
            ]
        };
    }
}
