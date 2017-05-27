import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

import { ShareModule } from '../share/share.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserForgetpwdComponent } from './user-forgetpwd/user-forgetpwd.component';
import { UserChangePwdComponent } from './user-change-pwd/user-change-pwd.component';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        }),
        ShareModule
    ],
    declarations: [UserLoginComponent, UserRegisterComponent, UserInfoComponent, UserForgetpwdComponent, UserChangePwdComponent]
})
export class UserModule { }


