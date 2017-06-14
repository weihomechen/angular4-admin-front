import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home/home.component';
import { PersonAddComponent } from './base-data/person-add/person-add.component';
import { PersonEditComponent } from './base-data/person-edit/person-edit.component';
import { PersonListComponent } from './base-data/person-list/person-list.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserForgetpwdComponent } from './user/user-forgetpwd/user-forgetpwd.component';
import { UserInfoComponent } from './user/user-info/user-info.component';
import { UserChangePwdComponent } from './user/user-change-pwd/user-change-pwd.component';
import { UserService } from './user/user.service';

import { AppCkeditorComponent } from './share/app-ckeditor/app-ckeditor.component';
import { AppChartsComponent } from './share/app-charts/app-charts.component';
import { AmapDemoComponent } from './share/app-amap/amap-demo.component';
import { CalendarDemoComponent } from './share/app-calendar/calendar-demo.component';
import { AppAlertComponent } from './share/app-alert/app-alert.component';
import { AppTreeComponent } from './share/app-tree/app-tree.component';
import { AppJsplumbComponent } from './share/app-jsplumb/app-jsplumb.component';

const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [UserService]
    },
    {
        path: 'person-list',
        component: PersonListComponent
    },
    {
        path: 'person-add',
        component: PersonAddComponent
    },
    {
        path: 'person-edit/:id',
        component: PersonEditComponent
    },
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
        component: UserForgetpwdComponent,
        outlet: 'user'
    },
    {
        path: 'user-change-pwd',
        component: UserChangePwdComponent
    },
    {
        path: 'charts',
        component: AppChartsComponent
    },
    {
        path: 'ckeditor',
        component: AppCkeditorComponent
    },
    {
        path: 'amap',
        component: AmapDemoComponent
    },
    {
        path: 'calendar',
        component: CalendarDemoComponent
    },
    {
        path: 'alert',
        component: AppAlertComponent
    },
    {
        path: 'tree',
        component: AppTreeComponent
    },
    {
        path: 'jsplumb',
        component: AppJsplumbComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: HomeComponent
    },
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

export class CustomReuseStrategy implements RouteReuseStrategy {

    handlers: { [key: string]: DetachedRouteHandle } = {};

    // 决定是否将当前的路由进行分离并暂存
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        // console.log('CustomReuseStrategy:shouldDetach', route);
        return true;
    }
    // 存储分离出的路由
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        const handler = this.handlers;
        // console.log('CustomReuseStrategy:store', route, handle);
        // 模块惰性加载将子路由存储
        if (Object.prototype.toString.call(route.children).match(/\s+(\w+)/)[1] === 'Array') {
            route.children.forEach(function (childRouteSnapshot: ActivatedRouteSnapshot) {
                childRouteSnapshot.url.forEach(childUrlSegment => handler[childUrlSegment.path] = handle);
            });
        }

        handler[route.routeConfig.path] = handle;
    }
    // 决定当前的路由是否还原
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        // 如果是新增的页面，不复用之前的路由
        if (route.params.reuse === 'false') {
            return false;
        }
        // console.log('CustomReuseStrategy:shouldAttach', route);
        return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
    }
    // 取得之前暂存的路由
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        // console.log('CustomReuseStrategy:retrieve', route);
        return this.handlers[route.routeConfig.path]; // 从暂存处取回
    }
    // 决定是否重用路由
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        if (future.params.reuse === 'false') {
            return false;
        }
        // 在此处可以取得跳转前和跳转后的路由路径
        // console.log('CustomReuseStrategy:shouldReuseRoute', future, curr);
        return future.routeConfig === curr.routeConfig;
    }
}
