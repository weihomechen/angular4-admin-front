import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    ngOnInit() {
        const windowWidth = window.innerWidth,
            windowHeight = window.innerHeight;
        $('.app-body, .body-footer').css('width', windowWidth - 246 + 'px');
        $('.app-body').css('height', windowHeight - 121 + 'px');
    }
}
