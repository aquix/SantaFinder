import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'sf-modal-window',
    templateUrl: './modal-window.component.html',
    styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit, OnDestroy {
    @Output() onCloseClick = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        console.log('modal destroyed');
    }


    onCloseButtonClick() {
        this.onCloseClick.emit();
    }
}
