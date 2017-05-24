// Angular模块
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouteReuseStrategy } from '@angular/router';

// App模块
import { AppComponent } from './app.component';
import { routing, CustomReuseStrategy } from './app.routing';

// 第三方模块
import 'hammerjs';

// 项目内模块
import { LayoutModule } from './layout/layout.module';
import { HomeModule } from './home/home.module';
import { ShareModule } from './share/share.module';
import { TabControlService } from './layout/header/tab/tabControl.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        // Angular模块
        BrowserModule,
        FormsModule,
        HttpModule,
        // 项目内模块
        LayoutModule,
        HomeModule,
        ShareModule,
        // App模块
        routing
    ],
    providers: [
        TabControlService,
        { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
