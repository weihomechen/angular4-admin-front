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
import { MdlModule } from '@angular-mdl/core';

// 项目内模块
import { LayoutModule } from './layout/layout.module';
import { DemoModule } from './demo/demo.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        // Angular模块
        BrowserModule,
        FormsModule,
        HttpModule,
        // 第三方模块
        MdlModule,
        // 项目内模块
        LayoutModule,
        DemoModule,
        // App模块
        routing
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
