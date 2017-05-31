import { Component, OnInit } from '@angular/core';

import { TranslateService } from 'ng2-translate';

declare var Common;

declare var $: any;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private translate: TranslateService) { 
        Common.startLoading();
    }
    ngOnInit() {
        // 简陋的根据屏幕大小定右边内容容器的宽高
        const windowWidth = window.innerWidth,
            windowHeight = window.innerHeight;
        $('.app-body, .body-footer').css('width', windowWidth - 246 + 'px');
        $('.app-body').css('height', windowHeight - 111 + 'px');

        // 国际化处理，现在只做中英文的
        this.translate.addLangs(["zh", "en"]);
        this.translate.setDefaultLang('zh');
        const browserLang = this.translate.getBrowserLang();
        // console.log("检测到的浏览器语言>" + browserLang);
        this.translate.use(browserLang.match(/zh|en/) ? browserLang : 'zh');
    }
}
