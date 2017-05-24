import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdlModule } from '@angular-mdl/core';
import { MaterialModule } from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        MdlModule,
        MaterialModule
    ],
    declarations: [],
    exports: [MdlModule, MaterialModule]
})
export class ShareModule { }
