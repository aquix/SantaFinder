import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

import './photo-uploader.scss';

@Component({
    selector: 'photo-uploader',
    template: require('./photo-uploader.html')
})
export class PhotoUploaderComponent implements OnInit {
    @Input() caption: string = 'Upload your photo here';
    preview: string;

    @ViewChild('fileInput') fileInput: ElementRef;

    private _photo: any;

    constructor() { }

    ngOnInit() { }

    get photo() {
        return this._photo;
    }

    onPhotoChanged(event: any) {
        console.log('photo changed');
        if (!event.target.files) {
            return;
        }

        let file = event.target.files[0];
        if (!file) {
            return;
        }

        let reader = new FileReader();

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