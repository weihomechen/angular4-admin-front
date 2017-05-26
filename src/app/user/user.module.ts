import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserInfoComponent } from './user-info/user-info.component';
import {userRoutes} from './user.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [UserLoginComponent, UserRegisterComponent, UserInfoComponent]
})
export class UserModule { }


