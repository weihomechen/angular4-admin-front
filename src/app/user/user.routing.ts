import { RouterModule } from '@angular/router';

import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserForgetpwdComponent } from './user-forgetpwd/user-forgetpwd.component';

export const userRoutes = [
    {
        path: 'user-register',
        component: UserRegisterComponent,
        outlet: 'user'
    },
    {
        path: 'user-login',
        component: UserLoginComponent,
        outlet: 'user'
    },
    {
        path: 'user-info',
        component: UserInfoComponent
    },
    {
        path: 'user-forgetpwd',
        component: UserForgetpwdComponent
    },
];



