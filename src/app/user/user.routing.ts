import { RouterModule } from '@angular/router';

import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserInfoComponent } from './user-info/user-info.component';

export const userRoutes = [
    {
        path: 'user-register',
        component: UserRegisterComponent,
        outlet: 'user'
    },
    {
        path: 'user-login',
        component: UserLoginComponent
    },
    {
        path: 'user-info',
        component: UserInfoComponent
    }
]


