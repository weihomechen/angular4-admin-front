import { Injectable } from '@angular/core';
import { Menu } from '../../nav/menu';
import { TabControlServiceModal } from './TabControlServiceModal';

@Injectable()
export class TabControlService {
    tabControlServiceModal: TabControlServiceModal = {
        tabs: [{ 'name': '首页', 'link': '/home' }],
        activeTab: 0
    };
    isExist(menu) {
        if (!menu.link) {
            return true;
        } else {
            let i = this.tabControlServiceModal.tabs.length;
            while (i--) {
                if (this.tabControlServiceModal.tabs[i].link === menu.link) {
                    this.tabControlServiceModal.activeTab = i;
                    return true;
                }
            }
            return false;
        }
    }

    newTab(menu: Menu) {
        if (!this.isExist(menu)) {
            this.tabControlServiceModal.tabs.push(menu);
            let i = this.tabControlServiceModal.tabs.length;
            setTimeout(() => this.tabControlServiceModal.activeTab = i - 1);
        }
    }

    closeTab(tab: Menu) {
        for (let i = 0, l = this.tabControlServiceModal.tabs.length; i < l; i++) {
            if (this.tabControlServiceModal.tabs[i] === tab
                && this.tabControlServiceModal.activeTab === i) {
                this.tabControlServiceModal.tabs.splice(i, 1);
                this.tabControlServiceModal.activeTab = i - 1;
                break;
            } else if (this.tabControlServiceModal.tabs[i] === tab
                && this.tabControlServiceModal.activeTab > i) {
                this.tabControlServiceModal.tabs.splice(i, 1);
                this.tabControlServiceModal.activeTab -= 1;
                break;
            } else if (this.tabControlServiceModal.tabs[i] === tab) {
                this.tabControlServiceModal.tabs.splice(i, 1);
                break;
            }
        }
    }
}
