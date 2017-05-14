import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MdlModule } from '@angular-mdl/core';

import { DemoComponent } from './demo/demo.component';
import { Demo1Component } from './demo1/demo1.component';
import { Demo2Component } from './demo2/demo2.component';
import { Demo3Component } from './demo3/demo3.component';

@NgModule({
    imports: [
        CommonModule, FormsModule, MdlModule
    ],
    declarations: [DemoComponent, Demo1Component, Demo2Component, Demo3Component]
})
export class DemoModule { }
