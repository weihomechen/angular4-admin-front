import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MdlModule } from '@angular-mdl/core';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { CKEditorModule } from 'ng2-ckeditor';
import { AngularEchartsModule } from 'ngx-echarts';
import { AmapComponent } from './app-amap/amap/amap.component';
import { CalendarComponent } from './app-calendar/calendar/calendar.component';

import { FormControlComponent } from '../user/user-info/dynamic-form/form-control.component';
import { AppCkeditorComponent } from './app-ckeditor/app-ckeditor.component';
import { AppChartsComponent } from './app-charts/app-charts.component';
import { AmapDemoComponent } from './app-amap/amap-demo.component';
import { CalendarDemoComponent } from './app-calendar/calendar-demo.component';

import { shareRoutes } from './share.routing';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MdlModule,
        ToastModule.forRoot(),
        AngularEchartsModule,
        CKEditorModule,
        // RouterModule.forChild(shareRoutes)
    ],
    declarations: [
        FormControlComponent,
        AppCkeditorComponent,
        AppChartsComponent,
        AmapComponent,
        AmapDemoComponent,
        CalendarComponent,
        CalendarDemoComponent
    ],
    exports: [
        MdlModule,
        FormControlComponent,
        AppCkeditorComponent
    ]
})
export class ShareModule { }
