import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TabControlServiceModal } from './TabControlServiceModal';
import { TabControlService } from './tabControl.service';
import { Md2Tabs } from './tabs';


@Component({
    selector: 'app-layout-tab',
    templateUrl: 'tab.component.html',
    styleUrls: ['tab.component.css'],
})
export class TabComponent implements OnInit {
    tabControlServiceModal: TabControlServiceModal;
    reallyTab: any;
    @ViewChild(Md2Tabs)
    private md2Tabs: Md2Tabs;
    constructor(
        private tabControlService: TabControlService,
        private router: Router) { }
    ngOnInit(): void {
        this.tabControlServiceModal = this.tabControlService.tabControlServiceModal;
    }

    closeTab(tab: any) {
        this.tabControlService.closeTab(tab);
        let i = this.tabControlServiceModal.activeTab;
        let link = this.tabControlServiceModal.tabs[i].link;
        this.router.navigate([link]);
        this.md2Tabs.adjustOffset(i);
        setTimeout(() => this.md2Tabs._updateInkBar());
    }

    closeAll() {
        this.tabControlServiceModal.tabs.length = 1;
        this.tabControlServiceModal.activeTab = 0;
        this.router.navigate(['/']);
        this.md2Tabs.adjustOffset(0);
    }
};
