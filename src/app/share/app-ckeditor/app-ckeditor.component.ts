import { Component, OnInit } from '@angular/core';
import { flyIn } from '../../animations/fly-in';
import { CKEditorComponent } from 'ng2-ckeditor';

declare var Common: any;

@Component({
    selector: 'app-app-ckeditor',
    templateUrl: './app-ckeditor.component.html',
    styleUrls: ['./app-ckeditor.component.css'],
    animations: [flyIn]
})
export class AppCkeditorComponent implements OnInit {

    ckeditorContent = '';
    config = {
        filebrowserBrowseUrl: '&&&&&',
        filebrowserUploadUrl: '这里是上传地址'
    };
    eventInfo = '';
    constructor() { }

    ngOnInit() {
    }

    onReady(event) {
        this.eventInfo = '编辑器准备就绪';
        Common.stopLoading();
    }
    onChange(event) {
        this.eventInfo = '编辑器内容发生改变';
    }

    onFocus(event) {
        // this.eventInfo = '编辑器获得焦点';
    }
    onBlur(event) {
        // this.eventInfo = '编辑器失去焦点';
    }

}
