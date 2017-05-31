import { Component, OnInit, ViewChild } from '@angular/core';

import { TabControlServiceModal } from './TabControlServiceModal';
import { TabControlService } from './tabControl.service';
import { Md2Tabs } from './tabs';


@Component({
    selector: 'app-layout-tab',
    templateUrl: 'tab.component.html',
    styleUrls: ['tab.component.css'],
})
export class TabComponent implements OnInit {
    tabsModel: TabControlServiceModal;
    reallyTab: any;
    @ViewChild(Md2Tabs)
    private md2Tabs: Md2Tabs;
    constructor(
        private tabControlService: TabControlService
    ) { }

    ngOnInit(): void {
        this.tabsModel = this.tabControlService.tabsModel;
    }

    goToTab(menuTab) {
        this.tabControlService.goToTab(menuTab);
    }

    closeTab(tab: any) {
        this.tabControlService.closeTab(tab);
    }
};
