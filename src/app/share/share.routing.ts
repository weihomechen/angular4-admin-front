import { RouterModule } from '@angular/router';

import { AppCkeditorComponent } from './app-ckeditor/app-ckeditor.component';
import { AppChartsComponent } from './app-charts/app-charts.component';

export const shareRoutes = [
    {
        path: 'ckeditor',
        component: AppCkeditorComponent
    },
    {
        path: 'charts',
        component: AppChartsComponent
    }
]

