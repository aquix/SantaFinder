import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, Input, ReflectiveInjector } from '@angular/core';
import { ModalWindowsService } from '../modal-windows.service';
import { ConfirmationWindowComponent } from 'app/core/modal-windows/confirmation-window/confirmation-window.component';

@Component({
    selector: 'sf-modal-window-host',
    templateUrl: './modal-window-host.component.html',
    styleUrls: ['./modal-window-host.component.scss'],
    entryComponents: [
        ConfirmationWindowComponent
    ]
})
export class ModalWindowHostComponent implements OnInit {
    currentComponent = null;
    isModalVisible = false;
    @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

    constructor(
        private modalWindowsService: ModalWindowsService,
        private resolver: ComponentFactoryResolver,
    ) { }

    ngOnInit() {
        this.modalWindowsService.onModalWindowCreated.subscribe(this.createComponent.bind(this));
        this.modalWindowsService.onModalWindowDestroyed.subscribe(this.destroyModal.bind(this));
    }

    createComponent(data: { component: any, inputs: any, outputs: any }) {
        if (!data) {
            return;
        }

        this.isModalVisible = true;

        const inputProviders = Object.keys(data.inputs).map(
            (inputName) => { return { provide: inputName, useValue: data.inputs[inputName] }; }
        );
        const resolvedInputs = ReflectiveInjector.resolve(inputProviders);

        const injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);
        const factory = this.resolver.resolveComponentFactory(data.component);
        const component = factory.create(injector);

        for (const outputName in data.outputs) {
            component.instance[outputName].subscribe(data.outputs[outputName]);
        }

        this.dynamicComponentContainer.insert(component.hostView);

        if (this.currentComponent) {
            this.currentComponent.destroy();
        }

        this.currentComponent = component;
    }

    onCloseButtonClick() {
        this.destroyModal();
    }

    private destroyModal() {
        if (this.currentComponent) {
            this.currentComponent.destroy();
        }

        this.isModalVisible = false;
    }
}
