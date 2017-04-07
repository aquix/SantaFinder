import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'photo-uploader',
    templateUrl: './photo-uploader.html',
    styleUrls: ['./photo-uploader.scss']
})
export class PhotoUploaderComponent implements OnInit {
    @Input() caption = '';
    preview: string;

    @ViewChild('fileInput') fileInput: ElementRef;

    private _photo: any;

    constructor() { }

    ngOnInit() { }

    get photo() {
        return this._photo;
    }

    onPhotoChanged(event: any) {
        if (!event.target.files) {
            return;
        }

        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            this.preview = e.target['result'];
            this._photo = file;
        };

        reader.readAsDataURL(file);
    }

    deleteImage() {
        this.fileInput.nativeElement.value = '';
        this.preview = null;
        this._photo = null;
    }
}
