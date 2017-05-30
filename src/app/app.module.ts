// Angular模块
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouteReuseStrategy } from '@angular/router';

// App模块
import { AppComponent } from './app.component';
import { routing, CustomReuseStrategy } from './app.routing';

// 第三方模块
import { MdlModule } from '@angular-mdl/core';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import 'hammerjs';

// 项目内模块
import { LayoutModule } from './layout/layout.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { BaseDataModule } from './base-data/base-data.module'
import { UserModule } from './user/user.module';
import { TabControlService } from './layout/header/tab/tabControl.service';
import { UserService } from './user/user.service';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        // Angular模块
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        // 第三方模块
        MdlModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        }),
        // 项目内模块
        LayoutModule,
        ShareModule,
        HomeModule,
        BaseDataModule,
        UserModule,
        // App模块
        routing
    ],
    providers: [
        TabControlService,
        UserService,
        { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
