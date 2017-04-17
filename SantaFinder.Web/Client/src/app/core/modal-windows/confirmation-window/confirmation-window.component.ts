import { Component, OnInit, Input, Injector, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'sf-confirmation-window',
    templateUrl: './confirmation-window.component.html',
    styleUrls: ['./confirmation-window.component.scss']
})
export class ConfirmationWindowComponent implements OnInit {
    @Input() text = '';
    @Input() okText = '';
    @Input() cancelText = '';

    @Output() ok = new EventEmitter();
    @Output() cancel = new EventEmitter();

    constructor(private injector: Injector) {
        this.text = this.injector.get('text');
        this.okText = this.injector.get('okText');
        this.cancelText = this.injector.get('cancelText');
    }

    ngOnInit() {
    }

    onOkButtonClick() {
        this.ok.emit();
    }

    onCancelButtonClick() {
        this.cancel.emit();
    }
}
