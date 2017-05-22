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
        $('app-layout-body').css('width', windowWidth - 280 + 'px');
        $('app-layout-body').css('height', windowHeight - 180 + 'px');

    }
}
