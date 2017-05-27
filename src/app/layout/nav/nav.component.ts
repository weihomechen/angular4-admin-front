import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Menu } from './menu';
import { MenuService } from './menu.service';
import { TabControlService } from '../header/tab/tabControl.service';

@Component({
    selector: 'app-layout-nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.css']
})
export class NavComponent implements OnInit {
    menus: Menu[];

    constructor(
        private menuService: MenuService,
        private tabControlService: TabControlService
    ) { }

    ngOnInit(): void {
        this.getMenus();
    }

    getMenus(): void {
        this.menuService
            .getMenus()
            .subscribe(menus => this.menus = menus);
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
