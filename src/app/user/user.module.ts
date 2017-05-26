import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ShareModule } from '../share/share.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { userRoutes } from './user.routing';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ShareModule,
        RouterModule.forChild(userRoutes)
    ],
    declarations: [UserLoginComponent, UserRegisterComponent, UserInfoComponent]
})
export class UserModule { }


