import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MdlModule } from '@angular-mdl/core';

import { HeaderComponent } from './header/header.component';
import { TabComponent } from './header/tab/tab.component';
import { Md2TabsModule } from "./header/tab/tabs";
import { NavComponent } from './nav/nav.component';
import { BodyComponent } from './body/body.component';
import { MenuService } from './nav/menu.service';

@NgModule({
    imports: [
        CommonModule, MdlModule, RouterModule, Md2TabsModule
    ],
    declarations: [HeaderComponent, BodyComponent, NavComponent, TabComponent],
    providers: [
        MenuService
    ],
    exports: [
        HeaderComponent, NavComponent, BodyComponent
    ]
})
export class LayoutModule { }
