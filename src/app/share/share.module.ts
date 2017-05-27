import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdlModule } from '@angular-mdl/core';

@NgModule({
    imports: [
        CommonModule,
        MdlModule
    ],
    declarations: [],
    exports: [MdlModule]
})
export class ShareModule { }
