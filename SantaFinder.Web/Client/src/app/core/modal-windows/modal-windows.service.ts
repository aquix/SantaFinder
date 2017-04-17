import { Injectable, EventEmitter, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { ConfirmationWindowComponent } from 'app/core/modal-windows/confirmation-window/confirmation-window.component';
import { ConfirmationWindowConfiguration } from 'app/core/modal-windows/confirmation-window/confirmation-window-configuration';

@Injectable()
export class ModalWindowsService {
    onModalWindowCreated = new EventEmitter<{ component: any, inputs: any, outputs: any }>();
    onModalWindowDestroyed = new EventEmitter();

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    showAlert() {

    }

    showConfirmation(data: ConfirmationWindowConfiguration) {
        this.onModalWindowCreated.emit({
            component: ConfirmationWindowComponent,
            inputs: {
                text: data.text,
                okText: data.okText || 'Ok',
                cancelText: data.cancelText || 'Cancel'
            },
            outputs: {
                ok: () => {
                    data.ok();
                    this.onModalWindowDestroyed.emit();
                },
                cancel: () => {
                    if (data.cancel) {
                        data.cancel();
                    }
                    this.onModalWindowDestroyed.emit();
                }
            }
        });
    }
}
