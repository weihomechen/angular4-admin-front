import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { NavComponent } from './nav/nav.component';
import { TabComponent } from './body/tab/tab.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HeaderComponent, BodyComponent, NavComponent, TabComponent]
})
export class LayoutModule { }
