import {
    AfterContentInit,
    Component,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    QueryList,
    TemplateRef,
    ViewContainerRef,
    ViewEncapsulation,
    NgModule,
    ModuleWithProviders,
    OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ShareModule } from '../../../share/share.module';
import { MdlModule } from '@angular-mdl/core';

import { TabControlServiceModal } from './TabControlServiceModal';

import { TabControlService } from './tabControl.service';
import { Menu } from '../../nav/menu';

export class Md2TabChangeEvent {
    index: number;
    tab: Md2Tab;
}

@Directive({ selector: '[md2Transclude]' })
export class Md2Transclude {
    private _md2Transclude: TemplateRef<any>;
    constructor(public viewRef: ViewContainerRef) { }
    @Input()
    private set md2Transclude(templateRef: TemplateRef<any>) {
        this._md2Transclude = templateRef;
        if (templateRef) {
            this.viewRef.createEmbeddedView(templateRef);
        }
    }
    private get md2Transclude() {
        return this._md2Transclude;
    }
}

@Component({
    selector: 'md2-tab',
    template: `<ng-content></ng-content>`,
    host: {
        '[class]': 'class',
        '[class.active]': 'active'
    }
})
export class Md2Tab {
    @Input() label: string;
    @Input() active: boolean;
    @Input() disabled: boolean;
    @Input() class: string;
    @Input() reallyTab;
    public labelRef: TemplateRef<any>;
}

@Directive({ selector: '[md2-tab-label]' })
export class Md2TabLabel {
    constructor(public templateRef: TemplateRef<any>, tab: Md2Tab) {
        tab.labelRef = templateRef;
    }
}

@Component({
    selector: 'md2-tabs',
    template: `
    <div class="md2-tabs-header-wrapper">
      <div role="button" class="md2-prev-button" [class.disabled]="!canPageBack()" *ngIf="shouldPaginate" (click)="previousPage()">
        <em class="prev-icon">Prev</em>
      </div>
      <div role="button" class="md2-next-button" *ngIf="shouldPaginate" (click)="nextPage()">
        <em class="next-icon">Next</em>
      </div>
      <div class="md2-tabs-canvas" [class.md2-paginated]="shouldPaginate" role="tablist" tabindex="0" (mousewheel)="scroll($event)">
        <div class="md2-tabs-header" [style.marginLeft]="-offsetLeft + 'px'">
          <div class="md2-tab-label" role="tab" *ngFor="let tab of tabs; let i = index" [class.active]="selectedIndex === i" 
                [class.disabled]="tab.disabled" (click)="goToTab(tab.reallyTab)">
            <span [md2Transclude]="tab.labelRef">{{tab.label}}</span>
          </div>
          <button mdl-button #btn1="mdlButton" (click)="m1.toggle($event, btn1)" id="tab_manage_btn" mdl-ripple>
             <i class="fa fa-sort-down fa-lg white"></i>
          </button>
          <mdl-menu #m1="mdlMenu" mdl-menu-position="bottom-left">
             <mdl-menu-item mdl-ripple mdl-menu-item-full-bleed-divider (click)="reloadNowPage()">刷新当前页</mdl-menu-item>
             <mdl-menu-item mdl-ripple mdl-menu-item-full-bleed-divider (click)="closeAll()">关闭所有选项卡</mdl-menu-item>
             <mdl-menu-item mdl-ripple mdl-menu-item-full-bleed-divider (click)="closeOther()">关闭其它选项卡</mdl-menu-item>
             <mdl-menu-item mdl-ripple mdl-menu-item-full-bleed-divider (click)="closeNow()">关闭当前选项卡</mdl-menu-item>
          </mdl-menu>
          <div class="md2-tab-ink-bars" [style.left]="inkBarLeft" [style.width]="inkBarWidth"></div>
        </div>
      </div>
       
    </div>
  `,
    styleUrls: ['tab.component.css'],
    host: {
        '[class]': 'class',
        '(window:resize)': 'onWindowResize($event)'
    },
    encapsulation: ViewEncapsulation.None
})
export class Md2Tabs implements OnInit, AfterContentInit {
    @ContentChildren(Md2Tab) tabs: QueryList<Md2Tab>;
    private _isInitialized = false;
    private _focusIndex = 0;
    private _selectedIndex = 0;
    private shouldPaginate = false;
    private offsetLeft = 0;
    private inkBarLeft = '0';
    private inkBarWidth = '0';
    tabsModel: TabControlServiceModal;
    @Input() class: string;
    @Input()
    set selectedIndex(value: any) {
        if (typeof value === 'string') { value = parseInt(value, 10); }
        if (value !== this._selectedIndex) {
            this._selectedIndex = value;
            this.adjustOffset(value);
            this._updateInkBar();
            if (this.tabs) {
                const tabs = this.tabs.toArray();
                if (!tabs[value].disabled) {
                    tabs.forEach(tab => tab.active = false);
                    tabs[value].active = true;
                }
            }
            if (this._isInitialized) {
                this.change.emit(this._createChangeEvent(value));
            }
        }
    }
    get selectedIndex() { return this._selectedIndex; }
    get focusIndex(): number { return this._focusIndex; }
    set focusIndex(value: number) {
        this._focusIndex = value;
        this.adjustOffset(value);
        this._updateInkBar();
    }
    get element() {
        const elements: any = { root: this.elementRef.nativeElement, wrapper: null, canvas: null, paging: null, tabs: null };
        elements.wrapper = elements.root.querySelector('.md2-tabs-header-wrapper');
        elements.canvas = elements.wrapper.querySelector('.md2-tabs-canvas');
        elements.paging = elements.canvas.querySelector('.md2-tabs-header');
        elements.tabs = elements.paging.querySelectorAll('.md2-tab-label');
        return elements;
    }
    @Output() change: EventEmitter<Md2TabChangeEvent> = new EventEmitter<Md2TabChangeEvent>();

    constructor(private elementRef: ElementRef,
        private router: Router,
        private tabControlService: TabControlService) { }

    ngOnInit(): void {
        this.tabsModel = this.tabControlService.tabsModel;
        this.element.canvas.style.width = 1240 + 'px';
        this.router.navigateByUrl('home');
    }

    /**
     * 点击Tab时激活并路由到相应组件,tab切换应该进行还原
     */
    goToTab(menuTab: Menu) {
       this.tabControlService.goToTab(menuTab);
    }

    // tab管理菜单
    // 刷新当前页
    reloadNowPage() {
        this.tabControlService.reloadNowPage();
    }
    // 关闭所有页面
    closeAll() {
        this.tabControlService.closeAll();
    }

    // 关闭其它页面
    closeOther() {
        this.tabControlService.closeOther();
    }

    // 关闭当前页面
    closeNow() {
        this.tabControlService.closeTab();
    }

    /**
     * 判断激活的Tab并调整Tabs的位移，不存在时设为默认
     */
    ngAfterContentInit() {
        setTimeout(() => {
            const tabs = this.tabs.toArray();
            if (this.selectedIndex) {
                tabs.forEach(tab => tab.active = false);
                tabs[this.selectedIndex].active = true;
                this.adjustOffset(this.selectedIndex);
            } else {
                let index = tabs.findIndex((t: any) => t.active);
                if (index < 0) {
                    tabs[0].active = true;
                } else {
                    this.selectedIndex = index;
                }
            }
            // this._updateInkBar();
        }, 0);
        this._isInitialized = true;
    }

    /**
     * 激活的Tab下边框计算
     */
    _updateInkBar(activeIndex?: number): void {
        const elements = this.element;
        if (!elements.tabs[this.tabsModel.activeTab]) { return; }
        const index = activeIndex || this.tabsModel.activeTab;
        const tab = elements.tabs[index];
        this.inkBarLeft = tab.offsetLeft + 'px';
        this.inkBarWidth = tab.offsetWidth + 'px';
    }

    /**
     * 获取改变后的Tab
     * @param index
     * @return event of Md2TabChangeEvent
     */
    private _createChangeEvent(index: number): Md2TabChangeEvent {
        const event = new Md2TabChangeEvent;
        event.index = index;
        if (this.tabs && this.tabs.length) {
            event.tab = this.tabs.toArray()[index];
        }
        return event;
    }

    /**
     * Tabs使用鼠标滚轮滚动
     * @param event
     */
    scroll(event: any) {
        if (!this.shouldPaginate) { return; }
        event.preventDefault();
        this.offsetLeft = this.fixOffset(this.offsetLeft - event.wheelDelta);
    }

    /**
     * 下一页
     */
    nextPage() {
        const elements = this.element,
            viewportWidth = elements.canvas.clientWidth,
            totalWidth = viewportWidth + this.offsetLeft;
        let i: number, tab: any;
        for (i = 0; i < elements.tabs.length; i++) {
            tab = elements.tabs[i];
            if (tab.offsetLeft + tab.offsetWidth > totalWidth) { break; }
        }
        this.offsetLeft = this.fixOffset(tab.offsetLeft);
    }

    /**
     * 上一页
     */
    previousPage() {
        let i: number, tab: any, elements = this.element;

        for (i = 0; i < elements.tabs.length; i++) {
            tab = elements.tabs[i];
            if (tab.offsetLeft + tab.offsetWidth >= this.offsetLeft) { break; }
        }
        this.offsetLeft = this.fixOffset(tab.offsetLeft + tab.offsetWidth - elements.canvas.clientWidth);
    }

    /**
     * 窗口改变后重新计算是否分页，tabs的位移调整
     * @param event
     */
    onWindowResize(event: Event) {
        this.updatePagination();
        this.offsetLeft = this.fixOffset(this.offsetLeft);
        this._updateInkBar();
    }

    /**
     * 判断下一页按钮是否可用
     */
    canPageBack() { return this.offsetLeft > 0; }

    /**
     * 判断上一页按钮是否可用
     */
    canPageForward() {
        let elements = this.element;
        let lastTab = elements.tabs[elements.tabs.length - 1];
        return lastTab && lastTab.offsetLeft + lastTab.offsetWidth > elements.canvas.clientWidth +
            this.offsetLeft;
    }

    /**
     * 判断是否分页
     */
    updatePagination() {
        let canvasWidth = this.element.root.clientWidth;
        this.element.tabs.forEach((tab: any) => {
            canvasWidth -= tab.offsetWidth;
        });
        this.shouldPaginate = canvasWidth < 0;
        // TODO: need improve
        if (this.tabsModel.tabs.length <= 4) {
            this.shouldPaginate = false;
        }
    }

    /**
     * 调整tabs的位移
     * @param index
     */
    adjustOffset(index: number) {
        let elements = this.element;
        let tabsWidth = 0;
        if (!elements.tabs[index]) { return; }
        let tab = elements.tabs[index],
            left = tab.offsetLeft,
            right = tab.offsetWidth + left;
        elements.tabs.forEach((tab: any) => {
            tabsWidth += tab.offsetWidth;
        });
        this.updatePagination();
        this.offsetLeft = Math.max(this.offsetLeft, this.fixOffset(right - elements.canvas.clientWidth + 64));
        this.offsetLeft = Math.min(this.offsetLeft, this.fixOffset(left));
        setTimeout(() => {
            if (this.shouldPaginate === false) {
                this.offsetLeft = 0;
            }
        }, 0);
    }

    /**
     * Fix Offset of Tab
     * @param value
     * @return value
     */
    fixOffset(value: any) {
        let elements = this.element;
        if (!elements.tabs.length || !this.shouldPaginate) { return 0; }
        let lastTab = elements.tabs[elements.tabs.length - 1],
            totalWidth = lastTab.offsetLeft + lastTab.offsetWidth;
        value = Math.max(0, value);
        value = Math.min(totalWidth - elements.canvas.clientWidth, value);
        return value;
    }

}

export const MD2_TABS_DIRECTIVES: any[] = [Md2TabLabel, Md2Tabs, Md2Tab];

@NgModule({
    declarations: [Md2Transclude, Md2TabLabel, Md2Tabs, Md2Tab],
    imports: [CommonModule, MdlModule],
    exports: MD2_TABS_DIRECTIVES,
})
export class Md2TabsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: Md2TabsModule,
            providers: []
        };
    }
}
