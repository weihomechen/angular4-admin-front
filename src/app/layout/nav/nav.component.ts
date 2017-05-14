import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { Menu } from './menu';
import { MenuService } from './menu.service';
import { TabControlService } from '../header/tab/tabControl.service';

@Component({
    selector: 'app-layout-nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.css']
})
export class NavComponent implements OnInit, AfterViewInit {
    menus: Menu[];
    error: any;
    ishidden = true;
    mydrawer: any;
    @ViewChild('mainLayout') layout: ElementRef;
    constructor(private menuService: MenuService,
        private tabControlService: TabControlService
    ) { }

    getMenus(): void {
        this.menuService
            .getMenus()
            .then(menus => this.menus = menus)
            .catch(error => this.error = error);
    }

    ngAfterViewInit() {
        // this.mydrawer = this.layout;
    }

    ngOnInit(): void {
        this.getMenus();
    }

    openTopMenuTab(menu, secondNav, expandIcon) {
        if (menu.link) {
            this.tabControlService.newTab(menu);
        } else {
            this.secondMenuToggle(secondNav, expandIcon);
        }
    }

    openSecMenuTab(menu) {
        this.tabControlService.newTab(menu);
    }

    openThirdMenuTab(menu, secondNav, expandIcon) {
        // this.secondMenuToggle(secondNav, expandIcon);
        this.tabControlService.newTab(menu);
    }

    secondMenuToggle(secondNav, expandIcon) {
        secondNav.hidden = !secondNav.hidden;
        if (expandIcon && !secondNav.hidden) {
            expandIcon.innerText = 'keyboard_arrow_down';
        } else {
            expandIcon.innerText = 'keyboard_arrow_left';
        }
    }

    thirdMenuToggle(secMenu, thirdNav) {
        thirdNav.style.left = secMenu.offsetLeft + secMenu.offsetWidth - 35 + 'px';
        thirdNav.hidden = !thirdNav.hidden;
    }

};
