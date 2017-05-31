import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../nav/menu';
import { TabControlServiceModal } from './TabControlServiceModal';

declare var Common: any;

@Injectable()
export class TabControlService {
    tabsModel: TabControlServiceModal = {
        tabs: [{ 'name': '首页', 'link': '/home' }],
        activeTab: 0
    };
    tabs = this.tabsModel.tabs;
    routeParams;
    constructor(private router: Router) { }

    // 单纯判断目标tab是否已经存在
    isExist(link: string): boolean {
        let isExist = false;
        for (const tab of this.tabs) {
            if (tab.link === link) {
                isExist = true;
                break;
            }
        }
        return isExist;
    }

    // 是否新增tab
    newTab(menu: Menu) {
        let isNew = true;
        this.tabs.forEach((item, index) => {
            if (item.link === menu.link) {
                isNew = false;
                this.router.navigate([menu.link]);
                this.tabsModel.activeTab = index;
            }
        });
        if (isNew) {
            this.tabs.push(menu);
            const i = this.tabs.length;
            const navigateArr: any[] = [menu.link];
            if (menu.params) {
                navigateArr.push(menu.params);
            }
            this.routeParams = {};
            if (menu.fragment) {
                this.routeParams = {
                    fragment: menu.fragment
                }
            }
            navigateArr.push({ reuse: 'false' });
            this.router.navigate(navigateArr);
            setTimeout(() => this.tabsModel.activeTab = i - 1);
        }
    }

    // 跳转到tab
    goToTab(tabMenu: Menu = this.tabs[this.tabsModel.activeTab]) {
        const navigateArr: any[] = [tabMenu.link];
        if (tabMenu.params) {
            navigateArr.push(tabMenu.params);
        }
        this.router.navigate(navigateArr);
        this.tabsModel.activeTab = this.tabs.findIndex(tab => tab === tabMenu);
    }

    // 跳转到tab
    goToTabByUrl(url: string, param?: string) {
        const navigateArr: any[] = [url];
        if (param) {
            navigateArr.push(param);
        }
        this.router.navigate(navigateArr);
        this.tabsModel.activeTab = this.tabs.findIndex(tab => tab.link === url);
    }

    // 刷新当前页
    reloadNowPage() {
        // Common.startLoading();
        let nowLink = window.location.pathname,
            link;
        if (~nowLink.indexOf(';')) {
            link = nowLink.substr(0, nowLink.indexOf(';'));
        }else {
            link = nowLink;
        }
        if (~nowLink.indexOf('foo')) {
            this.router.navigate([link, { reuse: 'false' }]);
        } else {
            this.router.navigate([link, { reuse: 'false', 'foo': '' }]);
        }
    };

    // 关闭所有
    closeAll() {
        this.tabs.length = 1;
        this.tabsModel.activeTab = 0;
        this.router.navigate(['/home']);
    }

    // 关闭其他
    closeOther() {
        if (this.tabs.length === 1) {
            this.closeAll();
            return;
        }
        const retainList = [],
            currentTabIndex = this.tabsModel.activeTab;
        retainList.push(this.tabs[0]);
        retainList.push(this.tabs[currentTabIndex]);
        this.tabs = retainList;
        this.tabsModel.activeTab = 1;
        this.router.navigate([this.tabs[1].link]);
    }

    // 关闭tab
    closeTab(tab: Menu = this.tabs[this.tabsModel.activeTab]) {
        if (this.tabs.length === 1) {
            return;
        }
        this.tabs.forEach((tabItem, index) => {
            if (tabItem === tab) {
                this.tabs.splice(index, 1);
                if (this.tabsModel.activeTab === index) {
                    this.tabsModel.activeTab = index - 1;
                } else if (this.tabsModel.activeTab > index) {
                    this.tabsModel.activeTab -= 1;
                }
                const link = this.tabs[this.tabsModel.activeTab].link;
                this.router.navigate([link]);
            }
        });
    }

    getRouteParams() {
        return this.routeParams;
    }
}
